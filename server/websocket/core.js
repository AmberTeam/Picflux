const rid = require('random-id')
const StatusSession = require('./obj/session')
const ChatRoom = require("./obj/chatroom")
const tokenService = require("../service/token.service")

class WebSocketCore {
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
 
    chatroom_broadcast(chatid, event, payload) {
        for(var i=0;i<this.chatrooms.length;i++) { 
            if(this.chatrooms[i].chatid === chatid) {
                for(var _i=0;_i<this.chatrooms[i].members_a.length;_i++) {
                    this.emit(this.chatrooms[i].members_a[_i].sid, event, payload)
                }
            }
        }
    }

    chatroom_force_broadcast(chatid, event, payload) { 
        for(var i=0;i<this.chatrooms.length;i++) { 
            if(this.chatrooms[i].chatid === chatid) {
                for(var _i=0;_i<this.chatrooms[i].members.length;_i++) {
                    this.emit_proaccess('uid', this.chatrooms[i].members[_i], event, payload)
                }
            }
        }
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

    checkActiveChatRoom(chatid) {
        for(var i=0;i < this.chatrooms.length;i++) {
            if(this.chatrooms[i].chatid == chatid) return i
        }
        return null
    }

    initChatRoom(sid, uid, cfg) {
        const ex = this.checkActiveChatRoom(cfg.chatid)
        if(ex === null) {
            const chatroom = new ChatRoom({...cfg, members_a: [{sid, uid}]})
            return this.chatrooms.push(chatroom)
        }

        this.chatrooms[ex].pushActiveMember({sid, uid})
    }

    emitChatroomMessage(sid, chatid, msg) { 
        this.chatroom_broadcast(chatid, 'chatroom-message', msg)
    }

    destroyClientChatRooms(sid) {
        for(var i=0;i < this.chatrooms.length;i++) {
            for(var _i=0;_i < this.chatrooms[i].members_a.length;_i++) {
                if(this.chatrooms[i].members_a[_i].sid === sid) {
                    this.chatrooms[i].destroyActiveMember(sid)
                }
            }
        }
    }

    destroyClientChatRoom(chatid, sid) {
        for(var i=0;i < this.chatrooms.length;i++) {
            if(this.chatrooms[i].chatid === chatid) {
                this.chatrooms[i].destroyActiveMember(sid)
            }
        }
    } 

    alertChatroomMessage(chatid, event, payload) {
        for(var i=0;i < this.chatrooms.length;i++) {  
            if(this.chatrooms[i].chatid === chatid) {
                var members_ofl = this.chatrooms[i].members
                for(var _i=0;_i < this.chatrooms[i].members_a.length;_i++) {
                    members_ofl = members_ofl.filter(el => el !== this.chatrooms[i].members_a[_i].uid)
                }
                return this.broadcast_arrtype_proaccess(members_ofl, 'uid', event, payload)
            } 
        }
        console.log("WSC: Could not find active chatroom with the same chatid!")
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

            console.log(this.clients.length)

            client.on('close', () => {
                this.destroyClientSessions(client.id)
                this.destroyClientChatRooms(client.id) 
                this.destroyClientConnection(client.id)
            }) 
 
            client.on("message", (e) => {
                const data_p = JSON.parse(e)  
                switch(data_p.event) {
                    case "session-init":
                        this.emit(client.id, "socid", {socid: client.id})
                        this.initStatusSession({ownid:soc.id,uid:data_p.data.uid})
                        break
                    case "chatroom-init":
                        this.initChatRoom(client.id, client.uid, data_p.data)    
                        break
                    case "chatroom-destroy": 
                        this.destroyClientChatRoom(data_p.data.chatid, client.id)
                        break
                    case "chatroom-message": 
                        if(data_p.data.msg === "" || !data_p.data.msg) return 
                        this.emitChatroomMessage(client.uid, data_p.data.chatid, data_p.data.msg)
                        this.alertChatroomMessage(data_p.data.chatid, 'push-alert', {
                            ...data_p.data.msg,
                            tag: 'msg'
                        })
                        break 
                    case "seen":
                        this.chatroom_broadcast(data_p.data.chatid, 'seen',  {
                            messages: data_p.data.messages
                        })
                        break
                    case "chatroom-event": 
                        switch(data_p.data.payload.event) {
                            case 'typing-start':     
                                return this.broadcast_arrtype(this.chatrooms.find(cr => cr.chatid === data_p.data.chatid).members_a.filter(m => m.sid !== client.id).map(m => m.sid), 'chatroom-event', data_p.data.payload)
                            case 'typing-end': 
                                return this.broadcast_arrtype(this.chatrooms.find(cr => cr.chatid === data_p.data.chatid).members_a.filter(m => m.sid !== client.id).map(m => m.sid), 'chatroom-event', data_p.data.payload)
                        
                            default: 
                                return this.chatroom_force_broadcast(data_p.data.chatid, 'chatroom-event', data_p.data.payload)
                        }
                }
            })
        })
    } 

}

module.exports = WebSocketCore