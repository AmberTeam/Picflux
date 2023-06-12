const {TelegramLogin} = require('node-telegram-login');
const UserDto = require('../dtos/user.dto');
const ApiError = require('../exceptions/api.error');
const fileService = require("./file.service")
const tokenService = require("./token.service")
const rid = require("random-id");
const db = require("../utils/ndb")
class OAuthService {
    async authorizeTelegram(authdata) {
        const MySiteLogin = new TelegramLogin(process.env.TG_APIKEY);
        if(MySiteLogin.checkLoginData(authdata)) {
            var candidate = await db.query("SELECT * FROM users WHERE tg_username = $1", [authdata.username]).then(data => data.rows[0])
            if(!candidate) { 
                const avatar = await fileService.saveFileFromUrl(authdata.photo_url)
                candidate = await db.query("INSERT INTO users(email, avatar, password, tg_username, tg_id, username) VALUES($1, $2, $3, $4, $5, $6)", [
                    null,
                    avatar,
                    null,  
                    authdata.username,
                    authdata.id,
                    `user_${rid(8, 'aA0')}`
                ])
            }

            const userDto = new UserDto(candidate)
            const tokens = tokenService.generateTokens({...userDto});
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
    
            return {...tokens, user: userDto} 
        }
        if(!MySiteLogin.checkLoginData(authdata)) return ApiError.BadRequest()
    }
}

module.exports = new OAuthService()