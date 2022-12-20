const Router = require("express")
const router = new Router()
const filmController = require("../controllers/film.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/get-all", filmController.getAll)
router.get("/get/:id", filmController.getById)
router.get("/get", filmController.paginate)
router.post("/search", filmController.search)

module.exports = router