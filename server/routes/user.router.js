const Router = require('express').Router
const userController = require('../controllers/user.controller')
const router = new Router()
const condauthMiddleware = require("../middlewares/condauth.middleware")
const authMiddleware = require("../middlewares/auth.middleware") 

router.get('/tsp', authMiddleware, userController.setTimestamp)
router.put("/:id/friendship/init", authMiddleware, userController.subscribe)
router.put("/:id/friendship/destroy", authMiddleware, userController.describe)
router.post('/update', authMiddleware, userController.update)
router.get('/get/:id', condauthMiddleware, userController.getUserBId)
router.get('/verify', authMiddleware, userController.verify)

module.exports = router
 