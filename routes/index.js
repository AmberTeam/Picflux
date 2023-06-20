const Router = require("express")
const pjsstatics_router = require("./pjsstatics.router")
const film_router = require("./film.router")
const auth_router = require("./auth.router")
const user_router = require("./user.router")
const oauth_router = require("./oauth.router")
const chatapi_router = require("./chatapi.router")
const sra_router = require("./sra.router")

const router = new Router()

router.use("/", pjsstatics_router)
router.use("/sra", sra_router)
router.use("/chatapi", chatapi_router)
router.use("/oauth", oauth_router)
router.use("/film", film_router)
router.use("/auth", auth_router)
router.use("/user", user_router)

module.exports = router