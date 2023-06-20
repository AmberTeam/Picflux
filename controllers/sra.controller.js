const sra_service = require("../service/sra.service")

class SRAController {
    async rewritebhostname(req, res, next) {
        try {
            const {h} = req.query
        
            const data = await sra_service.rewritebhostname(h)
    
            return res.json(data)
        } catch(e) {
            console.error(e) 
            return next(e)
        }
    }
}

module.exports = new SRAController()