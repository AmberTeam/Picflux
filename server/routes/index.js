const Router = require("express")
const pjsstaticsRouter = require("./pjsstatics.router")
const filmRouter = require("./film.router")
const authRouter = require("./auth.router")
const userRouter = require("./user.router")

const router = new Router()

router.use("/", pjsstaticsRouter)
router.use("/film", filmRouter)
router.use("/auth", authRouter)
router.use("/user", userRouter)

module.exports = router