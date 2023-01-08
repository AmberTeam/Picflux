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
const app = express()  

//https://d0b-000-2600g0.streamalloha.live/hs/49/1673209625/g0oQlfBQ7Gj7scJMNAq6GA/366/697366/4/master.m3u8

app.get('/hs/:s/:r/:v/:g/:z/:q/master.m3u8', proxy('https://d0b-000-2600g0.streamalloha.live'))
http://  /hs/49/1673231815/M7--moJ6xIcMivYHtk0TdA/366/697366/4/index-f4-v1-sa4-a1.m3u8
app.get("/hs/:s/:r/:d/:q/:sw/:sd/index-f4-v1-sa4-a1.m3u8", proxy('https://d0b-000-2600g0.streamalloha.live'))
//http://localhost/hs/49/1673237826/ga3N76ZsbFbPtQzIpaAEFQ/366/697366/4/seg-3-f4-v1-sa4-a1.ts
app.get("/hs/:s/:d/:w/:a/:p/:s/:ts", proxy('https://d0b-000-2600g0.streamalloha.live'))
app.get('/js/ch.js', (req, res) => {
  return res.status(404).json()
})

app.post("/rewrite/allohalive", proxy('https://spinning.allohalive.com', {
  proxyReqPathResolver: function (req) {
    return req.url.replace("/rewrite/allohalive", "")
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