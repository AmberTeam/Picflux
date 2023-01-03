require("dotenv").config({path: `.${process.env.NODE_ENV}.env`})
const express = require("express")
const routes = require("./routes")
const path = require("path")
const cors = require("cors")
const cookieParser = require("cookie-parser") 
const mongoose = require("mongoose")
const errorMiddleware = require('./middlewares/error.middleware')
const fileupload = require("express-fileupload")
const proxy = require("express-http-proxy")

const app = express()  

app.post('/playlist/:id', async (req, res, next) => {
  const test = await fetch(`https://vid1672084730.vb17121coramclean.pw/playlist/${req.url}`, {
    method: "POST",
    headers: {
      'Sec-Fetch-Site': 'same-origin', 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  })
  console.log(test) 
  res.setHeader('Content-Type', 'application/vnd.apple.mpegurl')
  res.send("https://b-401.vb17121coramclean.pw/stream2/b-401/2b0d43ec1fc39b2c90fb24f7f7271518/MJTMsp1RshGTygnMNRUR2N2MSlnWXZEdMNDZzQWe5MDZzMmdZJTO1R2RWVHZDljekhkSsl1VwYnWtx2cihVT21EVVRjT6FVMZRlSollaZFjWElFMPdkTplFVrFTWXVUNNJjUr50RJRjTENWP:1672618777:79.239.228.211:514cc26a99e69c47cb1588843c384245658e8838d688976ee70865237cda6b0f/index.m3u8")
})

app.get('/js/ch.js?v=1.31', (req, res) => {
  return res.status(404).json()
})

/*app.use('/playlist', proxy("vid1672084730.vb17121coramclean.pw", {
  proxyErrorHandler: function(err, res, next) {
    next(err);
  }
}))*/
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