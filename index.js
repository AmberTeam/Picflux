require("dotenv").config({path: `.${process.env.NODE_ENV}.env`})
const express = require("express")
const routes = require("./routes")
const path = require("path")
const cors = require("cors")
const cookieParser = require("cookie-parser") 
const errorMiddleware = require('./middlewares/error.middleware')
const fileupload = require("express-fileupload")
const proxyRouter = require("./routes/proxy.router") 
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

if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'psprod') {
  app.use('/', express.static(path.join(__dirname, "..", 'client', 'build')))
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", 'client', 'build', 'index.html'))
  })
}

var wss = new WebSocketServer({server: server, path: '/wsedge'});

initWebSocketCore(wss)


async function bootstrap() { 
    try { 
      
        server.listen(process.env.PORT, () => console.log(`\n[server] Listening on ${process.env.PORT} \n`))

    } catch(e) {
        console.log(e)
    }
}

bootstrap()  