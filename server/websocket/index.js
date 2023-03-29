const ws = require('ws')
const rid = require('random-id')
const WebSocketController = require('./core')

const WSS = new ws.Server({port: process.env.WSS_PORT})
const WSC = new WebSocketController(WSS)

WSC.initialize()

/*
// Constants
var CLIENTS = []
const SESSIONS = []

// Serving sockets
function prepareSocket(soc) {
    CLIENTS.push(soc)
    broadcast({event: "connection", data: {
        sckts: CLIENTS.map(client => client.id)
    }})
}

function destroySocket(sid) {
    CLIENTS.map((soc, i) => {
        if(soc.id == sid) {
            CLIENTS.splice(i, 1)
            broadcast({event: "close", data: {
                sckts: CLIENTS.map(soc => soc.id)
            }})
        }
    })
}

const authorizeSocket = (socid, uid) => {
    CLIENTS.map((client) => {
        if(client.id === socid){
            client.uid = uid
        }
    })
}

// Standard functionality
function broadcast(data) { 
    CLIENTS.map((soc) => {
        soc.send(JSON.stringify(data))
    })
}

const emit = (sockid, data) => {
    CLIENTS.map((soc) => {
        if(soc.id === sockid) soc.send(JSON.stringify(data))
    })
}

// Business logic
function initSession(session) {
    SESSIONS.push(session);
    CLIENTS.map((soc, i) => {
        if(soc.uid === session.uid) {
            emit(session.ownid, {event: "update-status", data: {
                uid: soc.uid,
                status: 1
            }})
        }
    })
}  

const destroyUserSessions = (sid) => {
    SESSIONS.map((session, i) => {
        if(session.ownid === sid) delete SESSIONS[i]
    })
}

const emitListeners = (uid) => {
    SESSIONS.map((session) => { 
        if(session.uid === uid) {
            CLIENTS.map((soc, i) => {
                if(soc.id === session.ownid) emit(soc.id, {event: "update-status", data: {
                    uid, 
                    status: 1
                }})
            })
        }
    })
}

WSS.on("connection", (soc) => {
    soc.id = rid(8, 'aA0')
    prepareSocket(soc)

    soc.on("close", () => {
        destroyUserSessions(soc.id)
        destroySocket(soc.id)
    })

    soc.on("message", (e) => {
        const data_p = JSON.parse(e)
        switch(data_p.event) {
            case "authorize":
                authorizeSocket(soc.id, data_p.data.uid)
                emitListeners(data_p.data.uid)
                break
            case "session-init":
                emit(soc.id, {event: "socid", data: {socid: soc.id}})
                initSession({ownid:soc.id,uid:data_p.data.uid})
                break
            case "chatroom-init":
                console.log(data_p.data)
        }
    })
})
*/

 
module.exports = WSS