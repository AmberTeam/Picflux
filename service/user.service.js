const bcrypt = require('bcrypt');
const uuid = require('uuid');
const tokenService = require('./token.service');
const UserDto = require('../dtos/user.dto');
const JwtUserDto = require("../dtos/jwt.user.dto")
const ApiError = require('../exceptions/api.error');
const rid = require("random-id");
const UserMinDto = require('../dtos/user.min.dto');
const fileService = require('./file.service');
const mailService = require("./mail.service")
const jdenticon = require("jdenticon")
const db = require("../utils/ndb");
const { array2postgres } = require('../utils/logic');
//DB

class UserService {
    async setTimestamp(uid, data) { 
        try {
            const candidate = await db.query(`UPDATE users SET last_active = $1 WHERE id = $2 RETURNING *`, [data, uid])
            if(!candidate) throw ApiError.UnauthorizedError()

            return {status: "ok"}
        } catch(e) {
            console.error(e)
            return {status: "err"}
        } 
    }

    async registration(email, password) {
        const candidate = await db.query("SELECT * FROM users WHERE email = $1", [email]).then(data => data.rows.length > 0)
        if (candidate) throw ApiError.BadRequest()

        const hashPassword = await bcrypt.hash(password, 3)

        const user = await db.query("INSERT INTO users (id, email, password, verify_l, avatar, username) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [
            uuid.v4(), 
            email, 
            hashPassword, 
            uuid.v4(), 
            fileService.saveFileBuf(jdenticon.toPng(rid(10, 'aA0'), Number(process.env.AVATAR_W), {
                padding: 0
            })), 
            `user_${rid(8, 'aA0')}`]
        ).then(data => data.rows[0])

        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${user.verify_l}`);

        const userDto = new UserDto(user)
        const jwtUserDto = new JwtUserDto(user) 
        const tokens = tokenService.generateTokens({...jwtUserDto}) 
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await db.query("UPDATE users SET verified = true WHERE verify_l = $1 RETURNING *", activationLink).then(data => data.rows[0])
        if (!user) throw ApiError.BadRequest()
        return {status: "ok"}
    }

    async login(email, password) {
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]).then(data => data.rows[0])
        //const user = await UserModel.findOne({email})
        if (!user) throw ApiError.BadRequest()

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) throw ApiError.BadRequest();
        
        const userDto = new UserDto(user);
        const jwtUserDto = new JwtUserDto(user)
        const tokens = tokenService.generateTokens({...jwtUserDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    } 

    async logout(refreshToken, ddf, user) {
        if(ddf === true) {
            await db.query("DELETE FROM alerts WHERE owner = $1", [user.id])
            await db.query("DELETE FROM ratings WHERE owner = $1", [user.id])
            await db.query("DELETE FROM tokens WHERE uid = $1", [user.id])
            await db.query("DELETE FROM users WHERE id = $1", [user.id])
        }
        //if(ddf == true) await UserModel.deleteOne({email: user.email})
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError();
        
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError();
        
        const user = await db.query("SELECT * FROM users WHERE id = $1", [userData.id]).then(data => data.rows[0])
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async getUserBId(id, own, uid) {
        const userData = await db.query("SELECT * FROM users WHERE id = $1", [id]).then(data => data.rows[0])
        const diff = Date.now() - userData.last_active
        if(diff >= 60000) userData.status = 0 
        else userData.status = 1
        userData.subscribed = false 
        if(userData.friends && userData.friends.length) {
            userData.subscribed = userData.friends.includes(uid)
            const friends_parsed=[]
            for(var i=0;i < userData.friends.length;i++) {
                const follower = await db.query("SELECT * FROM users WHERE id = $1", [userData.friends[i]]).then(data => data.rows[0])
                if(!follower) return null 
                friends_parsed.push(new UserMinDto(follower))
            }
            userData.friends = friends_parsed
        }

        const userDto = new UserDto(userData) 

        if(own && userData.watch_later.length) {
            const sql = `SELECT * FROM film WHERE id = any('${array2postgres(userData.watch_later)}')`
            //var sql="SELECT * FROM film WHERE id = any('{1}')"
            userDto.watchLater = await db.query(sql ).then(data => data.rows)

        } 

        return userDto
    }

    async subscribe(uid, f) {
        try { 
            const candidate = await db.query('SELECT * FROM users WHERE id = $1', [uid]).then(data => data.rows[0])
            if(!candidate && f && f.id) throw ApiError.BadRequest()
    
            await db.query("UPDATE users SET friends = array_append(friends, $1) WHERE id = $2", [f.id, uid])
            this.storeAlert(f.id, uid, 'sub_inc')
            return {status: "ok"}
        } catch(e) {
            throw ApiError.BadRequest()
        }
    }

    async unsubscribe(uid, foid) {
        try {
            const candidate = await db.query('SELECT * FROM users WHERE id = $1', [uid]).then(data => data.rows[0])
            if(!candidate && foid) throw ApiError.BadRequest()

            await db.query("UPDATE users SET friends = array_remove(friends, $1) WHERE id = $2", [foid, uid])
            return {status: "ok"}
        } catch(e) {
            console.error(e)
            throw ApiError.BadRequest()
        }
    }

    async verify(data) {
        try {
            var result = {}
            if(data.username) {
                
                const c = await db.query('SELECT * FROM users WHERE username = $1', [data.username]).then(data => data.rows.length)
                if(c) result.username = 1
                else result.username = 0
            }
            return result
        } catch(e) {
            console.error(e)
            throw ApiError.BadRequest()
        }
    }

    async update(uid, data) {
        // CREATE update params 
        var sql = ""
        if(data.avatar) data.avatar = fileService.saveFile(data.avatar ? data.avatar : null)
        else delete data.avatar
        var k = Object.keys(data)
        var v = Object.values(data)
        for(var i=0;i < k.length;i++) {
            if(v[i] === "" || v[i] === null || v[i] === undefined) {
                v.splice(i, 1)
                k.splice(i, 1)
            }
        }
        for(var i=0;i < k.length;i++) {
            var c = ''
            switch(i) { 
                case 0:
                    if(k.length === 1) c = `${k[i]} = '${v[i]}'`
                    else c = `${k[i]} = '${v[i]}',`
                    break
                default: 
                    if(k.length > 1 && i === k.length - 1) c = `${k[i]} = '${v[i]}'`
                    else c = `${k[i]} = '${v[i]}',`
                    break
            }
            sql += c
        }
        const candidate = await db.query(`UPDATE users SET ${sql} WHERE id = $1 RETURNING *`, [uid]).then(data => data.rows[0])

        if(!candidate) throw ApiError.UnauthorizedError()
        const userDto = {...new UserMinDto({
            username: data.username.toLowerCase(),
            avatar: candidate.avatar,
        }), biography: data.biography}
        return {data: userDto,status:"ok"}
    }

    async searchCandidates (uid, username) {
        const username_r = username 
                                .replace(" ", "")
        const data = await db.query(`SELECT * FROM users WHERE username LIKE '%${username_r}%'`).then(data => data.rows)
        return {
            status: "ok", 
            users: data.filter(user => user.id !== uid).map(user => new UserMinDto(user))
        }
    }

    async getAlertsIncoming(uid) {

        const rows = await db.query(`SELECT * FROM alerts WHERE recipient = $1 AND tag NOT LIKE "msg"`, [uid]).then(data => data.rows)

            
        const reverse = rows.reverse()
        
        resolve({
            status: "ok",
            alerts: reverse
        })
    }

    async storeAlert(uid, rid, tag) {
        await db.query(`INSERT INTO alerts (id, owner, recipient, tag, timestamp) VALUES (
            DEFAULT,
            $1,
            $2,
            $3,
            $4
        )`, [uid, rid, tag, Date.now()])
        return {status: "ok"}
    }

}

module.exports = new UserService();
 