const sqlite = require("sqlite3").verbose()

class DBAgent {
    static db = new sqlite.Database("ifdb.db")

    static __serchByQuery = "SELECT * FROM films WHERE name LIKE '%?%'"
    static __paginateMethod = "SELECT * FROM films LIMIT ?, ?"
    static __getByIdMethod = "SELECT * FROM films WHERE id = ?"
    static __getAllMethod = "SELECT * from films"

    static formatSearchMethodStr(str, offset, limit, filters, fltype, datesrt, psrt, psrt_t) {
        var flt_construct = ''
        var psrt_construct = ''
        if(psrt.length) psrt.map(val => {
            switch(val) {
                case "date":
                    psrt_construct = psrt_construct + ` ORDER BY year ${psrt_t == 'desc' ? 'DESC' : "ASC"}`
                    break
                case "pl":
                    psrt_construct = psrt_construct + ``
                
            }
        })
        if(fltype !== 'without') {
            filters.forEach((filter, i) => {
                if(i == 0) flt_construct = ` AND genres${fltype == 'solely' ? " NOT" : ""} LIKE '%${filter}%'`
                else flt_construct = flt_construct + ` AND genres${fltype == 'solely' ? " NOT" : ""} LIKE '%${filter}%'`
            })
            if(datesrt && datesrt !== "any" && psrt.includes('without')) flt_construct = flt_construct + `AND year LIKE '%${datesrt}%'`
            return `SELECT * FROM films WHERE lowerName LIKE '%${str}%' ${flt_construct}${psrt_construct} LIMIT ${offset}, ${limit}`
        } else {
            if(datesrt && datesrt !== "any" && psrt.includes('without')) return `SELECT * FROM films WHERE lowerName LIKE '%${str}%' AND year LIKE '%${datesrt}%'${psrt_construct} LIMIT ${offset}, ${limit}`
            else return `SELECT * FROM films WHERE lowerName LIKE '%${str}%'${psrt_construct} LIMIT ${offset}, ${limit}`
        }
    }
}
 
module.exports = DBAgent