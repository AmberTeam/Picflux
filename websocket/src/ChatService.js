const ChatRoom = require("../obj/chatroom")

class FilmService {
    core 
    chatrooms = []

    constructor(core) {
        this.core = core
    }

    chatroom_broadcast(chatid, event, payload) {
        for(var i=0;i<this.chatrooms.length;i++) { 
            if(this.chatrooms[i].chatid === chatid) {
                for(var _i=0;_i<this.chatrooms[i].members_a.length;_i++) {
                    this.core.emit(this.chatrooms[i].members_a[_i].sid, event, payload)
                }
            }
        }
    }

    chatroom_broadcast_ex(chatid, ex, event, payload) {
        for(var i=0;i<this.chatrooms.length;i++) { 
            if(this.chatrooms[i].chatid === chatid) {
                for(var _i=0;_i<this.chatrooms[i].members_a.length;_i++) {
                    if(this.chatrooms[i].members_a[_i].sid !== ex) this.core.emit(this.chatrooms[i].members_a[_i].sid, event, payload)
                }
            }
        }
    }

    chatroom_force_broadcast_ex(chatid, ex, event, pyaload) {
        for(var i=0;i<this.chatrooms.length;i++) { 
            if(this.chatrooms[i].chatid === chatid) {
                for(var _i=0;_i<this.chatrooms[i].members.length;_i++) {
                    if(this.chatrooms[i].members[_i] !== ex) this.core.emit_proaccess('uid', this.chatrooms[i].members[_i], event, payload)
                }
            }
        }
    }

    chatroom_force_broadcast(chatid, event, payload) { 
        for(var i=0;i<this.chatrooms.length;i++) { 
            if(this.chatrooms[i].chatid === chatid) {
                for(var _i=0;_i<this.chatrooms[i].members.length;_i++) {
                    this.core.emit_proaccess('uid', this.chatrooms[i].members[_i], event, payload)
                }
            }
        }
    }

    checkActiveChatRoom(chatid) {  
        for(var i=0;i < this.chatrooms.length;i++) {
            if(this.chatrooms[i].chatid == chatid) return i
        }
        return null
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
                return this.core.broadcast_arrtype_proaccess(members_ofl, 'uid', event, payload)
            } 
        }
        console.log("WSC: Could not find active chatroom with the same chatid!")
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
        this.chatroom_broadcast_ex(chatid, sid, 'chatroom-message', msg)
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
                return this.core.broadcast_arrtype_proaccess(members_ofl, 'uid', event, payload)
            } 
        }
        console.log("WSC: Could not find active chatroom with the same chatid!")
    }
}

module.exports = FilmService