const OAuthService = require("../service/oauth.service")

class OAuthController {
    async authorizeTelegramClient(req, res) {
        const data = await OAuthService.authorizeTelegram(req.query)
        res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(data)
    }
}

module.exports = new OAuthController()