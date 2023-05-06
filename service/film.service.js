const UserModel = require("../models/user.model")
const DBAgent = require("../utils/db")
const UserMinDto = require("../dtos/user.min.dto")
const ApiError = require("../exceptions/api.error")
const jsdom = require("jsdom")
const translatte = require('translatte');
const {decode} = require("html-entities") 
const {syncFilmEvent} = require("../websocket/index")

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

                    const imdb_translate = {
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
                    })
        
                    return resolve({
                        ...res_model,
                        imdb_translate
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