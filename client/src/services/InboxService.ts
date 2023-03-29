import { AxiosResponse } from "axios"
import $api from "../http"
import { IChat, IInbox } from "../models/IDirect"

export default class InboxService {
    static async getUserInbox(): Promise<AxiosResponse<IInbox>> {
        return $api.get<IInbox>('/chatapi/user/inbox')
    }

    static async createChat(members:string[]): Promise<AxiosResponse<IChat>> {
        return $api.post<IChat>('/chatapi/create', {
            members: JSON.stringify(members)
        })
    }
}