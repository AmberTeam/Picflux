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

    static async rewriteByHostname(frameurl: string) {
        const deartefacted = this.deartefactUrl(frameurl)
        const url_deconstructed = new URL(deartefacted)
        const isVid167 = await this.checkForVid167(deartefacted, url_deconstructed.origin) as any
        if(isVid167.ready) return isVid167.data
        switch(url_deconstructed.host) { 
            // voidboost.net
            case STATICS.voidboost_net.domain:
                return STATICS.voidboost_net.cb(deartefacted)
            // api.loadbox.ws
            case STATICS.api_loadbox_ws.domain: 
                return STATICS.api_loadbox_ws.cb(deartefacted)
            // spinning.allohalive.com
            case STATICS.spinning_allihalive_com.domain: 
                return STATICS.spinning_allihalive_com.cb(deartefacted)
        }
        
    }

    static async rewriteVoidboost(embeedurl: string) {
        let rewrited = ""
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
                                .replace(`_url_params = ''`, `_url_params = ''; parent.postMessage('https://voidboost.net/embed/517338?s='+ _season +'&e='+ _episode +'&h='+ cdn.player.getVBR() + _url_params, "*");`)
                                //'https://voidboost.net/embed/517338?s='+ _season +'&amp;e='+ _episode +'&amp;h='+ cdn.player.getVBR() + _url_params
        });
        return rewrited
    }

    static async rewriteVid167(embeedurl: string, url: string) {
        let rewrited = ""
        await fetch(embeedurl, {
        }).then(function (response) {
            return response.text();
        }).then(async function (data) {
            //Changed for testing
            rewrited = data.replace("/playerjs/js/playerjs.js?=1012", STATICS.vid167.playerjs_url)
                    //Create link to playerjs script
                    .replace("/player", `${url}/player`)
                    //Remove prerolls(ads)
                    .replace("preroll", "__undefined__")
                    //Remove pause banner
                    .replace('"show": true', '"show": false')

            console.log(rewrited)
        })
        return rewrited
    }

    static async rewriteApiLoadboxWs(embeedurl: string) {
        console.log(STATICS.api_loadbox_ws)
    }

    static async rewriteSpinningAllohaliveCom(embeedurl: string) {
        let rewrited = ""
        await fetch(embeedurl, {
            method: "GET",
            headers: {
                'Content-Type': 'text/html; charset=UTF-8',
                'Content-Encoding': 'gzip'
            }
        }).then((response) => {
            return response.text()
        }).then(async (data) => {
            console.log(data)
        })
    }
}

export const STATICS = {
    voidboost_net: {
        domain: 'voidboost.net',
        url: 'https://voidboost.net',
        url_slashed: 'https://voidboost.net/',
        cb: FCRService.rewriteVoidboost 
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
        playerjs_url: '/pjs/vid',
        cb: FCRService.rewriteSpinningAllohaliveCom
    },
    vid167: {
        domain: 'vid167',
        url: 'https://vid1672084730.vb17121coramclean.pw',
        url_slashed: "https://vid1672084730.vb17121coramclean.pw/",
        playerjs_url: '/static/pjs/js/vid167/playerjs.js',
        cb: FCRService.rewriteVid167
    },
}