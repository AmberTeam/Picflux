import { AxiosResponse } from "axios"
import $api from "../http"
import { IChat, IInbox } from "../models/IDirect"
import { IMessage } from "../models/IMessage"
import { IAlert } from "../store/store"

export default class InboxService {
    static async getUserInbox(): Promise<AxiosResponse<IInbox>> {
        return $api.get<IInbox>('/chatapi/user/inbox')
    }

    static async createChat(members:string[]): Promise<AxiosResponse<IChat>> {
        return $api.post<IChat>('/chatapi/create/chatroom', {
            members: JSON.stringify(members)
        })
    }

    static async getChatHistory(chatid:string, offset:number, limit:number): Promise<AxiosResponse<any | IChat[]>> {
        return $api.get<any | IChat[]>('/chatapi/history?chatid=' + chatid, {
            params: {
                offset,
                limit
            }
        })
    }

    static async storeMsg(chatid:string,data:string): Promise<AxiosResponse<any>> {
        return $api.post<any>('/chatapi/create/msg', {
            chatid,
            data
        })
    }
}