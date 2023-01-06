const Router = require("express")
const pjsstaticsRouter = require("./pjsstatics.router")
const filmRouter = require("./film.router")
const authRouter = require("./auth.router")

const router = new Router()

router.use("/", pjsstaticsRouter)
router.use("/film", filmRouter)
router.use("/auth", authRouter)

module.exports = router