const UserModel = require("../models/user.model")
const DBAgent = require("../utils/db")
const UserMinDto = require("../dtos/user.min.dto")
const ApiError = require("../exceptions/api.error")
const jsdom = require("jsdom")
const translatte = require('translatte');
const {decode} = require("html-entities") 
const {syncFilmEvent} = require("../websocket/index")
const {checkTexts} = require("yandex-speller")
const { removeStopwords, rus } = require('stopword')

class FilmService {

    async paginate(offset, limit) {
        return new Promise((resolve, reject) => {
            DBAgent.db.all(DBAgent.__paginateMethod, [offset, limit], (err, rows) => { 
                if(err) return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
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

    async getRating(fid) {
        return new Promise(async (resolve, reject) => {
            DBAgent.db.all(`SELECT * FROM ratings WHERE fid = ${fid}`, (err, data) => {
                if(err) {
                    console.error(err)
                    return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
                } 
                return resolve(data)
            })
        })
    }

    async getById(id, uid, lang = "en-EN") {
        return new Promise(async (resolve, reject) => {
            DBAgent.db.get(DBAgent.__getByIdMethod, [id], async (err, row) => {

                if(err) {
                    console.error(err) 
                    return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
                }

                var rated = {
                    rated: false
                }
                const rating = await this.getRating(id)
                const rating_average = rating.length > 0 ? ((Math.round((rating.map(e => e.value).reduce((a, b) => a + b) / rating.length) + Number.EPSILON) * 100) / 100) : null
                const current_rate = rating.find(r => r.owner === uid)
                if(uid && current_rate) rated = {
                    rated: true, 
                    rated_value: current_rate.value
                }

                try {
                    row.players = JSON.parse(row.players)
                    var res_model = {
                        ...row, 
                        ...rated, 
                        rating,
                        rating_average
                    } 
        
                    if(uid) {
                        const req_owner = await UserModel.findById(uid)
                        
                        res_model = {

                            ...res_model,
                            watchLater: req_owner.watchLater
                        }
                    }

                    /*const imdb_translate = {
                        status: "ok", 
                        origin: null,
                        cr_origin: null,
                        lang,
                        title: null,
                        description: null,
                        credits: [],
                    }

                    
                    await fetch(`https://www.imdb.com/find/?q=${row.lowerName}`, {
                    }).then(res => res.text()).then(async res_txt => {
                        //GET SUBSTRING FROM __NEXT__ CONFIG 
                        const fdata = JSON.parse(res_txt.substring(
                            res_txt.indexOf('<script id="__NEXT_DATA__" type="application/json">') + 51, 
                            res_txt.indexOf('"scriptLoader":[]}</script>') + 18, 
                        ))

                        imdb_translate.origin = `https://www.imdb.com/title/${fdata.props.pageProps.titleResults.results[0].id}`
                        await fetch(imdb_translate.origin, {
                        }).then(res => res.text()).then(async res_txt => {

                            //FETCH ALL CAST
                            imdb_translate.cr_origin = `https://www.imdb.com/title/${fdata.props.pageProps.titleResults.results[0].id}/fullcredits`
                            await fetch(imdb_translate.cr_origin, {
                            }).then(res => res.text()).then(res_txt => {
                                const doc = new jsdom.JSDOM(res_txt, {includeNodeLocations: true}) 
                                const odds = doc.window.document.querySelectorAll('tr[class="odd"]')
                                const evs = doc.window.document.querySelectorAll('tr[class="even"]')
                                const c = [...odds, ...evs]
                                const cast = []
                                odds.forEach((odd) => {
                                    try {
                                        const cast_name = odd.childNodes[3].childNodes[1].childNodes[0].textContent
                                        const cast_role = odd.childNodes[7].childNodes[1].textContent
                                        cast.push({
                                            name: cast_name.replace(" ", "").replace("\n", ""),
                                            role: cast_role
                                        })
                                    } catch(e) {
                                        console.error("[IMDB PARSER]: RECEIVED ERROR ON CAST PARSE ETHAP.")
                                        return undefined
                                    } 
                                })
                                evs.forEach((odd) => {
                                    try {
                                        const cast_name = odd.childNodes[3].childNodes[1].childNodes[0].textContent
                                        const cast_role = odd.childNodes[7].childNodes[1].textContent
                                        cast.push({
                                            name: cast_name.replace(" ", "").replace("\n", ""),
                                            role: cast_role
                                        })
                                    } catch(e) {
                                        console.error("[IMDB PARSER]: RECEIVED ERROR ON CAST PARSE ETHAP.")
                                        return undefined
                                    } 
                                })
                                doc.window.document.querySelectorAll("img").forEach(p => {
                                    const attr = p.getAttribute("title")
                                    if(!attr || attr === "" || attr === " ") return undefined
                                    for(var i=0;i < cast.length;i++) {
                                        var pic = p.getAttribute("loadlate")
                                        if(!pic) pic = "https://m.media-amazon.com/images/S/sash/N1QWYSqAfSJV62Y.png"
                                        else {
                                            pic = pic.split("._V1_")[0] + ".jpg"
                                        }
                                        if(attr == cast[i].name) {
                                            cast[i] = {
                                                ...cast[i],
                                                pic
                                            }
                                        }
                                    }
                                })
                                
                                imdb_translate.credits = cast
                            })

                            const doc = new jsdom.JSDOM(res_txt)
                            const imdb_json = JSON.parse(doc.window.document.querySelector('script[type="application/ld+json"]').innerHTML)
                            var tolng
                            switch(lang) {
                                case "en-EN": 
                                    tolng = "en"
                                    break
                                case "ua-UA": 
                                    tolng = "uk"
                                    break
                                case "ru-RU":
                                    tolng = "ru"
                                    break
                            }
                            //TRANSLATE CREDITS 
                            const cr_str = imdb_translate.credits.map((cr, i) => {
                                return `${i ? ", " : ""}${cr.name}`
                            }).join("")
                            await translatte("Ving Rhames", {
                                from: "en",
                                to: tolng
                            }).then(res => {
                            }).catch(err => {
                                console.error(err)
                                imdb_translate.status = "err"
                            });
                            //NAME 
                            await translatte(decode(imdb_json.name), {
                                from: 'en',
                                to: tolng,
                            }).then(res => {
                                imdb_translate.title = res.text
                            }).catch(err => {
                                console.error(err)
                                imdb_translate.status = "err"
                            });

                            await translatte(decode(imdb_json.description), {
                                from: 'en',
                                to: tolng,
                            }).then(res => {
                                imdb_translate.description = res.text
                            }).catch(err => {
                                console.error(err)
                                imdb_translate.status = "err"
                            });

                                
                        })
                    }) */
        
                    return resolve({
                        ...res_model,
                        imdb_translate: {
                            status: "err"
                        }
                    })
                } catch(e) {
                    console.error(e)
                    return resolve({
                        ...res_model,
                        rating,
                        ...rated,
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
        var psrt_construct=''
        var namedef_construct=``
        var free_search=q_s.length===0?` ${psrt==='date' ? `ORDER BY year ${psrtt} `:''}LIMIT ${offs}, ${lim}`:""
        var free_s_prefix = q_s.length===0?` WHERE duration NOT LIKE "prefix" `:""
        var req_f

        if(q_s.length>1) for(var i=0;i<q_s.length;i++) {
            switch(i) {
                case 0: 
                    namedef_construct+=` WHERE (lowerName LIKE "%${q_s[i]}%" `
                    break
                case q_s.length-1:
                    namedef_construct+=`OR lowerName LIKE "%${q_s[i]}%") ` 
                    break
                default: 
                    namedef_construct+=`OR lowerName LIKE "%${q_s[i]}%" `
                    break
            }
        }  
        else if(q_s.length===1) namedef_construct=` WHERE (lowerName LIKE "%${q_s[0]}%") `
        
        switch(flt) {
            case "without": 
                if(datesrt&&datesrt!=="any"&&psrt==="without") req_f = `SELECT * FROM films ${free_s_prefix}${namedef_construct} AND year = ${datesrt}${psrt_construct}${free_search}`
                else req_f = `SELECT * FROM films ${namedef_construct}${psrt_construct}${free_search}`
                break
            default: 
                for(var i=0;i<fl.length;i++) flt_construct=` AND genres${flt === 'solely' ? " NOT" : ""} LIKE '%${fl[i]}%'`
                if(datesrt&&datesrt!=="any"&&psrt==="without") flt_construct+=` AND year = ${datesrt}`
                req_f = `SELECT * FROM films ${free_s_prefix}${namedef_construct}${flt_construct}${psrt_construct}${free_search}`
                break
        }

        return new Promise((resolve, reject) => {
            DBAgent.db.all(req_f, [], async (err, rows) => {
                if(err) {
                    console.error(err)
                    return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
                } 
                //FILTER FILMS
                if(free_search==="") {
                    for(var a=0;a<rows.length;a++) {
                        var name_sp = rows[a].name.replaceAll("-", " ").split(" ").map(ns => {
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
                }
    
                rows.map((row) => {  
                    row.players = JSON.parse(row.players) 
                    row.genres = JSON.parse(row.genres)      
                }) 
                if(free_search==="") resolve({films: rows.slice(offs, offs+lim), can_load: rows.slice(offs+lim, offs+(lim*2)).length > 0}) 
                else {
                    await new Promise((r, j) => {
                        DBAgent.db.all(req_f, [], (err, _rows) => {
                            if(err) {
                                console.error(err)
                                return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
                            } 

                            resolve({films: rows, can_load: _rows.length>0}) 
                        })
                    })
                }
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

    async getComments(id, offset, limit) { 
        return new Promise((resolve, reject) => {
            DBAgent.db.all(`SELECT * FROM comments WHERE fid = ${id} ORDER BY id DESC LIMIT ${offset}, ${limit}`, async (e, data) => {
                if(e) return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
                if(!data || !data.length) return resolve({comments: []})
                const comments_parsed = []
                const data_ids=[]
                data.forEach((d) => data_ids.push(d.id))
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
                return resolve({comments: comments_parsed})
            })
        })
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
                if(e) return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
                const user = await UserModel.findById(uid)
                const userDto = new UserMinDto(user)
                syncFilmEvent(fid, "comment", {
                    comment: {
                        fid: Number(fid), 
                        user: userDto, 
                        data, 
                        datef_ms,
                        datef_v
                    }
                })
                return resolve({
                    data,
                    user: userDto,
                    datef_ms,
                    datef_v
                })
            })
        })
    }

    async pushRating(uid, fid, value) {
        return new Promise(async (resolve, reject) => {
            const exists = await new Promise((r, j) => {
                DBAgent.db.all(`SELECT * FROM ratings WHERE owner = "${uid}" AND fid = ${fid}`, (err, data) => {
                    if(err) {
                        console.log(err)
                        return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
                    }
                    if(data.length) return r(true)
                    else return r(false)
                })
            })

            if(exists) DBAgent.db.run(`UPDATE ratings SET value = ${value} WHERE owner = "${uid}" AND fid = ${fid}`, (err, data) => {
                if(err) {
                    console.log(err)
                    return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
                }
                return resolve({status: "ok"})
            }) 

            DBAgent.db.run(`INSERT INTO ratings(owner, value, fid) VALUES("${uid}", ${value}, ${fid})`, (err, data) => {
                if(err) {
                    console.log(err)
                    return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
                }
                return resolve({status: "ok"})
            })
        })
    }
}

module.exports = new FilmService()