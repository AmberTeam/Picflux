const DBAgent = require("../utils/db")
const filmService = require("../service/film.service")
const userService = require("../service/user.service")
const UserModel = require("../models/user.model")

class FilmController {

    paginate(req, res) {
        const {offset, limit} = req.query
        DBAgent.db.all(DBAgent.__paginateMethod, [offset, limit], (err, rows) => { 
            return res.json(rows)
        })
    } 
     
    async getById(req, res) {
        const {id} = req.params

        DBAgent.db.get(DBAgent.__getByIdMethod, [id], async (err, row) => {
            try {
                row.players = JSON.parse(row.players)
                var res_model = {...row}
    
                if(req.user) {
                    const req_owner = await UserModel.findById(req.user.id)
                    
                    res_model = {
                        ...res_model,
                        watchLater: req_owner.watchLater
                    }
                }
                
                await fetch(`https://www.imdb.com/find/?q=${row.lowerName}`, {
                    headers: {
                        cookie: "lc-main=en_US"
                    }
                }).then(res => {
                    console.log(res)
                    return res.text()
                }).then(async res_txt => {
                    var imdb_q_subst = res_txt.substring(
                        res_txt.indexOf('{"results":[{'), 
                        res_txt.indexOf('"companyResults":{') - 1, 
                    ) 
                    var imdb_q_parsed
                    if(imdb_q_subst) imdb_q_parsed = JSON.parse(imdb_q_subst)
                    else throw new Error("JSON parse fatal error")

                    if(!imdb_q_parsed.results.length) throw new Error("Imdb film not found")
                
                    console.log(`[IMDB_TRNS]: Sending title request with id [${imdb_q_parsed.results[0].id}]`)
                    await fetch(`https://www.imdb.com/title/${imdb_q_parsed.results[0].id}`).then(res => {
                        return res.text()
                    }).then(res_txt => {
                        var imdb_t_plottxt_subst = res_txt.substring(
                            res_txt.indexOf('"plotText":{'), 
                            res_txt.indexOf('"language":{') - 1, 
                        )
                        var imdb_t_plottxt_parsed
                        if(imdb_t_plottxt_subst) imdb_t_plottxt_parsed = JSON.parse(imdb_t_plottxt_subst.replace('"plotText":', ""))

                        res_model = {
                            ...res_model,
                            imdb_cfg: {
                                name: imdb_q_parsed.results[0].titleNameText,
                                description: imdb_t_plottxt_parsed.plainText,
                                poster: imdb_q_parsed.results[0].titlePosterImageModel.url
                            }
                        }
                    })
                })
    
                return res.json({
                    ...res_model,
                    imdb_translate_status: "ok"
                })
            } catch(e) {
                console.log(e)
                return res.json({
                    ...res_model,
                    imdb_translate_status: "err"
                })
            }
        }) 
    }

    getAll(req, res) {
        DBAgent.db.all(DBAgent.__getAllMethod, [], (err, rows) => {
            return res.json({message: rows})
        })
    }

    search(req, res) {
        const {fl, flt, datesrt, psrt, psrt_t} = req.query
        const {limit, offset, query} = req.body
        const fl_arr = fl.split(" ").filter((fle) => fle !== "")
        const psrt_frm = psrt.replaceAll('"', '').split(' ')
        DBAgent.db.all(DBAgent.formatSearchMethodStr(query, offset, limit, fl_arr, flt, datesrt, psrt_frm, psrt_t), [], async (err, rows) => {
            if(!rows) return res.json([])
            const arr = [] 
            var req_owner
            if(req.user) {
                req_owner = await UserModel.findById(req.user.id)
            } 
            rows.map((row) => {
                if(req_owner) row.watchLater = req_owner.watchLater
                row.players = JSON.parse(row.players)
                row.genres = JSON.parse(row.genres)
            })
            return res.json(rows)
        }) 
    }

    async getWillReadFilms(req, res) {
        const response = await filmService.getWillReadFilms(req.user.id)
        return res.json(response)
    }

    async removeWillReadFilm(req, res, next) {
        try {
            const response = await filmService.removeWillReadFilm(req.user.id, req.body.id)
            return res.json(response)
        } catch(e) {
            return next(ApiError.UnauthorizedError())
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
}

module.exports = new FilmController()