const rid = require("random-id")
const FilmSession = require("../obj/film_session")

class FilmService {
    core 
    sessions = []

    constructor(core) {
        this.core = core
    }

    emitSessionEvent(fid, event, payload) {
        console.log(fid, payload)
        for(var i=0;i < this.sessions.length;i++) {
            if(this.sessions[i].fid === fid) return this.sessions[i].broadcast("film-session-event", {
                ...payload,
                tag: event
            })
        }
    }

    findSession(fid) {
        for(var i=0;i < this.sessions.length;i++) {
            if(this.sessions[i].fid === fid) return this.sessions[i]
        }

        return this.initFilmSession(fid)
    }

    joinFilmSession(fid, uid) {
        const session = this.findSession(fid)
        session.initConnection(uid) 
    }

    disconnectFilmSessionConnection(fid, uid) {
        const session = this.findSession(fid) 
        return session.destroyConnection(uid)
    }

    destroyFilmSessionsConnection(uid) {
        for(var i=0;i < this.sessions.length;i++) {
            this.sessions[i].destroyConnection(uid)
        }
    }

    initFilmSession(fid) {
        const sid = rid(8, "aA0")
        const session = new FilmSession(sid, fid, this.core)
        this.sessions.push(session)
        return session
    }
}

module.exports = FilmService