const Router = require("express")
const proxy = require('express-http-proxy')
const fs = require('fs')
const router = new Router()

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
    fs.readFile(`${__dirname}/static/pjs/js/vid167/playerjs.js`, (err, data) => {
        res.contentType('text/javascript')
        const data_str = String(data)
        return res.send(data_str.replace("__hostreplace__", req.query.curl))
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
    return res.send("217.255.106.98")
})

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
