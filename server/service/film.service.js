const UserModel = require("../models/user.model")
const DBAgent = require("../utils/db")
const UserMinDto = require("../dtos/user.min.dto")
const ApiError = require("../exceptions/api.error")

class FilmService {

    async paginate(offset, limit) {
        return new Promise((resolve, reject) => {
            DBAgent.db.all(DBAgent.__paginateMethod, [offset, limit], (err, rows) => { 
                return resolve(rows)
            })
        })
    }

    async resolveCommentOwner(uid) {
        const candidate = await UserModel.findById(uid)
        if(candidate) {
            const ownerDto = new UserMinDto(candidate)
            return ownerDto
        } else {
            return undefined 
        }
    }

    async getById(id, uid) {
        return new Promise(async (resolve, reject) => {
            DBAgent.db.get(DBAgent.__getByIdMethod, [id], async (err, row) => {
                
                const comments_parsed=[]
                await new Promise((resolve, reject) => {
                    DBAgent.db.all(`SELECT * FROM comments WHERE fid LIKE '${id}'`, async (e, data) => {
                        if(e) reject(e)
                        if(!data || !data.length) return resolve(null)
                        const data_ids=[]
                        data.forEach((d) => data_ids.push(d.id))
                        data_ids.sort((a,b) => b-a)
                        for(var i=0;i < data_ids.length;i++){
                            const val_i = data.map((v) => v.id).indexOf(data_ids[i])
                            const val_d = data[val_i]
                            const owner = await UserModel.findById(val_d.uid)
                            const ownerDto = new UserMinDto(owner ? owner : {
                                username: 'Deleted accound',
                                id: val_d.uid,
                                avatar: 'user64.png'
                            })
                            comments_parsed.push({
                                ...val_d,
                                user: ownerDto
                            })
                        }
                        resolve(comments_parsed)
                    })
                })

                try {
                    row.players = JSON.parse(row.players)
                    var res_model = {...row} 
        
                    if(uid) {
                        const req_owner = await UserModel.findById(uid)
                        
                        res_model = {
                            ...res_model,
                            watchLater: req_owner.watchLater
                        }
                    }
                    
                    await fetch(`https://www.imdb.com/find/?q=${row.lowerName}`, {
                        headers: {
                            cookie: "lc-main=en_US"
                        }
                    }).then(res => res.text()).then(async res_txt => {
                        var imdb_q_subst = res_txt.substring(
                            res_txt.indexOf('{"results":[{'), 
                            res_txt.indexOf('"companyResults":{') - 1, 
                        ) 
                        var imdb_q_parsed 
                        if(imdb_q_subst) imdb_q_parsed = JSON.parse(imdb_q_subst)
                        else throw new Error("JSON parse fatal error")

                        if(!imdb_q_parsed.results.length) throw new Error("Imdb film not found")
                    
                        await fetch(`https://www.imdb.com/title/${imdb_q_parsed.results[0].id}`).then(res => res.text()).then(res_txt => {
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
        
                    return resolve({
                        ...res_model,
                        comments: comments_parsed,
                        imdb_translate_status: "ok"
                    })
                } catch(e) {
                    console.error(e)
                    return resolve({
                        ...res_model,
                        comments: comments_parsed,
                        imdb_translate_status: "err"
                    })
                }
            }) 
        })
    }

    async search(
        q,
        offs,
        lim,
        fl,
        flt,
        datesrt,
        psrt,
        psrtt,
        uid
    ) {
        return new Promise((resolve, reject) => {
            DBAgent.db.all(DBAgent.formatSearchMethodStr(q, offs, lim, fl, flt, datesrt, psrt, psrtt), [], async (err, rows) => {
                if(!rows) return resolve([])
                const arr = [] 
                var req_owner
                if(uid) {
                    req_owner = await UserModel.findById(uid)
                } 
                rows.map((row) => {
                    if(req_owner) row.watchLater = req_owner.watchLater
                    row.players = JSON.parse(row.players)
                    row.genres = JSON.parse(row.genres)
                })
                DBAgent.db.all(DBAgent.formatSearchMethodStr(q, String((Number(offs) + Number(lim))) , lim, fl, flt, datesrt, psrt, psrtt), [], async (err, _rows) => {
                    if(_rows.length) return resolve({films: rows, can_load: true})
                    else return resolve({films: rows, can_load: false})
                }) 
            }) 
        })
    }

    async removeWillReadFilm(userid, fid) {
        try {
            const user = await UserModel.findById(userid)
            user.watchLater.remove(fid)
            await user.save() 
            return {status: "ok"}    
        } catch(e) {
            console.log(e)
            return {status: "err"}
        }
    }

    async addWillReadFilm(userid, fid) {
        try {
            const user = await UserModel.findById(userid)
            user.watchLater.push(fid)
            await user.save() 
            return {status: "ok"}
        } catch(e) {
            console.log(e)
            return {status: "err"}
        }
    }

    async addComment(fid, uid, data) { 
        return new Promise((resolve, reject) => {
            const date = new Date()
            let day = date.getDate()
            let month = date.getMonth()
            let year = date.getFullYear()
            const datef_v = `${day}-${month}-${year}`
            const datef_ms = Date.now()
            DBAgent.db.run(`INSERT INTO comments(fid, uid, data, datef_ms, datef_v) VALUES('${fid}', '${uid}', '${data}', '${datef_ms}', '${datef_v}')`, [], async (e, rows) => {
                if(e) reject(ApiError.BadRequest())
                const user = await UserModel.findById(uid)
                const userDto = new UserMinDto(user)
                return resolve({
                    data,
                    user: userDto,
                    datef_ms,
                    datef_v
                })
            })
        })
    }
}

module.exports = new FilmService()