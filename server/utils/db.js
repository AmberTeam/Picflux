const sqlite = require("sqlite3").verbose()

class DBAgent {
    static db = new sqlite.Database("ifdb.db")

    static __serchByQuery = "SELECT * FROM films WHERE name LIKE '%?%'"
    static __paginateMethod = "SELECT * FROM films LIMIT ?, ?"
    static __getByIdMethod = "SELECT * FROM films WHERE id = ?"
    static __getAllMethod = "SELECT * from films"

    static formatSearchMethodStr(str, offset, limit, filters) {
        var flt_construct = ''
        filters.forEach((filter, i) => {
            if(i == 0) flt_construct = flt_construct + `genres LIKE '%"${filter}"%'`
            else flt_construct = flt_construct + ` AND genres LIKE '%"${filter}"%'`
        })
        console.log(`SELECT * FROM films WHERE lowerName LIKE '%${str}%' WHERE ${flt_construct} LIMIT ${offset}, ${limit}`)
        return `SELECT * FROM films WHERE lowerName LIKE '%${str}%' LIMIT ${offset}, ${limit}`
    }
}

/* 
        DBAgent.db.all(`SELECT * from films WHERE genres LIKE '%"аниме"%' AND genres LIKE '%"приключения"%'`, [], (err, rows) => {
            console.log(rows)
            if(!rows) return res.json([])
            const arr = []
            rows.map((row) => {
                row.players = JSON.parse(row.players)
                row.genres = JSON.parse(row.genres)
            })
            return res.json(rows)
        })
*/
 
module.exports = DBAgent