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
            const chat = await chatapiService.createChat(req.user.id, [...JSON.parse(members), req.user.id]) 
            return res.status(200).json(chat)
        } catch(e) {
            next(e) 
        }
    }

    async getChatHistory(req, res, next) {
        try {
            const {chatid} = req.query
            const {offset, limit} = req.query
            const history = await chatapiService.getChatHistory(req.user.id, chatid, offset, limit)
            return res.status(200).json(history)
        } catch(e) {
            next(e)
        }
    }

    async storeMsg(req, res, next) {
        try {
            const msg = await chatapiService.storeMsg(req.user, req.body)
            return res.status(200).json(msg)
        } catch(e) {
            next(e)
        }
    }

    async deleteMsg(req, res, next) {
        try {
            const response = await chatapiService.deleteMsg(req.user.id, req.body.chatid, req.body.mid)
            return res.status(200).json(response)
        } catch(e) {
            next(e)
        }
    }

    async editMsg(req, res, next) {
        try {
            const response = await chatapiService.editMsg(req.user.id, req.body.chatid, req.body.mid, req.body.payload)
            return res.status(200).json(response)
        } catch(e) {
            next(e)
        }
    }

    async updateSeen(req, res, next) {
        try {   
            const response = await chatapiService.updateSeen(req.user.id, req.params.chatid, JSON.parse(req.body.messages))
            res.status(200).json(response)
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new ChatApiController()