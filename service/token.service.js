const jwt = require('jsonwebtoken');
const db = require("../utils/ndb")

class TokenService { 
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '60m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken 
        }
    }  

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(uid, refreshToken) {
        //const tokenData = await tokenModel.findOne({user: userId})
        const tokenData = await db.query("SELECT * FROM tokens WHERE uid = $1", [uid]).then(data => data.rows[0]).catch(e => {
            console.log(e)
            throw ApiError.BadRequest()
        })
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return await db.query("UPDATE tokens SET refresh_token = $1 WHERE uid = $2 RETURNING *", [refreshToken, uid]).then(data => data.rows[0]).catch(e => {
                console.log(e)
                throw ApiError.BadRequest()
            })
        }
        //const token = await tokenModel.create({user: userId, refreshToken})
        //return token
        return await db.query("INSERT INTO tokens(refresh_token, uid) VALUES ($1, $2) RETURNING *", [refreshToken, uid]).then(data => data.rows[0]).catch(e => {
            console.log(e)
            throw ApiError.BadRequest()
        })
    }

    async removeToken(refreshToken) {
        //const tokenData = await tokenModel.deleteOne({refreshToken})
        const tokenData = await db.query("DELETE FROM tokens WHERE refresh_token = $1 RETURNING *", [refreshToken]).then(data => data.rows[0]).catch(e => {
            console.log(e)
            throw ApiError.BadRequest()
        })
        return tokenData;
    }

    async findToken(refreshToken) {
        //const tokenData = await tokenModel.findOne({refreshToken})
        const tokenData = await db.query("SELECT * FROM tokens WHERE refresh_token = $1", [refreshToken]).then(data => data.rows[0]).catch(e => {
            console.log(e)
            throw ApiError.BadRequest()
        })
        return tokenData;
    }
}

module.exports = new TokenService();
