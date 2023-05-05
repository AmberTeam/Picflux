const {TelegramLogin} = require('node-telegram-login');
const UserDto = require('../dtos/user.dto');
const ApiError = require('../exceptions/api.error');
const UserModel = require('../models/user.model');
const fileService = require("./file.service")
const tokenService = require("./token.service")
const rid = require("random-id");

class OAuthService {
    async authorizeTelegram(authdata) {
        const MySiteLogin = new TelegramLogin(process.env.TG_APIKEY);
        if(MySiteLogin.checkLoginData(authdata)) {
            var candidate = await UserModel.findOne({tg_username: authdata.username})
            if(!candidate) {
                const avatar = await fileService.saveFileFromUrl(authdata.photo_url)
                candidate = await UserModel.create({
                    email: null,
                    avatar,
                    password: null, 
                    tg_username: authdata.username,
                    tg_id: authdata.id,
                    username: `user_${rid(8, 'aA0')}`
                })
            }

            const userDto = new UserDto(candidate)
            const tokens = tokenService.generateTokens({...userDto});
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
    
            return {...tokens, user: userDto} 
        }
        if(!MySiteLogin.checkLoginData(authdata)) return ApiError.BadRequest(ApiError.econfig.bad_request)
    }
}

module.exports = new OAuthService()