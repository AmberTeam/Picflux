const Router = require("express")
const router = new Router()
const OAuthController = require("../controllers/oauth.controller")

router.get('/telegram', OAuthController.authorizeTelegramClient)

module.exports = router

