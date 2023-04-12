const ws = require('ws')
const rid = require('random-id')
const WebSocketController = require('./core')

const WSS = new ws.Server({port: process.env.WSS_PORT})
const WSC = new WebSocketController(WSS)
 
module.exports = WSC