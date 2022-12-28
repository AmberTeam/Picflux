const DBAgent = require("../utils/db")
const sqlite = require("sqlite3")
const FilmModel = require("../dtos/film.dto")


class FileController {

    paginate(req, res) {
        const {offset, limit} = req.query
        DBAgent.db.all(DBAgent.__paginateMethod, [offset, limit], (err, rows) => { 
            return res.json(rows)
        })
    }
     
    getById(req, res) {
        const {id} = req.params
        DBAgent.db.get(DBAgent.__getByIdMethod, [id], async (err, row) => {
            row.players = JSON.parse(row.players)
            return res.json({...row})
        }) 
    }

    getAll(req, res) {
        DBAgent.db.all(DBAgent.__getAllMethod, [], (err, rows) => {
            return res.json({message: rows})
        })
    }

    search(req, res) { 
        const {limit, offset, query} = req.body
        DBAgent.db.all(DBAgent.formatSearchMethodStr(query, offset, limit), [], (err, rows) => {
            if(!rows) return res.json([])
            const arr = []
            rows.map((row) => {
                row.players = JSON.parse(row.players)
                row.genres = JSON.parse(row.genres)
            })
            return res.json(rows)
        })
    }
}

module.exports = new FileController()