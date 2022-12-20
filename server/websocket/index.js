const ws = require('ws')
const http = require("http")

const WSS = new ws.Server({port: process.env.WSS_PORT})

WSS.on("connection", (socket) => {
    console.log("new connection")
})
 
module.exports = WSS