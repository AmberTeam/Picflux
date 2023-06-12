const Router = require("express")
const proxy = require('express-http-proxy')
const fs = require('fs')
const router = new Router()
const path = require("path")

router.get('/:hs/:s/:r/:v/:g/:z/:q/master.m3u8', proxy((req, res) => {
    if(req.query.nrw.includes(process.env.API_ORIGIN)) return "https://78b-621-330g0.streamalloha.live"
    return req.query.nrw 
    },
    {
        userResDecorator: function(proxyRes, proxyResData, userReq, userRes) { 
            proxyResData = proxyResData.toString().replaceAll(".m3u8", `.m3u8?nrw=${userReq.query.nrw}`)
            return proxyResData
        }
    })
) 

router.get('/hs/:s/:r/:v/:g/:z/:q/master.m3u8', proxy((req, res) => {
        if(req.query.nrw.includes(process.env.API_ORIGIN)) return "https://78b-621-330g0.streamalloha.live"
        return req.query.nrw 
    },
    {
        userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
            proxyResData = proxyResData.toString().replaceAll(".m3u8", `.m3u8?nrw=${userReq.query.nrw}`)
            return proxyResData
        }
    })
) 

router.get('/:hs/:s/:r/:v/:g/:z/master.m3u8', proxy((req, res) => {
        if(req.query.nrw.includes(process.env.API_ORIGIN)) return "https://78b-621-330g0.streamalloha.live"
        return req.query.nrw
    },
    {
        userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
            proxyResData = proxyResData.toString().replaceAll(".m3u8", `.m3u8?nrw=${userReq.query.nrw}`)
            return proxyResData 
        }
    })
) 

//HLS media transporting 
router.get("/:hs/:s/:d/:w/:a/:p/:s/:ts", proxy((req, res) => {
        if(req.query && req.query.nrw) {
            if(req.query.nrw.includes(process.env.API_ORIGIN)) return "https://78b-621-330g0.streamalloha.live"
            return req.query.nrw
        } else return "https://78b-621-330g0.streamalloha.live"
    },
    { 
        userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
            if(userReq.url.includes('.m3u8')) proxyResData = proxyResData.toString('utf-8').replaceAll(".ts", `.ts?nrw=${userReq.query.nrw}`)
            return proxyResData
        }
    })
) 

router.get("/:hs/:s/:d/:w/:a/:p/:ts", proxy((req, res) => {
        if(req.query && req.query.nrw) {
            if(req.query.nrw.includes(process.env.API_ORIGIN)) return "https://78b-621-330g0.streamalloha.live"
            return req.query.nrw
        } else return "https://78b-621-330g0.streamalloha.live"
    },
    { 
        userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
            if(userReq.url.includes('.m3u8')) proxyResData = proxyResData.toString('utf-8').replaceAll(".ts", `.ts?nrw=${userReq.query.nrw}`)
            return proxyResData
        }
    }) 
)

router.get("/subs/:q/:w/:e/:r/:t/index.php", proxy((req, res) => {
        if(req.query.nrw.includes(process.env.API_ORIGIN)) return "https://78b-621-330g0.streamalloha.live"
        return req.query.nrw
    })
)

router.get("/vid167/playerjs", async (req, res) => {
    fs.readFile(`${path.join(__dirname, "..")}/static/pjs/js/vid167/playerjs.js`, (err, data) => {
        res.contentType('text/javascript')
        const data_str = String(data).replaceAll("00abcd", "f0a832")
        return res.send(data_str.replace("__hostreplace__", req.query.curl.replace("pw2", "pw")))
    })
})

router.get("/vcdn/script", async (req, res) => {
    await fetch(`https://vcdn.icdn.ws${req.query.url}?v=${req.query.v}`).then(res => res.text()).then(res_txt => {
        res.contentType('text/javascript')
        var data_str = String(res_txt)
        
        switch(req.query.name) {
            case 'pj_serials':
                data_str = data_str
                            .replaceAll('00adef', 'f0a832')
                            .replaceAll('00ADEF', 'f0a832')
                            .replaceAll('2aa1c2', 'f0a832')
 
            case 'pj_films': 
                data_str = data_str
                            .replaceAll('00adef', 'f0a832')
                            .replaceAll('00ADEF', 'f0a832')
                            .replaceAll('2aa1c2', 'f0a832')
        }

        data_str = data_str
            .replace('&& Advertising("preroll")', '&& Advertising("__undefined__")')
            .replace('|| Advertising("intro")', '|| Advertising("__undefined__")')
            .replace('|| Advertising("pausebannerinit")', '|| Advertising("__undefined__")')
            .replace('|| Advertising("endtaginit")', '|| Advertising("__undefined__")')
            .replace('|| Advertising("starttaginit")', '|| Advertising("__undefined__")')

        return res.send(data_str)
    })
})

router.get("/annacdn/script", async (req, res) => {
    await fetch(`https://47.annacdn.cc${req.query.url}?v=${req.query.v}`).then(res => res.text()).then(res_txt => {
        res.contentType('text/javascript')
        var data_str = String(res_txt)
        
        switch(req.query.name) {
            case 'pj_serials':
                data_str = data_str
                            .replaceAll('00adef', 'f0a832')
                            .replaceAll('00ADEF', 'f0a832')
                            .replaceAll('2aa1c2', 'f0a832')

            case 'pj_films': 
                data_str = data_str
                            .replaceAll('00adef', 'f0a832')
                            .replaceAll('00ADEF', 'f0a832')
                            .replaceAll('2aa1c2', 'f0a832')
        }

        data_str = data_str
            .replace('&& Advertising("preroll")', '&& Advertising("__undefined__")')
            .replace('|| Advertising("intro")', '|| Advertising("__undefined__")')
            .replace('|| Advertising("pausebannerinit")', '|| Advertising("__undefined__")')
            .replace('|| Advertising("endtaginit")', '|| Advertising("__undefined__")')
            .replace('|| Advertising("starttaginit")', '|| Advertising("__undefined__")')

        return res.send(data_str)
    })
})

router.get("/voidboost/playerjs", async (req, res) => {
    var rewrited = ""
    await fetch(req.query.url).then(res => res.text()).then(res_txt => {
        res.contentType('text/javascript')
        res.send(res_txt.replace("return p", 'const pr = String(p); return pr'))
    })
})

router.post("/allohalive-tokenacc", proxy((req, res) => {
        return "https://spinning.allohalive.com"
    },
    {
        proxyReqPathResolver: function (req) {
            return req.url.replace("allohalive-tokenacc", "")
        },
    })
)

router.get('/4Em7.txt', (req, res) => {
    return res.send("217.255.102.176")
})

router.get("/rewrite/2embeed", proxy((req, res) => {
        return 'https://www.2embed.to/'  
    },
    {
        proxyReqPathResolver: function (req) {
            return req.query.path
        },
    }
))

router.get("/redirect/2embeed", proxy((req, res) => {
        return 'https://www.2embed.to/'  
    },
    {
        proxyReqPathResolver: function (req) {
            console.log(`https://www.2embeed.to${req.query.path}&_token=${req.query._token}`)
            return req.query.path
        },
    }
))

router.head("/embed/tmdb/movie?id=514510", proxy((req, res) => {
    return "https://www.2embed.to"
}))

router.post("/rewrite/allohalive", proxy((req, res) => { 
        return 'https://spinning.allohalive.com'
    },
    {
        proxyReqPathResolver: function (req) {
            return req.url.replace("/rewrite/allohalive", "")
        },
        userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
            const data = proxyResData.toString() 
            return data.replace("89.40.183.122", userReq.socket.remoteAddress)
        }
    })
) 

module.exports = router
