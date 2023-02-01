const sqlite = require("sqlite3").verbose()

class DBAgent {
    static db = new sqlite.Database("ifdb.db")

    static __serchByQuery = "SELECT * FROM films WHERE name LIKE '%?%'"
    static __paginateMethod = "SELECT * FROM films LIMIT ?, ?"
    static __getByIdMethod = "SELECT * FROM films WHERE id = ?"
    static __getAllMethod = "SELECT * from films"

    static formatSearchMethodStr(str, offset, limit) {
        return `SELECT * FROM films WHERE name LIKE '%${str}%' LIMIT ${offset}, ${limit}`
    }
}
 
module.exports = DBAgent