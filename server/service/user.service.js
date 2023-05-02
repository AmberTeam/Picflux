const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const tokenService = require('./token.service');
const UserDto = require('../dtos/user.dto');
const ApiError = require('../exceptions/api.error');
const rid = require("random-id");
const DBAgent = require('../utils/db');
const UserMinDto = require('../dtos/user.min.dto');
const fileService = require('./file.service');
const {syncGlobalEvent} = require("../websocket/index")

class UserService {
    async setTimestamp(uid, data) { 
        try {
            const candidate = await UserModel.findById(uid)
            if(!candidate) throw ApiError.UnauthorizedError(ApiError.econfig.unauthorized)
            candidate.last_active = data
            await candidate.save()
            
            return {status: "ok"}
        } catch(e) {
            console.error(e)
            return {status: "err"}
        } 
    }

    async registration(email, password) {
        const candidate = await UserModel.findOne({email})
        if (candidate) throw ApiError.BadRequest(ApiError.econfig.user_already_created)

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4()

        const user = await UserModel.create({email, password: hashPassword, activationLink, avatar: "user64.png", username: `user_${rid(8, 'aA0')}`})

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) throw ApiError.BadRequest(ApiError.econfig.incorrect_alink)

        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) throw ApiError.BadRequest(ApiError.econfig.bad_request)

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) throw ApiError.BadRequest(ApiError.econfig.bad_request);
        
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    } 

    async logout(refreshToken, ddf, user) {
        if(ddf == true) await UserModel.deleteOne({email: user.email})
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError();
        
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError();
        
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async getUserBId(id, own, uid) {
        const userData = await UserModel.findById(id)
        const diff = Date.now() - userData.last_active
        if(diff >= 60000) userData.status = 0 
        else userData.status = 1
        const friends_parsed=[]
        const subscribed = userData.friends.includes(uid)
        for(var i=0;i < userData.friends.length;i++) {
            const follower = await UserModel.findById(userData.friends[i])
            if(!follower) return 
            friends_parsed.push(new UserMinDto(follower))
        }
        userData.friends = friends_parsed
        userData.subscribed = subscribed
        const userDto = new UserDto(userData)
        if(own) {
            const watchLater = []
            const promices = []
            userData.watchLater.map(fid => {
                const pr = new Promise(function(resolve, reject) {
                    DBAgent.db.get("SELECT * FROM films WHERE id = ?", [fid], async (err, row) => {
                        row.players = JSON.parse(row.players)
                        row.genres = JSON.parse(row.genres),
                        row.countries = JSON.parse(row.countries)
                        resolve(row)
                    }) 
                })
                promices.push(pr)
            })
            await Promise.all(promices).then(values => values.map(val => watchLater.push(val)))
            return {
                ...userDto,
                watchLater
            } 
        }
        return userDto
    }

    async subscribe(uid, f) {
        try {
            const candidate = await UserModel.findById(uid)
            if(!candidate) throw ApiError.BadRequest(ApiError.econfig.bad_request)
            candidate.friends.push(f.id)
            await candidate.save()
            this.storeAlert(f.id, uid, 'sub_inc')
            const fDto = new UserMinDto({...f, status: false, avatar: f.avatar.replace(process.env.API_URL + '/static/', '')})
            /*syncGlobalEvent('push-alert', uid, {
                owner: fDto, 
                recipient: uid, 
                tag: 'sub_inc',
                timestamp: Date.now(),
                id: rid(12, 'aA0')
            })*/
            return {status: "ok"}
        } catch(e) {
            console.error(e)
            throw ApiError.BadRequest(ApiError.econfig.bad_request)
        }
    }

    async unsubscribe(uid, foid) {
        try {
            const candidate = await UserModel.findById(uid)
            if(!candidate) throw ApiError.BadRequest(ApiError.econfig.bad_request)
            candidate.friends.remove(foid)
            await candidate.save()
            return {status: "ok"}
        } catch(e) {
            console.error(e)
            throw ApiError.BadRequest(ApiError.econfig.bad_request)
        }
    }

    async verify(data) {
        try {
            var result = {}
            if(data.username) {
                const c = await UserModel.findOne({username: data.username})
                if(c) result.username = 1
                else result.username = 0
            }
            return result
        } catch(e) {
            console.error(e)
            throw ApiError.BadRequest(ApiError.econfig.bad_request)
        }
    }

    async update(uid, data) {
        if(data.avatar) data.avatar = fileService.saveFile(data.avatar ? data.avatar : null)
        else delete data.avatar
        const candidate = await UserModel.findOneAndUpdate({_id:uid}, {...data})
        if(!candidate) throw ApiError.UnauthorizedError(ApiError.econfig.unauthorized)
        const userDto = {...new UserMinDto({
            username: data.username.toLowerCase(),
            avatar: data.avatar ? data.avatar : candidate.avatar,
        }), biography: data.biography}
        return {data: userDto,status:"ok"}
    }

    async searchCandidates (uid, username) {
        const username_r = username 
                                .replace(" ", "")
        const data = await UserModel.find({ "username": { $regex: '.*' + username_r } })
        return {
            status: "ok", 
            users: data.filter(user => user.id !== uid).map(user => new UserMinDto(user))
        }
    }

    async getAlertsIncoming(uid) {
        return new Promise(async (resolve, reject) => {

            await DBAgent.db.all(`SELECT * FROM alerts WHERE recipient = "${uid}" AND tag NOT LIKE "msg"`, async (err, data) => {
                if(err) {
                    console.error(err)
                    return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
                }

                for(var i=0;i < data.length;i++) {
                    const owner = await UserModel.findById(data[i].owner)
                    const ownerDto = new UserMinDto(owner)
                    data[i].owner = ownerDto
                }
                
                const reverse = data.reverse()
                
                resolve({
                    status: "ok",
                    alerts: reverse
                })
            })
        })
    }

    async storeAlert(uid, rid, tag) {
        return new Promise(async (resolve, reject) => {
            await DBAgent.db.run(`INSERT INTO alerts (owner, recipient, tag, timestamp) VALUES (
                "${uid}",
                "${rid}",
                "${tag}",
                "${Date.now()}"
            )`, )
            resolve({
                status: "ok"
            })
        })
    }

}

module.exports = new UserService();
