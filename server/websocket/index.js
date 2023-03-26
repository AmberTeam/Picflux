const ws = require('ws')
const rid = require('random-id')

const WSS = new ws.Server({port: process.env.WSS_PORT})

// Constants
const CLIENTS = []
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
            CLIENTS.map((soc, i) => {
                if(soc.id === sid) delete CLIENTS[i]
            })
            SESSIONS.map((session, i) => {
                if(session.ownid === sid.id) delete SESSIONS[i]
            })
            broadcast({event: "close", data: {
                sckts: CLIENTS.map(soc => soc.id)
            }})
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
        destroySocket(soc)
    })

    soc.on("message", (e) => {
        const data_p = JSON.parse(e)
        switch(data_p.event) {
            case "authorize":
                emitListeners(data_p.data.uid)
                break
            case "session-init":
                initSession({ownid:soc.id,uid:data_p.data.uid})
                break
        }
    })
})

 
module.exports = WSS