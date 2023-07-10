const ApiError = require("../exceptions/api.error")
const filmService = require("../service/film.service")

class FilmController {

    async get_players(req, res, next) {
        try {
            const rs = await filmService.get_players(req.params.id)
            return res.status(200).json(rs)
        } catch(e) {
            next(e)
        }
    }
     
    async get_by_id(req, res, next) {
        try {
            const {id} = req.params
            const filmData = await filmService.get_by_id(id, req.user ? req.user : undefined, req.headers["accept-language"])
            return res.json(filmData)
        } catch(e) { 
            return next(e)
        }
    }

    async search(req, res, next) {
        try {

            const {fl, flt, datesrt, psrt, psrt_t, segment_start,segment_end} = req.query
            const {limit, offset, query} = req.body
            const ACTIVATORS = {
                datesrt: [""], 
                flt: [""],
                psrt: [""],
                psrt_t: [""],
                segment: [""]
            }

            const avails = {
                datesrt: ["any"],
                flt: ["without", "solely", "inclusive"],
                psrt: ["date", "without"],
                psrt_t: ["asc", "desc"],
                segment: ["any"]
            }
    
            var result = { 
                datesrt: {
                    data: "any",
                    status: 0
                },
                flt: {
                    data: "without",
                    status: 0
                },
                psrt: {
                    data: "without", 
                    status: 0
                },
                psrt_t: {
                    data: "desc",
                    status: 0
                },
                segment_start: {
                    data: "any",
                    status: 0
                },
                segment_end: { 
                    data: "any",
                    status: 0
                }
            }
    
            const keys = Object.keys({datesrt, flt, psrt, psrt_t, segment_start, segment_end})
            const vls = Object.values({datesrt, flt, psrt, psrt_t, segment_start, segment_end})
    
            for(var i=0;i < vls.length;i++) {
                switch(keys[i]) {
                    case "datesrt": 
                        if(vls[i] && !ACTIVATORS.datesrt.includes(vls[i]) && /^\d+$/.test(vls[i]) && Number(vls[i] <= 2023)) {
                            result.datesrt.data = vls[i]
                            result.datesrt.status = 1
                        }
                        break
                    case "flt":
                        if(vls[i] && !ACTIVATORS.flt.includes(vls[i]) && avails.flt.includes(vls[i])) {
                            result.flt.data = vls[i]
                            result.flt.status = 1
                        }
                        break 
                    case "psrt": 
                        if(vls[i] && !ACTIVATORS.psrt.includes(vls[i] && avails.psrt.includes(vls[i]))) {
                            result.psrt.data = vls[i]
                            result.psrt.status = 1
                        }
                        break 
                    case "psrt_t": 
                        if(vls[i] && !ACTIVATORS.psrt_t.includes(vls[i]) && avails.psrt_t.includes(vls[i]) && result.psrt.data !== 'without' && result.psrt.status === 1) {
                            result.psrt_t.data = vls[i]
                            result.psrt_t.status = 1
                        }
                        break
                    case "segment_start": 
                        if(vls[i] && !ACTIVATORS.segment.includes(vls[i]) && vls[i] !== "any" && /^\d+$/.test(vls[i]) && result.datesrt.data === 'any') {
                            
                            result.segment_start.data = vls[i]
                            result.segment_start.status = 1
                        }
                        break
                    case "segment_end": 
                        if(vls[i] && !ACTIVATORS.segment.includes(vls[i]) && vls[i] !== "any" && /^\d+$/.test(vls[i]) && result.datesrt.data === 'any') {
                            result.segment_end.data = vls[i]
                            result.segment_end.status = 1
                        }
                        break
                }
            }

    
            var fl_arr = fl && result.flt.status === 1 && result.flt.data !== "without" ? fl.split(" ").filter((fle) => fle !== "") : []
            
            if(result.psrt_t.data !== "without" && !fl_arr.length) fl_arr = []
            
            const fdatas = await filmService.search(
                req.user ? req.user.id : null,
                query, 
                Number(offset), 
                Number(limit), 
                fl_arr, 
                result.flt.data, 
                result.datesrt.data,
                result.psrt.data, 
                result.psrt_t.data, 
                result.segment_start.data, 
                result.segment_end.data)
    
            return res.json(fdatas)
        } catch(e) {
            return next(e)
        }
    }

    async add_will_read_film(req, res) {
        try {
            const response = await filmService.add_will_read_film(req.user.id, req.body.id)
            return res.json(response)
        } catch(e) {
            return next(e)
        }
    }

    async remove_will_read_film(req, res, next) {
        try {
            const response = await filmService.remove_will_read_film(req.user.id, req.body.id)
            return res.json(response)
        } catch(e) {
            return next(ApiError.UnauthorizedError())
        }
    }

    async add_comment(req, res, next) {
        try { 
            const data = await filmService.add_comment(req.params.id, req.user, req.body.data)
            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async get_comments(req, res, next) { 
        try {
            const data = await filmService.get_comments(req.params.id, req.query.offset, req.query.limit)
            return res.json(data)
        } catch(e) {
            return next(e)
        }
    }

    async push_rating(req, res, next) {
        try {
            const response = await filmService.push_rating(req.user.id, req.params.id, req.body.value)
            return res.status(200).json(response)
        } catch(e) {   
            return next(e)
        }
    }
}

module.exports = new FilmController()