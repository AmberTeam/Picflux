const chatapiService = require("../service/chatapi.service")

class ChatApiController {
    async getUserInbox(req, res, next) {
        try {
            const data = await chatapiService.getUserInbox(req.user.id)
            return res.status(200).json({
                ...data,
                status: "ok"
            })
        } catch(e) { 
            next(e)
        }
    }

    async createChat(req, res, next) {
        try {
            const {members} = req.body
            const chat = await chatapiService.createChat(JSON.stringify([...JSON.parse(members), req.user.id]))
        } catch(e) {
            next(e) 
        }
    }
}

module.exports = new ChatApiController()