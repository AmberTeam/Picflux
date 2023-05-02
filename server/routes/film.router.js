const Router = require("express")
const router = new Router()
const filmController = require("../controllers/film.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const condauthMiddleware = require("../middlewares/condauth.middleware")

router.put("/:id/comment", authMiddleware, filmController.addComment)
router.get("/get/:id", condauthMiddleware, filmController.getById)
router.get("/:id/comments", filmController.getComments)
router.post("/search", condauthMiddleware, filmController.search)
router.post("/wl/add", authMiddleware, filmController.addWillReadFilm)
router.post("/wl/rem", authMiddleware, filmController.removeWillReadFilm)
router.post("/rating/:id/push", authMiddleware, filmController.pushRating)

module.exports = router