const sqlite = require("sqlite3").verbose()

class DBAgent {
    static db = new sqlite.Database("ifdb.db")

    static __serchByQuery = "SELECT * FROM films WHERE name LIKE '%?%'"
    static __paginateMethod = "SELECT * FROM films LIMIT ?, ?"
    static __getByIdMethod = "SELECT * FROM films WHERE id = ?"
    static __getAllMethod = "SELECT * from films"

    static formatSearchMethodStr(str, offset, limit, filters, fltype, datesrt) {
        var flt_construct = ''
        if(fltype !== 'without') {
            filters.forEach((filter, i) => {
                if(i == 0) flt_construct = ` AND genres${fltype == 'solely' ? " NOT" : ""} LIKE '%${filter}%'`
                else flt_construct = flt_construct + ` AND genres${fltype == 'solely' ? " NOT" : ""} LIKE '%${filter}%'`
            })
            console.log(datesrt)
            if(datesrt && datesrt !== "any") flt_construct = flt_construct + `AND year LIKE '%${datesrt}%'`
            return `SELECT * FROM films WHERE lowerName LIKE '%${str}%' ${flt_construct} LIMIT ${offset}, ${limit}`
        } else {
            if(datesrt && datesrt !== "any") return `SELECT * FROM films WHERE lowerName LIKE '%${str}%' AND year LIKE '%${datesrt}%' LIMIT ${offset}, ${limit}`
            else return `SELECT * FROM films WHERE lowerName LIKE '%${str}%' LIMIT ${offset}, ${limit}`
        }
    }
}
 
module.exports = DBAgent