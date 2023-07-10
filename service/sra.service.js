const {dynamic_hostnames, static_hostnames} = require("../utils/sra.hstnames")
const ApiError = require("../exceptions/api.error")
const fetch = require("node-fetch")
const http = require("http")
const { JSDOM } = require("jsdom")
const { string_up_to_char } = require("../utils/logic")
const logger = require("../utils/logger")
const https = require("https")

class SRAService { 

    construct_error_response(url = "not specified", status = 404, error = "null") { 
        return `
        <html>
            <head> 
                <title>${status}</title>
            </head>
            <style> 
                html {
                    background: url("/static/cover3.jpg");
                    background-size: cover;
                    background-position: bottom
                }
        
                .container { 

                    background: #000;
                    opacity: .9;
                    padding: .3rem
                }
                
                * {
                    font-family: "Consolas";
                    font-size: 12px;
                    color: #0f0
                }
            </style>
            <body>  
                <div class="container">
                        <div> URL: ${url} </div> 
                        <div> STATUS: ${status} </div> 
                        <div> INFO: ${error} </div>
                </div>
            </body>
        </html>
        `
    }

    async rewrite_voidboost(url) {
        return fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "text/html"
                }
            }
        ).then(res => {
            return res.text()
        }).then(res_txt => {
            res_txt = res_txt.replace("'preroll':", "'__undefined__':")
                .replaceAll("#00adef", "#f0a832")
                .replace(`${res_txt.substring(res_txt.indexOf("https://unpkg.com"), res_txt.indexOf("index.js") + 8)}`, `http://localhost:5000/voidboost/playerjs?url=${res_txt.substring(res_txt.indexOf("https://unpkg.com"), res_txt.indexOf("index.js") + 8)}`)
                .replace("/thumbnails/", "https://voidboost.net/thumbnails/")
                .replace("'?s='", `'${url}?s='`)
                .replace("_url_params = ''", `_url_params = ''; parent.postMessage('https://voidboost.net/embed/${url}?s='+ _season +'&e='+ _episode +'&h='+ cdn.player.getVBR() + _url_params, "*")`)
                .replace("window.location.href = '/'+ type +'/'+ t +'/iframe?h='+ cdn.player.getVBR() + a;", "parent.postMessage(window.location.href = 'https://voidboost.net/'+ type +'/'+ t +'/iframe?h='+ cdn.player.getVBR() + a)")
            const dom = new JSDOM(res_txt)
            const sc = dom.window.document.createElement('script')
            sc.src = `/static/pjs/js/voidboost/sch.js`
            dom.window.document.getElementsByTagName('head')[0].appendChild(sc)
            return dom.window.document.documentElement.outerHTML
        }).catch((error) => {
            console.error("Got err: " + error)
            return this.construct_error_response(url, 500, error)
        })
    }

    async rewrite_vid167(url_c) {

        return await new Promise(async(resolve, reject) => { 
            const o = {
                hostname: url_c.hostname,
                path: url_c.pathname,
                port: 443,
                headers: {
                    'Content-Type': 'text/html',
                    'Referer': 'http://localhost:5000',
                }
            };

            https.get(o, async(res) => { 
                const {statusCode} = res 
                if(statusCode !== 200) return resolve(this.construct_error_response(url_c.href, statusCode, "BadRequest"))
                var chunks = ''
                res.on('data', (chunk) => {
                    chunks += chunk.toString('utf8')
                })
                res.on("end", async () => {

                    if(chunks === '') return resolve(this.construct_error_response(url_c.href, statusCode, "BadRequest"))

                    //logging script versions
                    //hls.js
                    const hlsjsv = string_up_to_char(chunks, 'hls.js?v=', '"', 15)
                    const hlsjsv_entries = await logger.read_entries("vid167_hlsjsv")
                    if(hlsjsv_entries) { 
                        var hlsjsve_spl = hlsjsv_entries.split("\n").filter(el => el !== "")
                        if(!hlsjsve_spl.includes(String(hlsjsv))) logger.create_entry("vid167_hlsjsv", hlsjsv)
                    } else {
                        logger.create_entry("vid167_hlsjsv", hlsjsv)
                    }
                    //playerjs.js 
                    const pjsv = string_up_to_char(chunks, 'playerjs.js?=', '"', 30)
                    const pjsv_entries = await logger.read_entries("vid167_pjsv")
                    if(pjsv_entries) {
                        var pjsve_spl = pjsv_entries.split("\n").filter(el => el !== "")
                        if(!pjsve_spl.includes(String(pjsv))) logger.create_entry("vid167_pjsv", pjsv)
                    } else {
                        logger.create_entry("vid167_pjsv", pjsv)
                    }

                    chunks = chunks.replace("/playerjs/js/playerjs.js?=" + pjsv, `/vid167/playerjs?curl=${url_c.origin}`)
                    .replace("/player", `${url_c.origin}/player`)
                    .replace("preroll", "__undefined__")
                    .replace("pausebanner", "__undefined__")
                    .replace("banner_show", "__undefined__")

                    const dom = new JSDOM(chunks)
                    const sc = dom.window.document.createElement('script')
                    sc.src = `/static/pjs/js/vid167/rch.js`
                    dom.window.document.getElementsByTagName('head')[0].appendChild(sc)
                    return resolve(dom.window.document.documentElement.outerHTML)
                })
                res.on("error", err => {
                    console.error("Got error: " + err) 
                    return resolve(this.construct_error_response(url_c.href, 500, error))
                })
            })
        })
    }

    async rewrite_svetacdnin(hostname, path, search) {
        return await new Promise(async (resolve, reject) => {
            let options = {
                hostname,
                path: path + search,
                port: 443,
                headers: {
                    'Content-Type': 'text/html',
                    'Referer': 'http://localhost:5000',
                }
            };
            
            https.get(options, async (res) => {
              const { statusCode } = res;

                if(statusCode !== 200) return resolve(this.construct_error_response("https://" + hostname + path + search, statusCode, "BadRequest"))
        
                var chunks = ""
                res.on("data", (chunk) => {
                    chunks += chunk.toString('utf8')
                })
                res.on("end",async () => {

                    //substituting paths for sources

                    const v = string_up_to_char(chunks, '?v=', '"', 15)
                    const v_entries = await logger.read_entries("annacdn_v")
                    if(v_entries) {
                        var ve_spl = v_entries.split("\n").filter(el => el !== "")
                        if(!ve_spl.includes(String(v))) logger.create_entry("annacdn_v", v)
                    } else {
                        logger.create_entry("annacdn_v", v)
                    }

                    chunks = chunks.replace(`/Assets/pj_films.js?v=${v}`, `/annacdn/script?url=/Assets/pj_films.js&v=${v}`)
                                   .replace(`/Assets/pj_serials.js?v=${v}`, `/annacdn/script?url=/Assets/pj_serials.js&v=${v}`)
                                   .replace(`/Assets/fb.js?v=${v}`, `https://${hostname}/Assets/fb.js?v=${v}`)
                                   .replace(`/Assets/pj.js?v=${v}`, `https://${hostname}/Assets/pj.js?v=${v}`)
                                   .replace(`https://cdn.jsdelivr.net/npm/hls.js@0.14.17`,`/static/pjs/js/annacdn/hls.js@0.14.17`)
                                   .replace(`/Assets/iframe.css`, `https://${hostname}/Assets/iframe.css`)
                    const dom = new JSDOM(chunks)
                    const link = dom.window.document.createElement('script')
                    link.src = `/static/pjs/js/annacdn/rch.js`
                    dom.window.document.getElementsByTagName('head')[0].appendChild(link)

                    return resolve(dom.window.document.documentElement.outerHTML)
              })
            }).on('error', (e) => {
              console.error(`Got error: ${e.message}`)
              return resolve(this.construct_error_response("https://" + hostname + path + search, 500, error))
            })
        })
    }

    async rewrite_annacdncc(hostname, path, search) {

        return await new Promise(async (resolve, reject) => {
            let options = {
                hostname,
                path: path + search,
                headers: {
                    'Content-Type': 'text/html',
                    'Referer': 'http://localhost:5000',
                }
            };
            
            http.get(options, async (res) => {
              const { statusCode } = res

          
              if(statusCode !== 302) {
                console.log("SPA: Terminating: The request was not redirected.")
                return resolve(this.construct_error_response("https://" + hostname + path + search, statusCode, "The request was not redirected."))
              }
          
              http.get({...options, path: res.headers.location}, async (_res) => {
                var chunks = ""
                _res.on("data", (chunk) => {
                    chunks += chunk.toString('utf8')
                })
                _res.on("end",async () => {

                    //substituting paths for sources
 
                    const v = string_up_to_char(chunks, '?v=', '"', 15)
                    const v_entries = await logger.read_entries("annacdn_v")
                    if(v_entries) {
                        var ve_spl = v_entries.split("\n").filter(el => el !== "")
                        if(!ve_spl.includes(String(v))) logger.create_entry("annacdn_v", v)
                    } else {
                        logger.create_entry("annacdn_v", v)
                    }

                    chunks = chunks.replace(`/Assets/pj_films.js?v=${v}`, `/annacdn/script?url=/Assets/pj_films.js&v=${v}`)
                                   .replace(`/Assets/pj_serials.js?v=${v}`, `/annacdn/script?url=/Assets/pj_serials.js&v=${v}`)
                                   .replace(`/Assets/fb.js?v=${v}`, `https://${hostname}/Assets/fb.js?v=${v}`)
                                   .replace(`/Assets/pj.js?v=${v}`, `https://${hostname}/Assets/pj.js?v=${v}`)
                                   .replace(`https://cdn.jsdelivr.net/npm/hls.js@0.14.17`,`/static/pjs/js/annacdn/hls.js@0.14.17`)
                                   .replace(`/Assets/iframe.css`, `https://${hostname}/Assets/iframe.css`)
                    const dom = new JSDOM(chunks)
                    const link = dom.window.document.createElement('script')
                    link.src = `/static/pjs/js/annacdn/rch.js`
                    dom.window.document.getElementsByTagName('head')[0].appendChild(link)

                    return resolve(dom.window.document.documentElement.outerHTML)
                })
              })
            }).on('error', (e) => {
              console.error(`Got error: ${e.message}`)
              return resolve(this.construct_error_response("https://" + hostname + path + search, 500, error))
            })
        })
    }

    async rewrite_api_wprefix_ws(url_c) {

        return new Promise(async (resolve, reject) => { 
            const o = {
                hostname: url_c.hostname,
                path: url_c.pathname,
                port: 443,
                headers: {
                    'Content-Type': 'text/html',
                    'Referer': 'http://localhost:5000',
                }
            };

            https.get(o, res => {
                const {statusCode} = res

                if(statusCode !== 200) return resolve(this.construct_error_response(url_c.href, statusCode, "BadRequest"))

                let chunks = ""
                res.on("data", chunk => {
                    chunks += chunk.toString('utf8')
                })
                res.on("end", () => { 
                    const primary_frg = chunks.substring(chunks.indexOf("\"color-primary\":") + 17, chunks.indexOf("\"background-color-primary\""))
                    const primary = primary_frg.replace("\",", "")
                    chunks = chunks
                        .replace("body {", "html {height: 100%;overflow: hidden;}\nbody {\n height:100%;")
                        .replaceAll(`"color-primary":"${primary}"`, "\"color-primary\":\"#f0a832\"")
                    const dom = new JSDOM(chunks)
                    const link = dom.window.document.createElement('script')
                    link.src = `/static/pjs/js/api_wprefix_ws/sch.js`
                    dom.window.document.getElementsByTagName('head')[0].appendChild(link)
                    return resolve(dom.window.document.documentElement.outerHTML)
                })
                res.on("error", (err) => {
                    console.error("Got err: " + err) 
                    return resolve(this.construct_error_response(url_c.href, 500, error))
                })
            })
        })
    }

    async multidomain_check(url, url_c) {
        for(var i=0;i < dynamic_hostnames.length;i++) { 
            var coincids = 0
            for(var a=0;a < dynamic_hostnames[i].overlaps.length;a++) {
                if(url.includes(dynamic_hostnames[i].overlaps[a]) && url.indexOf(dynamic_hostnames[i].overlaps[a]) < (url.indexOf("?") !== -1 ? url.indexOf("?") : 1000)) coincids++
            }

            if(coincids >= 1) {
                var data = null
                switch(dynamic_hostnames[i].domain_wprefix) {
                    case "vid16wprefix":
                        data = await this.rewrite_vid167(url_c)
                        return data
                    case "api_wprefix_ws": 
                        data = await this.rewrite_api_wprefix_ws(url_c)
                        return data
                    case "wprefix_svetacdn_in":
                        if(url_c.hostname === '47.svetacdn.in') return this.rewrite_annacdncc(url_c.hostname, url_c.pathname, url_c.search)
                        return this.rewrite_svetacdnin(url_c.hostname, url_c.pathname, url_c.search)
                }
            } else { 
                continue
            }
        }
        return null
    }

    async rewritebhostname(url) {
        try { 
            const url_deconstructed = new URL(url.replace("https//", "https://").replace("https:://", "https://"))

            const multidomain = await this.multidomain_check(url, url_deconstructed)
            if(multidomain) return multidomain
            
            switch (url_deconstructed.host) {
                case static_hostnames.voidboost_net.domain:
                    return this.rewrite_voidboost(url)
                case static_hostnames.annacdn_cc.domain:
                    return this.rewrite_annacdncc(url_deconstructed.hostname, url_deconstructed.pathname, url_deconstructed.search)
                default:
                    return this.construct_error_response(url, "not specified", "Undefined hostname")
            }
        } catch(e) { 
            return this.construct_error_response(url, "not specified", "Bad Request")
        }
    }
} 

module.exports = new SRAService()