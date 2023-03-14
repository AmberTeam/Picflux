import { AxiosResponse } from "axios"
import $api from "../http"

export interface IRWFC {
    status: string
    data?: string
    e?: any
}

export interface IMULTIDOMAINCH {
    ready: boolean 
    data: IRWFC
}

export default class FCRService {

    static deartefactUrl(url: string): string {
        if(url.includes("vcdn.icdn.ws")) return url.replace("https/", "https:/")
        if(url.includes("&#58;")) {
            return url.replace("&#58;", ":")
        } else {
            return url
        }
    }

    static async checkForVid167(url: string, host: string, lChainCb: (arg: number) => void): Promise<IMULTIDOMAINCH> {
        if(url.includes(STATICS.vid167.domain)) {
            const rewrited:IRWFC = await this.rewriteVid167(url, host, lChainCb)
            return {ready: true, data: rewrited}
        } else return {ready: false, data: {} as IRWFC}
    }

    static async checkForApiTobacoWs(url: string, lChainCb: (arg: number) => void): Promise<IMULTIDOMAINCH> {
        if(url.includes(STATICS.api_tobaco_ws.domain)) {
            const rewrited = await this.rewriteApiTobacoWs(url, lChainCb)
            return {ready: true, data: rewrited}
        } else return {ready: false, data: {} as IRWFC}
    }

    static async checkForApiSychroncode(url: string, lChainCb: (arg: number) => void): Promise<IMULTIDOMAINCH> {
        if(url.includes(STATICS.api_sychroncode_com.domain)) {
            const rewrited = await this.rewriteApiSynchroncode(url, lChainCb)
            return {ready: true, data: rewrited}
        } else return {ready: false, data: {} as IRWFC}
    }

    static async rewriteByHostname(frameurl: string, lChainCb: (arg: number) => void): Promise<IRWFC> {
        try {
            const deartefacted: string = this.deartefactUrl(frameurl)
            console.log(deartefacted)
            const url_deconstructed: URL = new URL(deartefacted)
            const isVid167: IMULTIDOMAINCH = await this.checkForVid167(deartefacted, url_deconstructed.origin, lChainCb)
            const isTobacoWs: IMULTIDOMAINCH = await this.checkForApiTobacoWs(deartefacted, lChainCb)
            const isApiSyncroncode: IMULTIDOMAINCH = await this.checkForApiSychroncode(deartefacted, lChainCb)
            if(isVid167.ready) return isVid167.data
            if(isTobacoWs.ready) return isTobacoWs.data
            if(isApiSyncroncode.ready) return isApiSyncroncode.data
            switch(url_deconstructed.host) { 
                case STATICS.api_hostemb_ws.domain: 
                    return this.rewriteApiHostembWs(deartefacted, lChainCb)
                case STATICS.voidboost_net.domain:
                    return this.rewriteVoidboost(deartefacted, lChainCb)
                case STATICS.api_loadbox_ws.domain: 
                    return this.rewriteApiLoadboxWs(deartefacted, lChainCb)
                case STATICS.spinning_allihalive_com.domain: 
                    return this.rewriteSpinningAllohaliveCom(deartefacted, lChainCb)
                case STATICS.ashdivip.domain: 
                    return this.rewriteAshdiVip(deartefacted, lChainCb)
                case STATICS.www2embeed.domain:
                    return this.rewrite2Embeed(deartefacted, lChainCb)
                case STATICS.vcdn_icdn_ws.domain: 
                    return this.rewriteVcdnIcdnWs(deartefacted, url_deconstructed.origin, lChainCb)
                case STATICS.annacdn_cc.domain: 
                    return this.rewriteAnnacdnCc(deartefacted, url_deconstructed.origin, lChainCb)
                case STATICS.api_getcodes_ws.domain: 
                    return this.rewriteApiGetcodesWs(deartefacted, lChainCb)
                default: 
                    console.log("defaulted")
                    return {status: "err", data: deartefacted}
            }
        } catch(e) {
            console.error(e)
            return {status: "err", data: "null"}
        }
        
    }

    static async rewriteApiHostembWs(embeedurl:string, lChainCb: (arg:number) => void): Promise<IRWFC> {
        let rewrited: string = ""
        try {
            lChainCb(1)
            await fetch(embeedurl).then(res => {
                return res.text()
            }).then(res_txt => {
                lChainCb(2)
                const primary_frg = res_txt.substring(res_txt.indexOf('"color-primary":') + 17, res_txt.indexOf('"background-color-primary"'))
                const primary = primary_frg.replace('",', "")
                rewrited = res_txt
                                .replace("body {", "html {height: 100%;overflow: hidden;}\nbody {\n height:100%;")
                                .replaceAll(`"color-primary":"${primary}"`, `"color-primary":"#f0a832"`)
            })
            return {status: "ok", data: rewrited}
        } catch(e) {
            return {status: "err", e}
        }
    }

    static async rewrite2Embeed(embeedurl: string, lChainCb: (arg: number) => void): Promise<IRWFC> {
        let rewrited: string = ""
        try {
            await fetch("/rewrite/2embeed?path=" + embeedurl, 
            ).then(res =>  {
                return res.text();
            }).then(async (res_txt: string) => {
                rewrited = res_txt.replace("/css/embed.min.css", "https://www.2embed.to/css/embed.min.css")
            })
            const datas: AxiosResponse = await $api.post("/dev/rewrite/2embeed", {rewrited})
            return {status: "ok", data: datas.data}
        } catch(e: any) {
            return {status: "err", e}
        }
    }

    static async rewriteVoidboost(embeedurl: string, lChainCb: (arg: number) => void): Promise<IRWFC> {
        let rewrited: string = ""
        try {
            lChainCb(1)
            await fetch(embeedurl, 
                {
                    method: "GET", 
                    headers: {
                        'Content-Type': 'text/html'
                    }
                }
            ).then(res => {
                return res.text();
            }).then(async (res_txt: string) => {
                lChainCb(2)
                rewrited = await res_txt.replace("'preroll':",  "'__undefined__':")
                                    .replaceAll("#00adef", "#f0a832")
                                    .replace(`${res_txt.substring(res_txt.indexOf("https://unpkg.com"), res_txt.indexOf("index.js") + 8)}`, `/voidboost/playerjs?url=${res_txt.substring(res_txt.indexOf("https://unpkg.com"), res_txt.indexOf("index.js") + 8)}`)
                                    .replace('/thumbnails/', 'https://voidboost.net/thumbnails/')
                                    .replace("'?s='", `'${embeedurl}?s='`)
                                    .replace(`_url_params = ''`, `_url_params = ''; parent.postMessage('https://voidboost.net/embed/${embeedurl}?s='+ _season +'&e='+ _episode +'&h='+ cdn.player.getVBR() + _url_params, "*");`)
                                    .replace(`window.location.href = '/'+ type +'/'+ t +'/iframe?h='+ cdn.player.getVBR() + a;`, `parent.postMessage(window.location.href = 'https://voidboost.net/'+ type +'/'+ t +'/iframe?h='+ cdn.player.getVBR() + a)`)
            })
            return {status: "ok", data: rewrited}
        } catch(e: any) {
            return {status: "err", e}
        }
    }

    static async rewriteApiSynchroncode(embeedurl: string, lChainCb: (arg: number) => void): Promise<IRWFC> {
        let rewrited: string = ""
        try {
            lChainCb(1)
            await fetch(embeedurl).then(res => {
                return res.text()
            }).then(res_txt => {
                lChainCb(2)
                const primary_frg = res_txt.substring(res_txt.indexOf('"color-primary":') + 17, res_txt.indexOf('"background-color-primary"'))
                const primary = primary_frg.replace('",', "")
                rewrited = res_txt
                                .replace("body {", "html {height: 100%;overflow: hidden;}\nbody {\n height:100%;")
                                .replaceAll(`"color-primary":"${primary}"`, `"color-primary":"#f0a832"`)
            })
            return {status: "ok", data: rewrited}
        } catch(e) {
            return {status: "err", e}
        }
    }

    static async rewriteVid167(embeedurl: string, url: string, lChainCb: (arg: number) => void): Promise<IRWFC> {
        let rewrited: string = ""
        try {
            lChainCb(1)
            await fetch(embeedurl, {
            }).then(res => {
                return res.text()
            }).then(async (res_txt: string) => {
                lChainCb(2)
                rewrited = res_txt.replace("/playerjs/js/playerjs.js?=1012", `${STATICS.vid167.playerjs_url}?curl=${url}`)
                        .replace("/player", `${url}/player`)
                        .replace("preroll", "__undefined__")
                        .replace("pausebanner", "__undefined__")
                        .replace("banner_show", "__undefined__")
            })
            return {status: "ok", data: rewrited}
        } catch(e: any) {
            return {status: "err", e}
        }
    }

    static async rewriteAnnacdnCc(embeedurl: string, host: string, lChainCb: (arg: number) => void): Promise<IRWFC> {
        let rewrited:string = ""
        try {
            lChainCb(1)
            await fetch(embeedurl).then(res => res.text()).then((res_txt:string) => {
                lChainCb(2)
                const sc_pj_serials_i:number = res_txt.indexOf('/Assets/pj_serials.js') + 21
                const sc_pj_films_i:number =   res_txt.indexOf('/Assets/pj_films.js') + 19
                var scd_curr_i:number = sc_pj_serials_i
                var scd_curr:number = 0
                var done:boolean = false
                interface annacdn_script {
                    name:string,
                    url:string,
                    version:string
                }
                const pj_serials:annacdn_script = {
                    name: 'pj_serials',
                    url: '/Assets/pj_serials.js',
                    version: ''
                }
                const pj_films:annacdn_script = {
                    name: 'pj_films',
                    url: '/Assets/pj_films.js',
                    version: ''
                }
                while(done !== true) {
                    scd_curr_i++
                    if(res_txt[scd_curr_i] == '"') {
                        switch(scd_curr) {
                            case 0: 
                                pj_serials.version = res_txt.substring(sc_pj_serials_i, scd_curr_i).replace("?v=", '')
                                scd_curr = 1
                                scd_curr_i = sc_pj_films_i
                                break
                            case 1: 
                                pj_films.version = res_txt.substring(sc_pj_films_i, scd_curr_i).replace("?v=", '')
                                done = true
                                break
                        }
                    } 
                }
                rewrited = res_txt
                            .replaceAll('src="/', `src="${host}/`)
                            .replace(`https://cdn.jsdelivr.net/npm/hls.js@0.14.17`, STATICS.annacdn_cc.hlsjs_url)
                            .replace('href="', `href="${host}`)
                            //.replace(`${host}/Assets/pj_films.js?v=1111`, `/annacdn/playerjs?v=${res_txt.substring(pjs_i, pjs_v_endindex)}`)
                            .replace(`${host + pj_serials.url}?v=${pj_serials.version}`, `/annacdn/script?url=${pj_serials.url}&v=${pj_serials.version}&name=${pj_serials.name}`)
                            .replace(`${host + pj_films.url}?v=${pj_films.version}`, `/annacdn/script?url=${pj_films.url}&v=${pj_films.version}&name=${pj_films.name}`)
                            
                            /*
                            .replace(`${host}/Assets/pj_films.js`, STATICS.annacdn_cc.pj_films_url + "?v_v=" + res_txt.substring(res_txt.indexOf("fb.js?v=") + 8, res_txt.indexOf("fb.js?v=") + 20))
                            */
            })
            return {status: "ok", data: rewrited}
        } catch(e) {
            console.error(e)
            return {status: "err", e}
        }
    }

    static async rewriteVcdnIcdnWs(embeedurl: string, host:string, lChainCb: (arg: number) => void): Promise<IRWFC> {
        let rewrited:string = ""
        try {
            lChainCb(1)
            await fetch(embeedurl).then(res => res.text()).then(res_txt => {
                lChainCb(2)
                const sc_pj_serials_i:number = res_txt.indexOf('/storage/default_players/pj_serials.js') + 38
                const sc_pj_films_i:number =   res_txt.indexOf('/storage/default_players/pj_films.js') + 36
                var scd_curr_i:number = sc_pj_serials_i
                var scd_curr:number = 0
                var done:boolean = false
                interface ivcdn_script {
                    name:string,
                    url:string,
                    version:string
                }
                const pj_serials:ivcdn_script = {
                    name: 'pj_serials',
                    url: '/storage/default_players/pj_serials.js',
                    version: ''
                }
                const pj_films:ivcdn_script = {
                    name: 'pj_films',
                    url: '/storage/default_players/pj_films.js',
                    version: ''
                }
                while(done !== true) {
                    scd_curr_i++
                    if(res_txt[scd_curr_i] == '"') {
                        switch(scd_curr) {
                            case 0: 
                                pj_serials.version = res_txt.substring(sc_pj_serials_i, scd_curr_i).replace("?v=", '')
                                scd_curr = 1
                                scd_curr_i = sc_pj_films_i
                                break
                            case 1: 
                                pj_films.version = res_txt.substring(sc_pj_films_i, scd_curr_i).replace("?v=", '')
                                done = true
                                break
                        }
                    } 
                }
                rewrited = res_txt
                                .replaceAll('src="', `src="${host}`)
                                .replace(`${host + pj_serials.url}?v=${pj_serials.version}`, `/vcdn/script?url=${pj_serials.url}&v=${pj_serials.version}&name=${pj_serials.name}`)
                                .replace(`${host + pj_films.url}?v=${pj_films.version}`, `/vcdn/script?url=${pj_films.url}&v=${pj_films.version}&name=${pj_films.name}`)
                                .replace('href="', `href="${host}`)
            })
            return {status: "ok", data: rewrited}
        } catch(e) {
            return {status: "err", e}
        }
    }

    static async rewriteApiLoadboxWs(embeedurl: string, lChainCb: (arg: number) => void): Promise<IRWFC> {
        let rewrited: string = ""
        try {
            lChainCb(1)
            await fetch(embeedurl).then(res => {
                return res.text()
            }).then(res_txt => {
                lChainCb(2)
                const primary_frg = res_txt.substring(res_txt.indexOf('"color-primary":') + 17, res_txt.indexOf('"background-color-primary"'))
                const primary = primary_frg.replace('",', "")
                rewrited = res_txt
                                .replace("body {", "html {height: 100%;overflow: hidden;}\nbody {\n height:100%;")
                                .replaceAll(`"color-primary":"${primary}"`, `"color-primary":"#f0a832"`)
            })
            return {status: "ok", data: rewrited}
        } catch(e) {
            return {status: "err", e}
        }
    }
    

    static async rewriteSpinningAllohaliveCom(embeedurl: string, lChainCb: (arg: number) => void): Promise<IRWFC> {
        let rewrited: string = ""
        try {
            const deconstructed = new URL(embeedurl)
            await fetch("/rewrite/allohalive" + deconstructed.pathname + deconstructed.search, {
                method: "POST",
                body: embeedurl
            }).then(res => {
                if(res.status !== 200) throw new Error("Network error")
                return res.text()
            }).then((res_txt: string) => {
                //rewrited = res_txt.replace("/js/jquery.min.js", STATICS.spinning_allihalive_com.jquery_min_url)
                //.replace("/js/baron.js", `${STATICS.spinning_allihalive_com.url}/js/baron.js`)
                //.replace("/js/default-dist.js", STATICS.spinning_allihalive_com.default_dist_url)
                //.replace("/js/playerjs-alloha-new.js", STATICS.spinning_allihalive_com.playerjs_url)
                rewrited = res_txt.replaceAll("/js/", "/static/pjs/js/alloha/")
                                .replace("/style/style.css", `/static/style/alloha/style.css`)          
            })
            return {status: "ok", data: rewrited}
        } catch(e: any) {
            return {status: "err", e}
        }
    }

    static async rewriteApiGetcodesWs(embeedurl: string, lChainCb: (arg: number) => void): Promise<IRWFC> {

        let rewrited: string = ""
        try {
            await fetch(embeedurl).then(res => res.text()).then((res_txt:string) => {
                const primary_frg = res_txt.substring(res_txt.indexOf('"color-primary":') + 17, res_txt.indexOf('"background-color-primary"'))
                const primary = primary_frg.replace('",', "")
                rewrited = res_txt
                                .replace("body {", "html {height: 100%;overflow: hidden;}\nbody {\n height:100%;")
                                .replaceAll(`"color-primary":"${primary}"`, `"color-primary":"#f0a832"`)
            })
            return {status: "ok", data: rewrited}
        } catch(e) {
            return {status: "err", e}
        }
    }

    static async rewriteAshdiVip(embeedurl: string, lChainCb: (arg: number) => void): Promise<IRWFC> {
        let rewrited: string = ""
        try {
            await fetch(embeedurl, {
                method: "GET",
            }).then(res => {
                return res.text()
            }).then((res_txt: string) => {
                rewrited = res_txt
            })
            return {status: "ok", data: rewrited}
        } catch(e: any) {
            return {status: "err", e}
        }
    }

    static async rewriteApiTobacoWs(embeedurl: string, lChainCb: (arg: number) => void): Promise<IRWFC> {
        let rewrited: string = ""
        try {
            await fetch(embeedurl).then(res => res.text()).then((res_txt:string) => {
                const primary_frg = res_txt.substring(res_txt.indexOf('"color-primary":') + 17, res_txt.indexOf('"background-color-primary"'))
                const primary = primary_frg.replace('",', "")
                rewrited = res_txt
                                .replace("body {", "html {height: 100%;overflow: hidden;}\nbody {\n height:100%;")
                                .replaceAll(`"color-primary":"${primary}"`, `"color-primary":"#f0a832"`)
            })
            return {status: "ok", data: rewrited}
        } catch(e) {
            return {status: "err", e}
        }
    }
}

export const STATICS = {
    api_hostemb_ws: {
        domain: 'api.hostemb.ws',
        url: 'https://api.hostemb.ws'
    },
    voidboost_net: {
        domain: 'voidboost.net',
        url: 'https://voidboost.net',
    }, 
    api_tobaco_ws: {
        domain: 'tobaco.ws',
    },
    api_loadbox_ws: {
        domain: 'api.loadbox.ws',
        url: 'https://api.loadbox.ws',
    },
    api_sychroncode_com: {
        domain: 'synchroncode.com',
    },
    spinning_allihalive_com: {
        domain: 'spinning.allohalive.com',
        url: 'https://spinning.allohalive.com',
        playerjs_url: '/static/pjs/js/alloha/playerjs-alloha-new.js',
        default_dist_url: "/static/pjs/js/alloha/default-dist.js",
        jquery_min_url: "/static/pjs/js/alloha/jquery.min.js",
    },
    vid167: {
        domain: 'vid167',
        url: 'https://vid1672084730.vb17121coramclean.pw',
        playerjs_url: '/vid167/playerjs',
    },
    www2embeed: {
        domain: "www.2embed.to",
        url: "https://www.2embed.to",
        playerjs_url: "/static/pjs/js/embed/player.min.js",
    },
    ashdivip: {
        domain: 'ashdi.vip',
        url: 'https://ashdi.vip',
    },
    vcdn_icdn_ws: {
        domain: "vcdn.icdn.ws",
        url: 'https://vcdn.icdn.ws',
        pj_films_url: '/static/pjs/js/vcdn/pj_films.js'
    },
    annacdn_cc: {
        domain: "47.annacdn.cc",
        url: 'https://47.annacdn.cc',
        hlsjs_url: '/static/pjs/js/annacdn/hls.js@0.14.17',
        pj_films_url: '/annacdn/playerjs'
    },
    api_getcodes_ws: {
        domain: "api.getcodes.ws",
        url: "https://api.getcodes.ws",
    }
}