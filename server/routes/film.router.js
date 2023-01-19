const Router = require("express")
const router = new Router()
const filmController = require("../controllers/film.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const condauthMiddleware = require("../middlewares/condauth.middleware")

router.get("/get-all", filmController.getAll)
router.get("/get/:id", condauthMiddleware, filmController.getById)
router.get("/get", filmController.paginate)
router.post("/search", filmController.search)
router.post("/wl/add", authMiddleware, filmController.addWillReadFilm)
router.post("/wl/rem", authMiddleware, filmController.removeWillReadFilm)

module.exports = router