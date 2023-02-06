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
  const dbg = new Debugger()
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