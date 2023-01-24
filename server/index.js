require("dotenv").config({path: `.${process.env.NODE_ENV}.env`})
const express = require("express")
const routes = require("./routes")
const path = require("path")
const cors = require("cors")
const cookieParser = require("cookie-parser") 
const mongoose = require("mongoose") 
const errorMiddleware = require('./middlewares/error.middleware')
const fileupload = require("express-fileupload")
const proxy = require('express-http-proxy')
const fs = require("fs")  
const app = express()    

app.get('/:hs/:s/:r/:v/:g/:z/:q/master.m3u8', proxy((req, res) => {
  if(req.query.nrw.includes('localhost')) return "https://78b-621-330g0.streamalloha.live"
  return req.query.nrw
}))
app.get('/:hs/:s/:r/:v/:g/:z/master.m3u8', proxy((req, res) => {
  if(req.query.nrw.includes('localhost')) return "https://78b-621-330g0.streamalloha.live"
  return req.query.nrw
}))
//HLS media transporting 
app.get("/:hs/:s/:d/:w/:a/:p/:s/:ts", proxy((req, res) => {
  if(req.query.nrw.includes('localhost')) return "https://78b-621-330g0.streamalloha.live"
  return req.query.nrw
}))
app.get("/:hs/:s/:d/:w/:a/:p/:ts", proxy((req, res) => {
  if(req.query.nrw.includes('localhost')) return "https://78b-621-330g0.streamalloha.live"
  return req.query.nrw
}))
app.get("/subs/:q/:w/:e/:r/:t/index.php", proxy((req, res) => {
  if(req.query.nrw.includes('localhost')) return "https://78b-621-330g0.streamalloha.live"
  return req.query.nrw
}))

app.get("/vid167/playerjs", async (req, res) => {
  fs.readFile(`${__dirname}/static/pjs/js/vid167/playerjs.js`, (err, data) => {
    if(err) console.log(err)
    res.contentType('text/javascript')
    const data_str = String(data)
    return res.send(data_str.replace("__hostreplace__", req.query.curl))
  })
})

app.post("/allohalive-tokenacc", proxy((req, res) => {
  return "https://spinning.allohalive.com"
}, {
  proxyReqPathResolver: function (req) {
    return req.url.replace("allohalive-tokenacc", "")
  },
}))

app.get('/js/ch.js', (req, res) => {
  return res.status(404).json() 
})

app.get('/4Em7.txt', proxy((req, res) => {
  return "https://z9mx.streamalloha.live"
}))

app.post("/rewrite/allohalive", proxy((req, res) => { 
  return 'https://spinning.allohalive.com'
}, {
  proxyReqPathResolver: function (req) {
    return req.url.replace("/rewrite/allohalive", "")
  },
  userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
    const data = proxyResData.toString()
    return data.replace("89.40.183.122", userReq.socket.remoteAddress)
  }
}))

app.use('/static', express.static(path.join(__dirname, '/static')))
app.use(fileupload()) 
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,  
  origin: process.env.CLIENT   
}))
app.use('/api', routes)  
app.use(errorMiddleware)
  
if (process.env.NODE_ENV === 'prod') {
  app.use('/', express.static(path.join(__dirname, "..", 'client', 'build')))
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", 'client', 'build', 'index.html'))
  })
}

async function bootstrap() { 
    try { 
        await mongoose.connect(process.env.DB, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
  
        app.listen(process.env.PORT, () => console.log(`\n[server] Listening on ${process.env.PORT} \n`))
        //Init WebSocketServer
        require("./websocket/index")
        console.log(`[WSS] Listening on ${process.env.WSS_PORT}`) 

    } catch(e) {
        console.log(e)
    }
}

bootstrap()    