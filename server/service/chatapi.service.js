const ApiError = require("../exceptions/api.error")
const DBAgent = require("../utils/db")
const uuid = require("uuid")
const UserModel = require("../models/user.model")
const UserMinDto = require("../dtos/user.min.dto")
 
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

    async createChat(members) {
        return new Promise((resolve, reject) => {
            const chatid = uuid.v4()
            const members_str = JSON.stringify(members)
            DBAgent.db.run(`INSERT INTO chats(chatid, members) VALUES("${chatid}", '${members_str}')`, (err, data) => {

            })
        })
    }
} 

module.exports = new ChatApiService()