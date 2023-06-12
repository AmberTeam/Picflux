const ApiError = require("../exceptions/api.error")
const uuid = require("uuid")
const {syncGlobalEvent} = require("../websocket/index")
const { array2postgres, array2postgres_ex } = require("../utils/logic")
const db = require('../utils/ndb')
const UserMinDto = require("../dtos/user.min.dto")
 
class ChatApiService {
    async getUserInbox(uid) {
        const data = await db.query("SELECT * FROM chats WHERE members @> ARRAY[$1]", [uid]).then(data => data.rows)
        const chats_p = [] 

    
        for(var i=0;i<data.length;i++) {
            const result = []
            const members = (await db.query(`SELECT * FROM users WHERE id = any('${array2postgres(data[i].members.map(m => m !== uid && m))}')`).then(data => data.rows)).map(member => {
                const diff = Date.now() - member.last_active
                if(diff >= 60000) member.status = 0 
                else member.status = 1
                const memberDto = new UserMinDto(member)
                result.push(memberDto)
            })


            chats_p.push({
                ...data[i],
                members: result
            })
        }

        return {
            status: "ok",
            inbox: chats_p
        }
    }

    async getMessageProaccess(expression, value) {
        const data = await db.query(`SELECT * FROM messages WHERE ${expression} = $1`, [value]).then(data => data.rows[0])

        return data
    }

    async getChatHistory(uid, chatid, offset, limit) {
        const data = await db.query(`SELECT * FROM messages WHERE chatid LIKE $1 ORDER BY id DESC OFFSET $2 LIMIT $3`, [chatid, offset, limit]).then(data => data.rows)
        for(var i=0;i < data.length;i++) {
            if(data[i].type === 'reply' && data[i].refer !== 'null') {
                const refer = await this.getMessageProaccess('_id', data[i].refer)
                if(refer) data[i].refer = refer
            }
        }
        return {
            status: "ok",
            chatid,
            history: data.reverse()
        }
    }

    async createChat(u, members) {
        const chatid = uuid.v4()
        if(members[0] === u) return ApiError.BadRequest()
        const members_str = array2postgres(members)
        const exists = await db.query(`SELECT * FROM chats WHERE members @> ARRAY['${members_str}']`).then(data => data.rows)
        if(!exists || exists.length) return ApiError.BadRequest()
        await db.query(`INSERT INTO chats(chatid, members) VALUES($1, $2)`, [chatid, members_str])
        const members_parsed = []
        const members_db = await db.query(`SELECT * FROM users WHERE id = any('${members_str}')`).then(data => data.rows)
        for(var i=0;i < members_db.length;i++) {
            if(members_db[i] !== u.id) {
                const diff = Date.now() - members_db[i].last_active
                if(diff >= 60000) members_db[i].status = 0 
                else members_db[i].status = 1
                const userDto = new UserMinDto(members_db[i])
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
        return {
            status: "ok",
            chatid,
            members: [members_parsed[0]]
        }
    }

    async storeMsg(owner, msg) {
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
        ) return ApiError.BadRequest({visible: false})
        const data = await db.query(`INSERT INTO messages(_id, chatid, owner, payload, timestamp, seen, type, refer) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [msg._id, msg.chatid, owner.id, msg.payload, Date.now(), msg.seen, msg.type, msg.refer ? msg.refer : "null"]).then(data => data.rows)

        return {
            status: "ok",
            msg: data
        }
    } 

    async deleteMsg(uid, chatid, mid) {
        if(!uid || !chatid || !mid) return ApiError.BadRequest()
        await db.query(`DELETE FROM messages WHERE owner = $1 AND chatid = $2 AND _id = $3`, [uid, chatid, mid]) 

        return { 
            status: "ok"
        }
    }

    async editMsg(uid, chatid, mid, payload) {
        try {
            if(!uid || !chatid || !mid || !payload) return reject(ApiError.BadRequest(ApiError.econfig.bad_request))
            
            await db.query(`UPDATE messages SET payload = $1 WHERE chatid = $2 AND owner = $3 AND _id = $4`, [payload, chatid, uid, mid])
            return {status: "ok"}
        } catch(e) {
            console.log(e) 
            return ApiError.BadRequest()
        }
    }

    async updateSeen(uid, chatid, messages) { 
        try {
            
            const data = await db.query(`SELECT * FROM chats WHERE chatid = $1`, [chatid]).then(data => data.rows[0])
            var f = false 
            for(var i=0;i < data.members.length;i++) {
                if(data.members[i] === uid) {
                    f = true 
                    continue 
                }
            }
            if(!f) return ApiError.BadRequest()

            await db.query(`UPDATE messages SET seen = 1 WHERE _id = any('${array2postgres_ex(messages, '_id')}')`)
        } catch(e) {
            console.log(e)
            return ApiError.BadRequest({visible: false})
        }
    }
} 

module.exports = new ChatApiService()