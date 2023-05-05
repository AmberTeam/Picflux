const DBAgent = require("../utils/db")
const filmService = require("../service/film.service")
const UserModel = require("../models/user.model")

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

    async search(req, res) {
        const {fl, flt, datesrt, psrt, psrt_t} = req.query
        const {limit, offset, query} = req.body
        const fl_arr = fl.split(" ").filter((fle) => fle !== "")
        const psrt_frm = psrt.replaceAll('"', '').split(' ')
        const fdatas = await filmService.search(query.replaceAll('"', '').toLowerCase(), offset, limit, fl_arr, flt, datesrt, psrt_frm, psrt_t, req.user ? req.user.id : undefined)
        return res.json(fdatas)
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
            const data = await filmService.addComment(req.params.id, req.user.id, req.body.data)
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