const ApiError = require("../exceptions/api.error")
const DBAgent = require("../utils/db")
const uuid = require("uuid")
const UserModel = require("../models/user.model")
const UserMinDto = require("../dtos/user.min.dto") 
const WSC = require("../websocket")
 
class ChatApiService {
    async getUserInbox(uid) {
        return new Promise((resolve, reject) => {
            DBAgent.db.all(`SELECT * FROM chats WHERE members LIKE "%${uid}%"`, async (err, data) => {
                if(err) {
                    console.error(err)
                    return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
                }  
 
                const chats_p = [] 

                for(var i=0;i<data.length;i++) {
                    const mids_p = JSON.parse(data[i].members)
                    const mids_r = mids_p.replace('[', '').replace(']', '').replaceAll('"', '')
                    const mids_s = mids_r.split(",")
                    const members = await new Promise(async (_resolve, _reject) => {
                        const result=[]
                        for(let i=0;i<mids_s.length;i++) {
                            if(mids_s[i] !== uid) {
                                const member = await UserModel.findById(mids_s[i])
                                const diff = Date.now() - member.last_active
                                if(diff >= 60000) member.status = 0 
                                else member.status = 1
                                const memberDto = new UserMinDto(member)
                                result.push(memberDto)
                            }
                        }
                        _resolve(result)
                    })

                    chats_p.push({
                        ...data[i],
                        members
                    })
                }

                resolve({
                    status: "ok",
                    inbox: chats_p
                })
            })
        })
    }

    async getChatHistory(uid, chatid, offset, limit) {
        return new Promise((resolve, reject) => {
            DBAgent.db.all(`SELECT * FROM messages WHERE chatid LIKE '${chatid}' ORDER BY id DESC LIMIT ${offset}, ${limit}`, (err, data) => {
                if(err) console.log(err)
                resolve({
                    status: "ok",
                    chatid,
                    history: data.reverse()
                })
            })
        })
    }

    async createChat(u, members) {
        return new Promise(async (resolve, reject) => {
            const chatid = uuid.v4()
            const members_str = JSON.stringify(JSON.stringify(members))
            const exists = await new Promise((r, j) => {
                DBAgent.db.all(`SELECT * FROM chats WHERE members = '${members_str}'`, (err, data) => {
                    if(err) return j(err)
                    if(data.length) return r(true)
                    else return r(false)
                })
            })
            if(exists) return resolve({
                status: "err"
            })
            DBAgent.db.run(`INSERT INTO chats(chatid, members) VALUES("${chatid}", '${members_str}')`, async (err, data) => {
                if(err) throw reject(ApiError.BadRequest(ApiError.econfig.bad_request))
                const members_parsed = []
                for(var i=0;i < members.length;i++) {
                    if(members[i] !== u.id) {
                        const userData = await UserModel.findById(members[i])
                        const diff = Date.now() - userData.last_active
                        if(diff >= 60000) userData.status = 0 
                        else userData.status = 1
                        const userDto = new UserMinDto(userData)
                        members_parsed.push(userDto)
                    } else {
                        const diff = Date.now() - u.last_active
                        if(diff >= 60000) u.status = 0 
                        else u.status = 1
                        const userDto = new UserMinDto(u)
                        members_parsed.push(userDto)
                    }
                }
                console.log(chatid)
                WSC.syncGlobalEvent('chatroom-new', members_parsed[0].id, {
                    chatid,
                    members: [members_parsed[1]]
                })
                resolve({
                    status: "ok",
                    chatid,
                    members: [members_parsed[0]]
                })
            })
        })
    }

    async storeMsg(owner, msg) {
        return new Promise((resolve, reject) => {
            console.log(msg.data.replaceAll(" ", "") + "sus")
            if(
                !msg.owner
                ||
                !msg._id 
                || 
                !msg.chatid
                || 
                !msg.data 
                ||
                msg.data === "" 
                ||
                msg.data.replaceAll(" ", "") === ""
                || 
                !msg.seen
                || 
                !msg.timestamp
            ) return reject(ApiError.BadRequest({...ApiError.econfig.bad_request, visible: false}))
            DBAgent.db.run(`INSERT INTO messages(_id, chatid, owner, data, timestamp, seen) VALUES("${msg._id}", "${msg.chatid}", "${owner.id}", "${msg.data}", ${Date.now()}, "${msg.seen}")`, (err, data) => {
                if(err) console.log(err)
                resolve({
                    status: "ok",
                    msg
                })
            })
        })
    }

    async updateSeen(uid, chatid, messages, fragid, observer) { 
        return new Promise(async (resolve, reject) => {
            try {
                const emit_uid = await new Promise((r, j) => {
                    DBAgent.db.get(`SELECT * FROM chats WHERE chatid LIKE '${chatid}'`, (err, data) => {
                        console.log(err)
                        if(err) return j(err)
                        if(!data) return j({message: "Could not find chat with same chatid."})
                        const members_p = JSON.parse(JSON.parse(data.members))
                        for(var i=0;i < members_p.length;i++) {
                            if(members_p[i] === uid) return r(members_p.filter((m) => m !== members_p[i])[0])
                        }
                        return j({message: "Could not find member with same id."})
                    })
                })

                resolve({status: "ok"})

                /*for(var i=0;i < messages.length;i++) {
                    await new Promise((r, j) => {
                        DBAgent.db.run(`UPDATE messages SET seen = 1 WHERE _id = "${messages[i]._id}"`, (err) => {
                            if(err) {
                                j(err)
                            } else {
                                console.log("here")
                                r()
                            }
                        })
                    })
                }*/

                return {status: "ok"}
            } catch(e) {
                console.log(e)
                reject(ApiError.BadRequest({...ApiError.econfig.bad_request, visible: false}))
            }
        })
    }
} 

module.exports = new ChatApiService()