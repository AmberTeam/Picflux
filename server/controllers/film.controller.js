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
            row.players = JSON.parse(row.players)
            if(req.user) {
                const req_owner = await UserModel.findById(req.user.id)
                
                return res.json({
                    ...row,
                    watchLater: req_owner.watchLater
                })
            }

            return res.json({...row})
        }) 
    }

    getAll(req, res) {
        DBAgent.db.all(DBAgent.__getAllMethod, [], (err, rows) => {
            return res.json({message: rows})
        })
    }

    search(req, res) {
        const {fl, flt, datesrt} = req.query
        const {limit, offset, query} = req.body
        const fl_arr = fl.split(" ").filter((fle) => fle !== "")
        DBAgent.db.all(DBAgent.formatSearchMethodStr(query, offset, limit, fl_arr, flt, datesrt), [], async (err, rows) => {
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