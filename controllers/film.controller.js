const ApiError = require("../exceptions/api.error")
const filmService = require("../service/film.service")

class FilmController {
     
    async getById(req, res, next) {
        try {
            const {id} = req.params
            const filmData = await filmService.getById(id, req.user ? req.user.id : undefined, req.headers["accept-language"])
            return res.json(filmData)
        } catch(e) { 
            next(e)
        }
    }

    async search(req, res, next) {
        try {
            const {fl, flt, datesrt, psrt, psrt_t} = req.query
            const {limit, offset, query} = req.body
            const ACTIVATORS = {
                datesrt: [""], 
                flt: [""],
                psrt: [""],
                psrt_t: [""]
            }
    
            var result = { 
                datesrt: "any",
                flt: "without",
                psrt: "without",
                psrt_t: "desc"
            }
    
            const keys = Object.keys({datesrt, flt, psrt, psrt_t})
            const vls = Object.values({datesrt, flt, psrt, psrt_t})
    
            for(var i=0;i < vls.length;i++) {
                switch(keys[i]) {
                    case "datesrt": 
                        if(vls[i] && !ACTIVATORS.datesrt.includes(vls[i])) result.datesrt = vls[i]
                        break
                    case "flt":
                        if(vls[i] && !ACTIVATORS.flt.includes(vls[i])) result.flt = vls[i]
                        break 
                    case "psrt": 
                        if(vls[i] && !ACTIVATORS.psrt.includes(vls[i])) result.psrt = vls[i]
                        break 
                    case "psrt_t": 
                        if(vls[i] && !ACTIVATORS.psrt_t.includes(vls[i])) result.psrt_t = vls[i]
                        break
                }
            }

    
            var fl_arr = fl ? fl.split(" ").filter((fle) => fle !== "") : []
            
            if(result.psrt_t !== "without" && !fl_arr.length) fl_arr = []
    
            const fdatas = await filmService.search(query, Number(offset), Number(limit), fl_arr, result.flt, result.datesrt, result.psrt, result.psrt_t, req.user ? req.user.id : undefined)
    
            return res.json(fdatas)
        } catch(e) {
            next(e)
        }
    }

    async addWillReadFilm(req, res) {
        try {
            const response = await filmService.addWillReadFilm(req.user.id, req.body.id)
            return res.json(response)
        } catch(e) {
            return next(ApiError.UnauthorizedError())
        }
    }

    async removeWillReadFilm(req, res, next) {
        try {
            const response = await filmService.removeWillReadFilm(req.user.id, req.body.id)
            return res.json(response)
        } catch(e) {
            return next(ApiError.UnauthorizedError())
        }
    }

    async addComment(req, res, next) {
        try { 
            const data = await filmService.addComment(req.params.id, req.user, req.body.data)
            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async getComments(req, res, next) { 
        try {
            const data = await filmService.getComments(req.params.id, req.query.offset, req.query.limit)
            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async pushRating(req, res, next) {
        try {
            const response = await filmService.pushRating(req.user.id, req.params.id, req.body.value)
            return res.status(200).json(response)
        } catch(e) {    
            return next(e)
        }
    }
}

module.exports = new FilmController()