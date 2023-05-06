const ws = require('ws')
const rid = require('random-id')
const WebSocketCore = require('./core')

var webSocketCore

const initWebSocketCore = (wss) => {
    webSocketCore = new WebSocketCore(wss)
    webSocketCore.initialize()
}

const syncGlobalEvent = (event, uid, payload) => {
    webSocketCore.syncGlobalEvent(event, uid, payload)
}

const syncFilmEvent = (fid, event, payload) => {
    webSocketCore.filmService.emitSessionEvent(fid, event, payload)
}
 
module.exports = {initWebSocketCore, syncGlobalEvent, syncFilmEvent}