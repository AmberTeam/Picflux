import { AxiosResponse } from "axios"
import $api from "../http"
import { IChat, IInbox } from "../models/IDirect"
import { IMessage, ISeverMessage } from "../models/IMessage"

export interface IServerResponse {
    status: string
}

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

    static async deleteMsg(chatid:string, mid:string): Promise<AxiosResponse<IServerResponse>> {
        return $api.post<IServerResponse>('/chatapi/delete/msg', {
            chatid, 
            mid
        })
    }

    static async editMsg(chatid:string, mid:string, payload:string): Promise<AxiosResponse<IServerResponse>> {
        return $api.post<IServerResponse>('/chatapi/edit/msg', {
            chatid, 
            mid,
            payload
        })
    }

    static async storeMsg(msg:ISeverMessage): Promise<AxiosResponse<any>> {
        return $api.post<any>('/chatapi/create/msg', {
            ...msg
        })
    }
    static async updateSeen(chatid:string, messages:string): Promise<AxiosResponse<any>> {
        return $api.post<any>(`/chatapi/${chatid}/seen`, {
            messages,
        })
    }
}