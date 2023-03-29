const rid = require('random-id')
const StatusSession = require('./obj/session')
const ChatRoom = require("./obj/chatroom")

class WebSocketController {
    ws
    clients
    status_sessions
    chatrooms

    constructor(ws) {
        this.ws = ws
        this.clients=[]
        this.status_sessions=[]
        this.chatrooms=[]
    }

    emit(sid, event,  data) {
        for(var i=0;i < this.clients.length;i++) {
            if(this.clients[i].id === sid) {
                this.clients[i].send(JSON.stringify({event, payload: JSON.stringify(data)}))
                return 1
            }
        }
        return 0
    }

    broadcast(event, data) {
        for(var i=0;i < this.clients.length;i++) this.emit(this.clients[i], event, data)
    }

    initClientConection(soc) {
        const _soc = soc
        _soc.id = rid(8, 'aA0')
        this.clients.push(_soc)
        return _soc
    }

    destroyClientConnection(sid) {
        for(var i=0;i<this.clients.length;i++) {
            if(this.clients[i].id === sid) {
                this.clients.splice(i, 1)
                return 1
            }
        }
        return 0
    }
    

    authorizeClient(sid, uid) {
        for(var i=0;i<this.clients.length;i++) {
            if(this.clients[i].id === sid) {
                this.clients[i].uid = uid
                return 1
            } 
        }
        return 0
    }

    emitStatusListeners(token) {
        for(var i=0;i < this.status_sessions.length;i++) if(this.status_sessions[i].uid === token) 
            this.emit(this.status_sessions[i].ownid, 'update-status', {uid: this.status_sessions[i].uid, status: 1})
    }

    destroyClientSessions(sid) {
        for(var i=0;i < this.status_sessions.length;i++) {
            if(this.status_sessions[i].ownid === sid) this.status_sessions.splice(i, 1)
        }
    }

    initStatusSession(cfg) {
        const statusSession = new StatusSession(cfg)
        this.status_sessions.push(statusSession)
     
        for(var i=0;i < this.clients.length;i++) {
            if(this.clients[i].uid === statusSession.uid) {
                this.emit(statusSession.ownid, "update-status", {
                    uid: this.clients[i].uid,
                    status: 1
                })
            }
        }
    }  

    checkActiveChatRoom(chatid) {
        for(var i=0;i < this.chatrooms.length;i++) {
            if(this.chatrooms[i].chatid == chatid) return i
        }
        return null
    }

    initChatRoom(sid, cfg) {
        const ex = this.checkActiveChatRoom(cfg.chatid)
        if(ex === null) {
            const chatroom = new ChatRoom({...cfg, members_a: [sid]})
            return this.chatrooms.push(chatroom)
        }

        this.chatrooms[ex].pushActiveMember(sid)
    }

    emitChatroomMessage(sid, chatid, msg) {
        for(var i=0;i<this.chatrooms.length;i++) {
            if(this.chatrooms[i].chatid === chatid) {
                for(var _i=0;_i<this.chatrooms[i].members_a.length;_i++) {
                    this.emit(this.chatrooms[i].members_a[_i], "chatroom-message", {
                        owner: sid,
                        data: msg
                    })
                }
            }
        }
    }

    destroyClientChatRooms(sid) {
        for(var i=0;i < this.chatrooms.length;i++) {
            for(var _i=0;_i < this.chatrooms[i].members_a.length;_i++) {
                if(this.chatrooms[i].members_a[_i] === sid) {
                    this.chatrooms[i].destroyActiveMember(sid)
                }
            }
        }
    }

    initialize() {
        this.ws.on('connection', (soc) => {
            const client = this.initClientConection(soc)

            client.on('close', () => {
                this.destroyClientSessions(client.id)
                this.destroyClientChatRooms(client.id)
                this.destroyClientConnection(client.id)
            })
 
            client.on("message", (e) => {
                const data_p = JSON.parse(e)
                switch(data_p.event) {
                    case "authorize":
                        this.authorizeClient(client.id, data_p.data.uid)
                        this.emitStatusListeners(data_p.data.uid)
                        break
                    case "session-init":
                        this.emit(client.id, "socid", {socid: client.id})
                        this.initStatusSession({ownid:soc.id,uid:data_p.data.uid})
                        break
                    case "chatroom-init":
                        this.initChatRoom(client.id, data_p.data)
                    case "chatroom-message": 
                        console.log(this.chatrooms)
                        this.emitChatroomMessage(client.uid, data_p.data.chatid, data_p.data.msg)
                }
            })
        })
    }

}

module.exports = WebSocketController