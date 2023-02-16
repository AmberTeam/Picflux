const ws = require('ws')
const rid = require('random-id')

const WSS = new ws.Server({port: process.env.WSS_PORT})

//Env
const CLIENTS = []
var CLIENTS_IDS = [] 

function prepareSocket(scfg, scfg_id) {
    CLIENTS.push(scfg)
    CLIENTS_IDS.push(scfg_id)
}
 

function removeSocket(scfg) {
    CLIENTS_IDS.map((sckt, i) => {
        if(sckt == scfg.id) {
            if(CLIENTS[i].id == sckt.id) CLIENTS = CLIENTS.filter((client) => client.id !== scfg.id)
            CLIENTS_IDS = CLIENTS_IDS.filter((client) => client !== scfg.id)
            emit({action: "disconnect", data: {
                sckts: CLIENTS_IDS
            }})
        }
    })
}

function emit(content) {
    CLIENTS.map((client) => {
        client.send(JSON.stringify(content))
    })
}

WSS.on("connection", (socket) => {
    socket.id = rid(8, 'aA0')
    prepareSocket(socket, socket.id)

    socket.on("close", () => {
        removeSocket(socket)
    })

    emit({action: "connection", data: {
        sckts: CLIENTS_IDS
    }})
})

 
module.exports = WSS