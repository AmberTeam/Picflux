const fs = require("fs")
const path = require("path")

class Logger { 
    create_entry(ename, ctnt) {
        try {
            const fpath = path.join(__dirname, "..", "log", `${ename}.log`)
            const fctnt = `${ctnt}\n`
            if(!fs.existsSync(fpath)) fs.appendFile(fpath,fctnt, (err) => {
                if(err) throw(err)
            })
            else fs.writeFile(fpath, fctnt, {flag: 'a+'}, (err) => {
                if(err) throw err
            })

            return true
        } catch(e) {
            console.error(e)
            return false
        }
    }

    async read_entries(ename) { 
        try { 
            const fpath = path.join(__dirname, "..", "log", `${ename}.log`)
            return new Promise((resolve, reject) => {
                if(!fs.existsSync(fpath)) return resolve(undefined)
                fs.readFile(fpath, {encoding: 'utf-8'}, function(err,data){
                    if (!err) {
                        return resolve(data)
                    } else {
                        return reject(err)
                    }
                })
            })
        } catch(e) { 
            console.error(r)
            return undefined
        }
    }
}

module.exports = new Logger() 