const Router = require("express")
const sra_controller = require("../controllers/sra.controller")

const router = new Router() 

router.get("/bhostname", sra_controller.rewritebhostname)

module.exports = router