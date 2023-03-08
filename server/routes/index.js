const Router = require("express")
const pjsstaticsRouter = require("./pjsstatics.router")
const filmRouter = require("./film.router")
const authRouter = require("./auth.router")
const userRouter = require("./user.router")
const oauthRouter = require("./oauth.router")

const router = new Router()
 
router.use("/", pjsstaticsRouter)
router.use("/oauth", oauthRouter)
router.use("/film", filmRouter)
router.use("/auth", authRouter)
router.use("/user", userRouter)

module.exports = router