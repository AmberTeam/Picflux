const sra_service = require("../service/sra.service")

class SRAController {
    async rewritebhostname(req, res, next) {
        try {
            const {h} = req.query
        
            const data = await sra_service.rewritebhostname(h)
            
            res.setHeader("Content-Type", "text/html")
            return res.send(data)
        } catch(e) {
            return next(e)
        }
    }
}

module.exports = new SRAController()