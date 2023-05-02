const ApiError = require("../exceptions/api.error")
const DBAgent = require("../utils/db")
const uuid = require("uuid")
const UserModel = require("../models/user.model")
const UserMinDto = require("../dtos/user.min.dto") 
const {syncGlobalEvent} = require("../websocket/index")
 
class ChatApiService {
    async getUserInbox(uid) {
        return new Promise((resolve, reject) => {
            try {
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
    
                        const unread = await new Promise((r, j) => {
                            DBAgent.db.all(`SELECT * FROM messages WHERE chatid = "${data[i].chatid}" AND seen = 0 AND owner != "${uid}"`, (err, data) => {
                                if(err) return j(err) 
                                return r(data)
                            })
                        })
    
                        chats_p.push({
                            ...data[i],
                            members,
                            unread
                        })
                    }
    
                    resolve({
                        status: "ok",
                        inbox: chats_p
                    })
                })
            } catch(e) {
                console.error(e)
                reject(ApiError.BadRequest({...ApiError.econfig.bad_request, visible: false}))
            }
        })
    }

    async getMessageProaccess(expression, value) {
        return new Promise((resolve, reject) => {
            DBAgent.db.get(`SELECT * FROM messages WHERE ${expression} = "${value}"`, (err, data) => {
                if(err) {
                    console.error(err)
                    return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
                }

                return resolve(data)
                
            })
        })
    }

    async getChatHistory(uid, chatid, offset, limit) {
        return new Promise((resolve, reject) => {
            DBAgent.db.all(`SELECT * FROM messages WHERE chatid LIKE '${chatid}' ORDER BY id DESC LIMIT ${offset}, ${limit}`, async (err, data) => {
                if(err) return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
                for(var i=0;i < data.length;i++) {
                    if(data[i].type === 'reply' && data[i].refer !== 'null') {
                        const refer = await this.getMessageProaccess('_id', data[i].refer)
                        if(refer) data[i].refer = refer
                    }
                }
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
            if(members[0] === u) return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
            const members_str = JSON.stringify(JSON.stringify(members))
            const exists = await new Promise((r, j) => {
                DBAgent.db.all(`SELECT * FROM chats WHERE members = '${members_str}'`, (err, data) => {
                    if(err) return j(err)
                    if(data.length) return r(true)
                    else return r(false)
                })
            })
            if(exists) return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
            DBAgent.db.run(`INSERT INTO chats(chatid, members) VALUES("${chatid}", '${members_str}')`, async (err, data) => {
                if(err) return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
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
                syncGlobalEvent('chatroom-new', members_parsed[0].id, {
                    chatid,
                    members: [members_parsed[1]]
                })
                return resolve({
                    status: "ok",
                    chatid,
                    members: [members_parsed[0]]
                })
            })
        })
    }

    async storeMsg(owner, msg) {
        return new Promise((resolve, reject) => {
            if(
                !msg.owner
                ||
                !msg._id 
                || 
                !msg.chatid
                || 
                !msg.payload 
                ||
                msg.payload.replaceAll(" ", "") === ""
                || 
                !msg.seen
                || 
                !msg.timestamp
                ||
                !msg.type
            ) return reject(ApiError.BadRequest({...ApiError.econfig.bad_request, visible: false}))
            DBAgent.db.run(`INSERT INTO messages(_id, chatid, owner, payload, timestamp, seen, type, refer) VALUES("${msg._id}", "${msg.chatid}", "${owner.id}", "${msg.payload}", ${Date.now()}, "${msg.seen}", "${msg.type}", "${msg.refer ? msg.refer : "null"}")`, (err, data) => {
                if(err) return reject(ApiError.BadRequest(ApiError.econfig.bad_request))

                return resolve({
                    status: "ok",
                    msg
                })
            })
        })
    }

    async deleteMsg(uid, chatid, mid) {
        return new Promise((resolve, reject) => {
            if(!uid || !chatid || !mid) return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
            DBAgent.db.run(`DELETE FROM messages WHERE owner = "${uid}" AND chatid = "${chatid}" AND _id = "${mid}"`, (err, data) => {
                console.log(err)
                if(err) return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
                return resolve({
                    status: "ok"
                })
            })
        })
    }

    async editMsg(uid, chatid, mid, payload) {
        return new Promise(async(resolve, reject) => {
            try {
                if(!uid || !chatid || !mid || !payload) return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
                
                DBAgent.db.run(`UPDATE messages SET payload = "${payload}" WHERE chatid = "${chatid}" AND owner = "${uid}" AND _id = "${mid}"`, (err) => {
                    if(err) throw(err)
                    return resolve({status: "ok"})
                })
            } catch(e) {
                console.log(e) 
                return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
            }
        })
    }

    async updateSeen(uid, chatid, messages) { 
        return new Promise(async (resolve, reject) => {
            try {
                const emit_uid = await new Promise((r, j) => {
                    DBAgent.db.get(`SELECT * FROM chats WHERE chatid LIKE '${chatid}'`, (err, data) => {
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

                for(var i=0;i < messages.length;i++) {
                    await new Promise((r, j) => {
                        DBAgent.db.run(`UPDATE messages SET seen = 1 WHERE _id = "${messages[i]._id}"`, (err) => {
                            if(err) {
                                j(err)
                            } else {
                                r()
                            }
                        })
                    })
                }

                return {status: "ok"}
            } catch(e) {
                console.log(e)
                reject(ApiError.BadRequest({...ApiError.econfig.bad_request, visible: false}))
            }
        })
    }
} 

module.exports = new ChatApiService()