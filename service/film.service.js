const UserMinDto = require("../dtos/user.min.dto")
const ApiError = require("../exceptions/api.error")
const {syncFilmEvent} = require("../websocket/index")
const {checkTexts} = require("yandex-speller")
const db = require("../utils/ndb")
const { array2postgres, array2postgres_ex } = require("../utils/logic")
const FilmMinDto = require("../dtos/film.min.dto")
const FilmDto = require("../dtos/film.dto")
class FilmService {

    async resolveCommentOwner(uid) {
        const candidate = await db.query("SELECT * FROM users WHERE id = $1", [uid])
        if(candidate) {
            const ownerDto = new UserMinDto(candidate)
            return ownerDto
        } else {
            return undefined 
        }
    }

    async getById(id, user, lang = "en-EN") {

        const row = await db.query('SELECT * FROM film WHERE id = $1', [id]).then(data => data.rows[0])
        
        var rated = {
            rated: false
        }
        const rating = await db.query("SELECT * FROM ratings WHERE fid = $1", [id]).then(data => data.rows.length ? data.rows : [])
        const rating_average = rating.length > 0 ? ((Math.round((rating.map(e => e.value).reduce((a, b) => a + b) / rating.length) + Number.EPSILON) * 100) / 100) : null
        const current_rate = rating.find(r => r.owner === user.id)
        if(user.id && current_rate) rated = {
            rated: true, 
            rated_value: current_rate.value
        }

        var res_model = {
            ...row, 
            ...rated, 
            rating,
            rating_average,
            duration: `${row.duration.hours ? row.duration.hours + " час(ов) ":""}${row.duration.minutes ? row.duration.minutes + " минут(а)":""}`
        } 
        console.log(user)
        console.log(res_model.id)

        if(user) {
            res_model = {
                ...res_model,
                is_in_watch_list: user.watch_later.includes(String(res_model.id))
            }
        } 


        return new FilmDto({...res_model})
    }

    async search(
        watch_later,
        q,
        offs = 0,
        lim = 12,
        fl = [],
        flt,
        datesrt,
        psrt,
        psrtt,
        segment_start, 
        segment_end
    ) {
        //SPELL CHECK
        const q_f = q.replaceAll(/[^a-zа-я0-9 ]/gi, ' ').split(" ").filter(el => el !== "")
        const q_s = await new Promise((resolve, reject) => checkTexts(q_f, (err, data) => {
            let q_s = []
            if(err) {
                console.error(err) 
                throw ApiError.BadRequest(ApiError.econfig.bad_request)
            }
            data.map((el, i) => {
                if(el.length > 0 && el[0] && el[0].s.length && el[0].s[0]) {
                    if(el[0].s.length) return q_s.push(el[0].s[0].toLowerCase())
                } 
                q_s.push(q_f[i].toLowerCase())
            })
            return resolve(q_s)
        }, {
            lang: "ru"
        }))
        const q_s_cf = q_s.map(el => {
            return {
                data: el.split(""),
                indeed: false
            }
        }) 
        //CONSTRUCT SQL SCRIPT
        var flt_construct=''
        var namedef_construct=``
        const segment_construct = `${segment_start !== 'any' ? "AND year > " + segment_start : ""}${segment_end !== 'any' ? " AND year < " + segment_end + " " : ""}`
        const free_search_ord = ` ${psrt==='date' ? `ORDER BY year ${psrtt}, id asc `:''}OFFSET ${offs} LIMIT ${lim}`
        var free_search=q_s.length===0?` OFFSET ${offs} LIMIT ${lim}`:""
        var free_s_prefix = q_s.length===0?` WHERE year != 01100111`:""
        var req_f

        if(q_s.length>1) for(var i=0;i<q_s.length;i++) {
            switch(i) {
                case 0: 
                    namedef_construct+=` WHERE (lowercasetitle LIKE '%${q_s[i]}%' `
                    break
                case q_s.length-1:
                    namedef_construct+=`OR lowercasetitle LIKE '%${q_s[i]}%') ` 
                    break
                default: 
                    namedef_construct+=`OR lowercasetitle LIKE '%${q_s[i]}%' `
                    break
            }  
        }  
        else if(q_s.length===1) namedef_construct=` WHERE (lowercasetitle LIKE '%${q_s[0]}%') `
        
        switch(flt) {
            case "without":
                if(datesrt&&datesrt!=="any"&&psrt==="without") {
                    req_f = `SELECT * FROM film ${free_s_prefix}${namedef_construct} AND year = ${datesrt}${free_search}`
                    break
                } else {
                    switch(q_s.length) {
                        case 0: 
                            req_f = `SELECT * FROM film ${free_s_prefix} ${segment_construct} ${free_search}`
                            break 
                        default: 
                            req_f = `SELECT * FROM film ${namedef_construct}${segment_construct} ${free_search}`
                            break

                    }
                    break
                    /*if(q_s.length > 1) req_f = `SELECT * FROM film ${namedef_construct}${segment_construct}${free_search}`
                    else req_f = `SELECT * FROM film ${namedef_construct} ${free_search}`*/
                }
            default: 
                if(fl.length) {
                    var genre_str = array2postgres(fl)
                    flt_construct=` AND ${flt === 'solely' ? ` NOT(genres && '${genre_str}')` : `genres @> '${genre_str}'`}`
                }
                if(datesrt&&datesrt!=="any"&&psrt==="without") flt_construct+=` AND year = ${datesrt}`
                switch(q_s.length) {
                    case 0: 
                        req_f = `SELECT * FROM film ${free_s_prefix} ${segment_construct}${namedef_construct}${flt_construct}${free_search}`
                        break
                    default: 
                        req_f = `SELECT * FROM film ${free_s_prefix}${namedef_construct}${segment_construct}${flt_construct}${free_search}`
                        break
                }
                //req_f = `SELECT * FROM film ${free_s_prefix}${namedef_construct}${flt_construct}${free_search}`
                break
        }
        //FILTER FILMS
        if(free_search==="") {
            var rows = await db.query(req_f).then(data => data.rows)
            for(var a=0;a<rows.length;a++) {
                var name_sp = rows[a].title.replaceAll("-", " ").split(" ").map(ns => {
                    return {
                        c: ns,
                        verified: false
                    }
                })
                for(var q=0;q<q_s_cf.length;q++) q_s_cf[q].indeed = false 
                rows[a].i_p = { 
                    //Is search word 
                    issf: false,   
                    issf_i: [],  
                    i: 0, 
                    inc_c: 0,
                    strlen_qu: 0,   
                    order_c: [] 
                } 
                for(var b=0;b<name_sp.length;b++) { 
                    for(var c=0;c<q_s_cf.length;c++) {
                        if(name_sp[b].c.toLowerCase()[0] === q_s_cf[c].data[0] && !q_s_cf[c].indeed && !name_sp[b].verified) { 
                            //TOTAL MATCHES 
                            var row_model = {
                                cert_word: c,   
                                word_index: b,
                                ias: c === b, 
                                inc_c: 0,
                                t_order: 0,   
                            }

                            for(var d=1;d<q_s_cf[c].data.length;d++) {    
                                if(name_sp[b].c[d] === q_s_cf[c].data[d]) {
                                    row_model.inc_c++ 
                                    rows[a].i_p.inc_c++ 
                                }   
                            } 

                            if(row_model.inc_c >= Math.trunc(q_s_cf[c].data.length / 2)) {
                                q_s_cf[c].indeed = true
                                name_sp[b].verified = true
                            }


                            rows[a].i_p.strlen_qu = name_sp.length === q_s_cf.length ? 1 : 0
                            rows[a].i_p.issf_i.push(row_model)
                            rows[a].i_p.order_c.push(name_sp[b].c.toLowerCase()[0])

                            if(rows[a].i) {
                                rows[a].i += 1   
                            } else {  
                                rows[a].i = 2   
                            }  
                        } 
                    }
                }
            }  

            //REDUCE FILMS 
            for(var a=0;a<rows.length;a++) { 
                for(var b=0;b<rows[a].i_p.issf_i.length;b++) { 
                    if(rows[a].i_p.issf_i[b].ias) {
                        rows[a].i_p.i++
                    }  
                }   
            }      
            rows = rows.filter(row => row.i_p.issf_i.length > 0 && row.i_p.inc_c > 0)
                .sort((a, b) => a.i_p.i - b.i_p.i)
                .sort((a, b) => a.i_p.strlen_qu - b.i_p.strlen_qu) 
                .sort((a, b) => a.i_p.inc_c - b.i_p.inc_c)
                .sort((a, b) => a.i_p.t_order - b.i_p.t_order).reverse()

            if(psrt==='date') {
                switch(psrtt) { 
                    case 'asc':
                        rows = rows.sort((a, b) => a.year - b.year)
                        break
                    case 'desc': 
                        rows = rows.sort((a, b) => a.year - b.year).reverse()
                        break
                }
            }
            return {films: rows.slice(offs, offs+lim).map(row => new FilmMinDto(row)).map(row => watch_later && watch_later.includes(String(row.id)) ? {...row, is_in_watch_list: true} : row), can_load: rows.slice(offs+lim, offs+(lim*2)).length > 0}
        } else { 
            const _rows = await db.query(req_f.replace(free_search, free_search_ord)).then(data => data.rows)
            return {films: _rows, can_load: _rows.length>0}
        }

        //if(free_search==="") return {films: rows.slice(offs, offs+lim), can_load: rows.slice(offs+lim, offs+(lim*2)).length > 0}
    }

    async removeWillReadFilm(userid, fid) {
        try {
            await db.query("UPDATE users SET watch_later = array_remove(watch_later, $1) WHERE id = $2", [fid, userid])
            return {status: "ok"}
        } catch(e) {
            console.log(e)
            return {status: "err"}
        }
    }

    async addWillReadFilm(userid, fid) {
        try {
            await db.query("UPDATE users SET watch_later = array_append(watch_later, $1) WHERE id = $2", [fid, userid])
            return {status: "ok"}
        } catch(e) {
            console.log(e)
            return {status: "err"}
        }
    }
 
    async getComments(id, offset, limit) { 
        const data = await db.query(`SELECT * FROM comments WHERE fid = $1 ORDER BY id DESC OFFSET $2 LIMIT $3`, [id, offset, limit]).then(data => data.rows && data.rows.length ? data.rows : [])

        if(!data.length) {
            return {
                comments: [],
                can_load: false
            }
        }
        
        const owns = await db.query(`SELECT * FROM users WHERE id = any('${array2postgres_ex(data, 'uid')}')`).then(data => data.rows)

        for(var i=0;i < data.length;i++) {
            for(var a=0;a < owns.length;a++) {
                if(data[i].uid === owns[a].id) data[i].user = new UserMinDto(owns[a])
            }
            if(!data[i].user) data[i].user = new UserMinDto({
                username: 'Deleted accound',
                id: data[i].user,
                avatar: 'user64.png'
            })
        }
        
        if( data.length < limit) return { 
            comments: data,
            can_load: false
        } 
        
        return {comments: data}
    }

    async addComment(fid, u, data) { 
        const date = new Date()
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()
        const datef_v = `${day}-${month}-${year}`
        const datef_ms = Date.now()
        const payload = await db.query(`INSERT INTO comments(fid, uid, data, datef_ms, datef_v) VALUES($1, $2, $3, $4, $5) RETURNING *`, [fid, u.id, data, datef_ms, datef_v]).then(data => data.rows[0])
        const userDto = new UserMinDto(u)
        syncFilmEvent(fid, "comment", {
            comment: {
                ...payload, 
                datef_ms: Number(payload.datef_ms),
                user: {
                    ...userDto,
                    avatar: u.avatar
                },
            }
        })

        return {
            ...payload, 
            datef_ms: Number(payload.datef_ms),
            user: {
                ...userDto,
                avatar: u.avatar
            }
        }
        
    }

    async pushRating(uid, fid, value) {
        const candidate = await db.query(`SELECT * FROM ratings WHERE owner = $1 and fid = $2`, [uid, fid]).then(data => data.rows.length > 0)
        if(!candidate) {
            db.query("INSERT INTO ratings(owner, value, fid) VALUES($1, $2, $3)", [uid, value, fid])
            return {status: "ok"}
        } else {
            db.query(`UPDATE ratings SET value = $1 WHERE owner = $2 AND fid = $3`,[ value, uid, fid])
            return {status: "ok"}
        }
    }
}

module.exports = new FilmService()