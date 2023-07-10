const Router = require("express")
const router = new Router()
const filmController = require("../controllers/film.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const condauthMiddleware = require("../middlewares/condauth.middleware")

router.put("/:id/comment", authMiddleware, filmController.add_comment)
router.get("/get/:id", condauthMiddleware, filmController.get_by_id)
router.get("/:id/comments", filmController.get_comments)
router.post("/search", condauthMiddleware, filmController.search)
router.post("/wl/add", authMiddleware, filmController.add_will_read_film)
router.post("/wl/rem", authMiddleware, filmController.remove_will_read_film)
router.post("/rating/:id/push", authMiddleware, filmController.push_rating)
router.get("/:id/pl", filmController.get_players)

module.exports = router