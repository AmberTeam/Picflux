const Router = require('express') 
const chatapiController = require('../controllers/chatapi.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = new Router()

router.get("/user/inbox", authMiddleware, chatapiController.getUserInbox) 
router.post("/create", authMiddleware, chatapiController.createChat)

module.exports = router