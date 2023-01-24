export default class FCRService {
    static deartefactUrl(url: string) {
        if(url.includes("&#58;")) {
            return url.replace("&#58;", ":")
        } else {
            return url
        }
    }

    static async checkForVid167(url: string, host: string) {
        if(url.includes(STATICS.vid167.domain)) {
            const rewrited = await STATICS.vid167.cb(url, host)
            return {ready: true, data: rewrited}
        } else return {ready: false, data: undefined}
    }

    static async checkForApiTobacoWs(url: string) {
        if(url.includes(STATICS.api_tobaco_ws.domain)) {
            const rewrited = await STATICS.api_tobaco_ws.cb(url)
            return {ready: true, data: rewrited}
        } else return {ready: false, data: undefined}
    }

    static async rewriteByHostname(frameurl: string) {
        const deartefacted = this.deartefactUrl(frameurl)
        const url_deconstructed = new URL(deartefacted)
        const isVid167 = await this.checkForVid167(deartefacted, url_deconstructed.origin) as any
        const isTobacoWs = await this.checkForApiTobacoWs(deartefacted) as any
        if(isVid167.ready) return isVid167.data
        if(isTobacoWs.ready) return isTobacoWs.data
        switch(url_deconstructed.host) { 
            // voidboost.net
            case STATICS.voidboost_net.domain:
                return STATICS.voidboost_net.cb(deartefacted, url_deconstructed.hostname)
            // api.loadbox.ws
            case STATICS.api_loadbox_ws.domain: 
                return STATICS.api_loadbox_ws.cb(deartefacted)
            // spinning.allohalive.com
            case STATICS.spinning_allihalive_com.domain: 
                return STATICS.spinning_allihalive_com.cb(deartefacted)
        }
        
    }

    static async rewriteVoidboost(embeedurl: string, url_domain: string) {
        let rewrited = ""
        try {
            await fetch(embeedurl, 
                {
                    method: "GET", 
                    headers: {
                        'Content-Type': 'text/html'
                    }
                }
            ).then(function(response) {
                return response.text();
            }).then(async function(data) {
                //Remove prerolls(ads)
                //Rewrite paths to public scripts and other utils
                rewrited = await data.replace("'preroll':",  "'__undefined__':")
                                    .replace('/thumbnails/', 'https://voidboost.net/thumbnails/')
                                    .replace("'?s='", `'${embeedurl}?s='`)
                                    .replace(`_url_params = ''`, `_url_params = ''; parent.postMessage('https://voidboost.net/embed/${embeedurl}?s='+ _season +'&e='+ _episode +'&h='+ cdn.player.getVBR() + _url_params, "*");`)
                                    .replace(`window.location.href = '/'+ type +'/'+ t +'/iframe?h='+ cdn.player.getVBR() + a;`, `parent.postMessage(window.location.href = 'https://voidboost.net/'+ type +'/'+ t +'/iframe?h='+ cdn.player.getVBR() + a)`)
            });
            return rewrited
        } catch(e) {
            console.log(e)
        }
    }

    static async rewriteVid167(embeedurl: string, url: string) {
        let rewrited = ""
        await fetch(embeedurl, {
        }).then(function (response) {
            return response.text();
        }).then(async function (data) {
            //Changed for testing
            console.log(url)
            rewrited = data.replace("/playerjs/js/playerjs.js?=1012", `${STATICS.vid167.playerjs_url}?curl=${url}`)
                    //Create link to playerjs script
                    .replace("/player", `${url}/player`)
                    //Remove prerolls(ads)
                    .replace("preroll", "__undefined__")
                    //Remove pause banner
                    .replace("pausebanner", "__undefined__")
                    .replace("banner_show", "__undefined__")
        })
        return rewrited
    }

    static async rewriteApiLoadboxWs(embeedurl: string) {
        let rewrited = ""
        await fetch(embeedurl, {
            method: "GET"
        }).then(function (response) {
            return response.text();
        }).then(async function (data) {
            //Changed for testing
            rewrited = data
            console.log(data)
        })
        
        return rewrited
    }

    static async rewriteSpinningAllohaliveCom(embeedurl: string) {
        let rewrited = ""
        const deconstructed = new URL(embeedurl)
        await fetch("/rewrite/allohalive" + deconstructed.pathname + deconstructed.search, {
            method: "POST",
            body: embeedurl
        }).then(res => {
            return res.text()
        }).then(res_txt => {
            rewrited = res_txt.replace("/js/jquery.min.js", STATICS.spinning_allihalive_com.jquery_min_url)
                            .replace("/js/baron.js", `${STATICS.spinning_allihalive_com.url}/js/baron.js`)
                            .replace("/js/default-dist.js", STATICS.spinning_allihalive_com.default_dist_url)
                            .replace("/js/playerjs-alloha-new.js", STATICS.spinning_allihalive_com.playerjs_url)
                            .replace("/style/style.css", `${STATICS.spinning_allihalive_com.url}/style/style.css`)
                            .replace("/js/iife.min.js", `${STATICS.spinning_allihalive_com.url}/js/iife.min.js`)
                            .replace("var fpPromise = FingerprintJS.load();", "var fpPromise = FingerprintJS.load(); console.log('TUST');")
                            .replace(`<!-- <script src="https://allvideometrika.com/alloha.php" async></script> -->`, "")
        })
        return rewrited
    }

    static async rewriteApiTobacoWs(embeedurl: string) {
        let rewrited = ""
        await fetch(embeedurl, {
            method: "GET"
        }).then(res => {
            return res.text()
        }).then(res_txt => {
            rewrited = res_txt
            console.log(rewrited)
        })
        return rewrited
    }
}

export const STATICS = {
    voidboost_net: {
        domain: 'voidboost.net',
        url: 'https://voidboost.net',
        url_slashed: 'https://voidboost.net/',
        cb: FCRService.rewriteVoidboost 
    }, 
    api_tobaco_ws: {
        domain: 'tobaco.ws',
        cb: FCRService.rewriteApiTobacoWs
    },
    api_loadbox_ws: {
        domain: 'api.loadbox.ws',
        url: 'https://api.loadbox.ws',
        url_slashed: 'https://api.loadbox.ws/',
        cb: FCRService.rewriteApiLoadboxWs
    },
    spinning_allihalive_com: {
        domain: 'spinning.allohalive.com',
        url: 'https://spinning.allohalive.com',
        url_slashed: 'https://spinning.allohalive.com/',
        playerjs_url: '/static/pjs/js/alloha/playerjs-alloha-new.js',
        default_dist_url: "/static/pjs/js/alloha/default-dist.js",
        jquery_min_url: "/static/pjs/js/alloha/jquery.min.js",
        cb: FCRService.rewriteSpinningAllohaliveCom
    },
    vid167: {
        domain: 'vid167',
        url: 'https://vid1672084730.vb17121coramclean.pw',
        url_slashed: "https://vid1672084730.vb17121coramclean.pw/",
        playerjs_url: '/vid167/playerjs',
        cb: FCRService.rewriteVid167
    },
}