require("dotenv").config({path: `.${process.env.NODE_ENV}.env`})
const express = require("express")
const routes = require("./routes")
const path = require("path")
const cors = require("cors")
const cookieParser = require("cookie-parser") 
const mongoose = require("mongoose") 
const errorMiddleware = require('./middlewares/error.middleware')
const fileupload = require("express-fileupload")
const proxyRouter = require("./routes/proxy.router") 
const Debugger = require("./utils/debugger")
const app = express() 
const {initWebSocketCore} = require("./websocket/index")
var WebSocketServer = require("ws").Server,
    http = require("http"),
    server = http.createServer(app);

app.use(proxyRouter)
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

app.post("/api/dev/rewrite/2embeed", (req, res) => {
  const rw_str = String(req.body.rewrited)
  .replace("//waufooke.com/5/4697299", "https://whoursie.com/5/4697299")
  .replace("/js/app.min.js", "/static/pjs/js/embed/app.min.js")
  //.replace("/js/app.min.js", "https://www.2embed.to/js/app.min.js")
  .replace("/js/player.min.js", "/static/pjs/js/embed/player.min.js") 
  //.replace('<script data-cfasync="false" type="text/javascript">', '<script src="/static/pjs/js/embed/tstscr.js"></script><susufar data-cfasync="false" type="text/javascript" src="https://youtube.com">')
    
  return res.json(rw_str)
})

if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'psprod') {
  const dbg = new Debugger()
  app.use('/', express.static(path.join(__dirname, "..", 'client', 'build')))
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", 'client', 'build', 'index.html'))
  })
}

var wss = new WebSocketServer({server: server, path: '/wsedge'});

initWebSocketCore(wss)


async function bootstrap() { 
    try { 
        await mongoose.connect(process.env.DB, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
   
        server.listen(process.env.PORT, () => console.log(`\n[server] Listening on ${process.env.PORT} \n`))
        //Init WebSocketServer
        //WSC.initialize()
        //console.log(`[WSS] Listening on ${process.env.WSS_PORT}`) 

    } catch(e) {
        console.log(e)
    }
}

bootstrap()  

/*const syncGlobalEvent = (chatid, uid, payload) => {
  WSC.syncGlobalEvent(chatid, uid, payload)
}

module.exports = syncGlobalEvent*/