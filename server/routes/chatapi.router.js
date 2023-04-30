const Router = require('express') 
const chatapiController = require('../controllers/chatapi.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = new Router()

router.get("/user/inbox", authMiddleware, chatapiController.getUserInbox) 
router.post("/create/chatroom", authMiddleware, chatapiController.createChat)
router.post("/create/msg", authMiddleware, chatapiController.storeMsg)
router.post("/delete/msg", authMiddleware, chatapiController.deleteMsg)
router.post("/edit/msg", authMiddleware, chatapiController.editMsg)
router.get("/history", authMiddleware, chatapiController.getChatHistory) 
router.post("/:chatid/seen", authMiddleware, chatapiController.updateSeen) 

module.exports = router