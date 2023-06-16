const rid = require('random-id')
const StatusSession = require('./obj/session')
const tokenService = require("../service/token.service")
const chatService = require('./src/ChatService')
const FilmService = require('./src/FilmService')

class WebSocketCore {
    ws
    clients
    status_sessions
    chatService
    filmService

    constructor(ws) {
        this.ws = ws
        this.clients=[]
        this.status_sessions=[]
        this.chatrooms=[]
        this.filmService = new FilmService(this)
        this.chatService = new chatService(this)
    } 

    emit_proaccess(expression, ex_val, event, data) {
        for(var i=0;i < this.clients.length;i++) {
            if(this.clients[i][expression] === ex_val) {
                var data_c = data
                if(data && {}.toString.call(data) === '[object Function]') data_c = data(this.clients[i])
                this.clients[i].send(JSON.stringify({
                    event, 
                    payload: JSON.stringify(data_c),
                    timestamp: Date.now()
                }))
                return 1
            }
        }
        return 0
    }

    emit(sid, event,  data) {
        for(var i=0;i < this.clients.length;i++) {
            if(this.clients[i].id === sid) {
                this.clients[i].send(JSON.stringify({
                    event,  
                    payload: JSON.stringify(data),
                    timestamp: Date.now()
                }))
                return 1
            }
        }
        return 0
    }

    broadcast_arrtype_proaccess(arr, expression, event, data) {
        if(arr.length === 1) return this.emit_proaccess(expression, arr[0], event, data)
        if(arr.length > 1) for(var i=0;i < arr.length - 1;i++) this.emit_proaccess(expression, arr[i], event, data)
    }

    broadcast_arrtype(arr, event, data) {
        for(var i=0;i < arr.length;i++) this.emit(arr[i], event, data)
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
        for(var i=0;i < this.status_sessions.length;i++) {
            if(this.status_sessions[i].uid === token) {
                this.emit(this.status_sessions[i].ownid, 'update-status', {uid: this.status_sessions[i].uid, status: 1})
            }
        }
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

    syncGlobalEvent(event, uid, payload) {
        this.emit_proaccess('uid', uid, event, payload) 
    }
 
    initialize() { 
        this.ws.on('connection', (soc, req) => {
            const accessToken = req.url.replace("/wsedge?token=", "")
            if(!accessToken || accessToken === "" || accessToken === " ") return soc.close()
            const userData = tokenService.validateAccessToken(accessToken); 
            if (!userData) return soc.close()
            
            const client = this.initClientConection(soc) 
            this.authorizeClient(client.id, userData.id)
            this.emitStatusListeners(userData.id)

            client.on('close', () => {
                this.destroyClientSessions(client.id)
                this.chatService.destroyClientChatRooms(client.id) 
                this.destroyClientConnection(client.id)
                this.filmService.destroyFilmSessionsConnection(client.uid)
            }) 
 
            client.on("message", (e) => {
                const data_p = JSON.parse(e)  
                switch(data_p.event) {
                    case "session-init":
                        this.emit(client.id, "socid", {socid: client.id})
                        this.initStatusSession({ownid:soc.id,uid:data_p.data.uid})
                        break
                    case "film-session-join": 
                        this.filmService.joinFilmSession(data_p.data.fid, client.uid)
                        break
                    case "film-session-disconnect":
                        this.filmService.disconnectFilmSession(data_p.data.fid, client.uid) 
                        break
                    case "chatroom-init":
                        this.chatService.initChatRoom(client.id, client.uid, data_p.data)    
                        break
                    case "chatroom-destroy": 
                        this.chatService.destroyClientChatRoom(data_p.data.chatid, client.id)
                        break
                    case "chatroom-message": 
                        if(data_p.data.msg === "" || !data_p.data.msg) return 
                        this.chatService.emitChatroomMessage(client.id, data_p.data.chatid, data_p.data.msg)
                        this.chatService.alertChatroomMessage(data_p.data.chatid, 'push-alert', {
                            ...data_p.data.msg,
                            tag: 'msg'
                        })
                        break 
                    case "seen":
                        this.chatService.chatroom_broadcast(data_p.data.chatid, 'seen',  {
                            messages: data_p.data.messages
                        })
                        break
                    case "chatroom-event": 
                        switch(data_p.data.payload.event) {
                            case 'typing-start':     
                                return this.broadcast_arrtype(this.chatService.chatrooms.find(cr => cr.chatid === data_p.data.chatid).members_a.filter(m => m.sid !== client.id).map(m => m.sid), 'chatroom-event', data_p.data.payload)
                            case 'typing-end': 
                                return this.broadcast_arrtype(this.chatService.chatrooms.find(cr => cr.chatid === data_p.data.chatid).members_a.filter(m => m.sid !== client.id).map(m => m.sid), 'chatroom-event', data_p.data.payload)
                        
                            default: 
                                return this.chatService.chatroom_force_broadcast_ex(data_p.data.chatid, client.uid, 'chatroom-event', data_p.data.payload)
                        }
                }
            })
        })
    } 

}

module.exports = WebSocketCore