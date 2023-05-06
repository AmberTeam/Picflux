
class FilmSession {
    sid 
    fid 
    members
    core

    constructor(sid, fid, core) {
        this.sid = sid 
        this.fid = fid 
        this.members = []
        this.core = core
    }

    initConnection(uid) {
        this.members.push(uid)
        console.log(this.members)
    }

    destroyConnection(uid) {
        console.log(uid)
        this.members = this.members.filter(p => p !== uid)
    }

    broadcast(event, payload) {
        for(var i=0;i < this.members.length;i++) {
            console.log(this.core.emit)
            this.core.emit_proaccess('uid', this.members[i], event, payload)
        }
    }
}

module.exports = FilmSession