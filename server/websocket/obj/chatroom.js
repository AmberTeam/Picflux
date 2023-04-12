
class ChatRoom {
    chatid
    members 
    members_a=[]

    constructor(model) {
        this.chatid = model.chatid 
        this.members = model.members
        this.members_a = model.members_a
    }

    pushActiveMember(sid) {
        this.members_a.push(sid)
    }

    destroyActiveMember(sid) {
        this.members_a = this.members_a.filter(el => el.sid !== sid)
    }
}

module.exports = ChatRoom 