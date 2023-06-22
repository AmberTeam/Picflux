const {dynamic_hostnames, static_hostnames} = require("../utils/sra.hstnames")
const ApiError = require("../exceptions/api.error")
const fetch = require("node-fetch")

class SRAService { 

    async rewrite_voidboost(embeedurl) {
        return fetch(embeedurl,
            {
                method: "GET",
                headers: {
                    "Content-Type": "text/html"
                }
            }
        ).then(res => {
            return res.text();
        }).then((res_txt) => {
            return res_txt.replace("'preroll':", "'__undefined__':")
                .replaceAll("#00adef", "#f0a832")
                .replace(`${res_txt.substring(res_txt.indexOf("https://unpkg.com"), res_txt.indexOf("index.js") + 8)}`, `http://localhost:5000/voidboost/playerjs?url=${res_txt.substring(res_txt.indexOf("https://unpkg.com"), res_txt.indexOf("index.js") + 8)}`)
                .replace("/thumbnails/", "https://voidboost.net/thumbnails/")
                .replace("'?s='", `'${embeedurl}?s='`)
                .replace("_url_params = ''", `_url_params = ''; parent.postMessage('https://voidboost.net/embed/${embeedurl}?s='+ _season +'&e='+ _episode +'&h='+ cdn.player.getVBR() + _url_params, "*");`)
                .replace("window.location.href = '/'+ type +'/'+ t +'/iframe?h='+ cdn.player.getVBR() + a;", "parent.postMessage(window.location.href = 'https://voidboost.net/'+ type +'/'+ t +'/iframe?h='+ cdn.player.getVBR() + a)");
        }).then(rewrited => {
            return { status: "ok", data: rewrited };
        }).catch((error) => {
            return { status: "err", error };
        });
    }

    async rewrite_api_synchroncode(embeedurl) {

        return fetch(embeedurl).then(res => {
            return res.text();
        }).then(res_txt => {

            const primary_frg = res_txt.substring(res_txt.indexOf("\"color-primary\":") + 17, res_txt.indexOf("\"background-color-primary\""));
            const primary = primary_frg.replace("\",", "");
            const rewrited = res_txt
                .replace("body {", "html {height: 100%;overflow: hidden;}\nbody {\n height:100%;")
                .replaceAll(`"color-primary":"${primary}"`, "\"color-primary\":\"#f0a832\"");
            return { status: "ok", data: rewrited };
        }).catch(error => {
            return { status: "err", error };
        });
    }

    async rewrite_vid167(embeedurl, url) {

        return fetch(embeedurl, {
        }).then(res => {
            return res.text();
        }).then(async (res_txt) => {

            const rewrited = res_txt.replace("/playerjs/js/playerjs.js?=1012", `http://localhost:5000/vid167/playerjs?curl=${url}`)
                .replace("/player", `${url}/player`)
                .replace("preroll", "__undefined__")
                .replace("pausebanner", "__undefined__")
                .replace("banner_show", "__undefined__");
            return rewrited
        });
    }

    async rewrite_annacdncc(embeedurl, host) {

        return fetch(embeedurl).then(res => res.text()).then((res_txt) => {

            const sc_pj_serials_i = res_txt.indexOf("/Assets/pj_serials.js") + 21;
            const sc_pj_films_i = res_txt.indexOf("/Assets/pj_films.js") + 19;
            let scd_curr_i = sc_pj_serials_i;
            let scd_curr = 0;
            let done = false;
            const pj_serials = {
                name: "pj_serials",
                url: "/Assets/pj_serials.js",
                version: ""
            };
            const pj_films = {
                name: "pj_films",
                url: "/Assets/pj_films.js",
                version: ""
            };
            while (done !== true) {
                scd_curr_i++;
                if (res_txt[scd_curr_i] === "\"") {
                    switch (scd_curr) {
                        case 0:
                            pj_serials.version = res_txt.substring(sc_pj_serials_i, scd_curr_i).replace("?v=", "");
                            scd_curr = 1;
                            scd_curr_i = sc_pj_films_i;
                            break;
                        case 1:
                            pj_films.version = res_txt.substring(sc_pj_films_i, scd_curr_i).replace("?v=", "");
                            done = true;
                            break;
                    }
                }
            }
            const rewrited = res_txt
                .replaceAll("src=\"/", `src="${host}/`)
                .replace("https://cdn.jsdelivr.net/npm/hls.js@0.14.17", STATICS.annacdn_cc.hlsjs_url)
                .replace("href=\"", `href="${host}`)
                .replace(`${host + pj_serials.url}?v=${pj_serials.version}`, `/annacdn/script?url=${pj_serials.url}&v=${pj_serials.version}&name=${pj_serials.name}`)
                .replace(`${host + pj_films.url}?v=${pj_films.version}`, `/annacdn/script?url=${pj_films.url}&v=${pj_films.version}&name=${pj_films.name}`);
            return { status: "ok", data: rewrited };
        }).catch(error => {
            return { status: "err", error };
        });
    }

    async rewrite_vcdnicdnws(embeedurl, host) {

        return fetch(embeedurl).then(res => res.text()).then(res_txt => {

            const sc_pj_serials_i = res_txt.indexOf("/storage/default_players/pj_serials.js") + 38;
            const sc_pj_films_i = res_txt.indexOf("/storage/default_players/pj_films.js") + 36;
            let scd_curr_i = sc_pj_serials_i;
            let scd_curr = 0;
            let done = false;
            const pj_serials = {
                name: "pj_serials",
                url: "/storage/default_players/pj_serials.js",
                version: ""
            };
            const pj_films = {
                name: "pj_films",
                url: "/storage/default_players/pj_films.js",
                version: ""
            };
            while (done !== true) {
                scd_curr_i++;
                if (res_txt[scd_curr_i] === "\"") {
                    switch (scd_curr) {
                        case 0:
                            pj_serials.version = res_txt.substring(sc_pj_serials_i, scd_curr_i).replace("?v=", "");
                            scd_curr = 1;
                            scd_curr_i = sc_pj_films_i;
                            break;
                        case 1:
                            pj_films.version = res_txt.substring(sc_pj_films_i, scd_curr_i).replace("?v=", "");
                            done = true;
                            break;
                    }
                }
            }
            const rewrited = res_txt
                .replaceAll("src=\"", `src="${host}`)
                .replace(`${host + pj_serials.url}?v=${pj_serials.version}`, `/vcdn/script?url=${pj_serials.url}&v=${pj_serials.version}&name=${pj_serials.name}`)
                .replace(`${host + pj_films.url}?v=${pj_films.version}`, `/vcdn/script?url=${pj_films.url}&v=${pj_films.version}&name=${pj_films.name}`)
                .replace("href=\"", `href="${host}`);
            return { status: "ok", data: rewrited };
        }).catch(error => {
            return { status: "err", error };
        });
    }


    async rewrite_spinningallohalivecom(embeedurl) {
        const deconstructed = new URL(embeedurl);
        return fetch("/rewrite/allohalive" + deconstructed.pathname + deconstructed.search, {
            method: "POST",
            body: embeedurl
        }).then(res => {
            if (res.status !== 200) throw new Error("Network error");
            return res.text();
        }).then((res_txt) => {
            const rewrited = res_txt.replaceAll("/js/", "/static/pjs/js/alloha/")
                .replace("/style/style.css", "/static/style/alloha/style.css");
            return { status: "ok", data: rewrited };
        }).catch(error => {
            return { status: "err", error };
        });
    }


    async rewrite_ashdivip(embeedurl) {
        return fetch(embeedurl, {
            method: "GET",
        }).then(res => {
            return res.text();
        }).then((res_txt) => {
            return { status: "ok", data: res_txt };
        }).catch(error => {
            return { status: "err", error };
        });
    }

    async rewrite_api_wprefix_ws(embeedurl) {

        return fetch(embeedurl).then(res => {
            return res.text();
        }).then(res_txt => {

            const primary_frg = res_txt.substring(res_txt.indexOf("\"color-primary\":") + 17, res_txt.indexOf("\"background-color-primary\""));
            const primary = primary_frg.replace("\",", "");
            const rewrited = res_txt
                .replace("body {", "html {height: 100%;overflow: hidden;}\nbody {\n height:100%;")
                .replaceAll(`"color-primary":"${primary}"`, "\"color-primary\":\"#f0a832\"");
            console.log(rewrited)
            return { status: "ok", data: rewrited };
        }).catch(error => {
            return { status: "err", error };
        });
    }

    async multidomain_check(hostname, origin) {
        for(var i=0;i < dynamic_hostnames.length;i++) { 
            var coincids = 0
            for(var a=0;a < dynamic_hostnames[i].overlaps.length;a++) {
                if(hostname.includes(dynamic_hostnames[i].overlaps[a])) coincids++
            }
            if(coincids===dynamic_hostnames[i].overlaps.length) {
                var data = null
                switch(dynamic_hostnames[i].domain_wprefix) {
                    case "vid167wprefix":
                        data = await this.rewrite_vid167(hostname, origin)
                        return {
                            status: 1,
                            data
                        }
                    case "api_wprefix_ws": 
                        data = await this.rewrite_api_wprefix_ws(hostname)
                        return { 
                            status: 1,
                            data
                        }
                }
            } else { 
                return {
                    status: 0, 
                    data: null
                }
            }
        }
    }

    async rewritebhostname(hostname) {
        const url_deconstructed = new URL(hostname)

        console.log(hostname)

        const multidomain = await this.multidomain_check(hostname, url_deconstructed.origin)
        if(multidomain.status) return {
            status: "ok", 
            data: multidomain.data
        }
        
        /*switch (url_deconstructed.host) {
            case STATICS.api_hostemb_ws.domain:
                return this.rewriteApiHostembWs(deartefacted)
            case STATICS.voidboost_net.domain:
                return this.rewriteVoidboost(deartefacted)
            case STATICS.api_loadbox_ws.domain:
                return this.rewriteApiLoadboxWs(deartefacted)
            case STATICS.spinning_allihalive_com.domain:
                return this.rewriteSpinningAllohaliveCom(deartefacted)
            case STATICS.ashdivip.domain:
                return this.rewriteAshdiVip(deartefacted)
            case STATICS.www2embeed.domain:
                return this.rewrite2Embeed(deartefacted)
            case STATICS.vcdn_icdn_ws.domain:
                return this.rewriteVcdnIcdnWs(deartefacted, url_deconstructed.origin)
            case STATICS.annacdn_cc.domain:
                return this.rewriteAnnacdnCc(deartefacted, url_deconstructed.origin)
            case STATICS.api_getcodes_ws.domain:
                return this.rewriteApiGetcodesWs(deartefacted)
            default:
                return { status: "err", data: deartefacted }
        }*/

        throw ApiError.BadRequest()
    }
} 

module.exports = new SRAService()