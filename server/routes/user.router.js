const Router = require('express').Router
const userController = require('../controllers/user.controller')
const router = new Router()
const condauthMiddleware = require("../middlewares/condauth.middleware")

router.get('/get/:id', condauthMiddleware, userController.getUserBId)

module.exports = router
