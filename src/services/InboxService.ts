import { AxiosResponse } from "axios";
import $api from "../http";
import { IChat, IInbox } from "../interfaces/IDirect";
import { IMessage, IServerMessage } from "../interfaces/IMessage";

interface IServerResponse {
    status: string
}

interface IGetChatHistoryResponse {
    status: string
    history: IMessage[]
    chatid: string
}

interface IStoreMessageResponse {
    status: string
    msg: IMessage[]
}

export default class InboxService {
    static async getUserInbox(): Promise<AxiosResponse<IInbox>> {
        return $api.get<IInbox>("/chatapi/user/inbox");
    }

    static async createChat(members: string[]): Promise<AxiosResponse<IChat>> {
        return $api.post<IChat>("/chatapi/create/chatroom", {
            members: JSON.stringify(members)
        });
    }

    static async getChatHistory(chatid: string, offset: number, limit: number): Promise<AxiosResponse<IGetChatHistoryResponse>> {
        return $api.get<IGetChatHistoryResponse>("/chatapi/history?chatid=" + chatid, {
            params: {
                offset,
                limit
            }
        });
    }

    static async deleteMsg(chatid: string, mid: string): Promise<AxiosResponse<IServerResponse>> {
        return $api.post<IServerResponse>("/chatapi/delete/msg", {
            chatid,
            mid
        });
    }

    static async editMsg(chatid: string, mid: string, payload: string): Promise<AxiosResponse<IServerResponse>> {
        return $api.post<IServerResponse>("/chatapi/edit/msg", {
            chatid,
            mid,
            payload
        });
    }

    static async storeMsg(msg: IServerMessage): Promise<AxiosResponse<IStoreMessageResponse>> {
        return $api.post<IStoreMessageResponse>("/chatapi/create/msg", {
            ...msg
        });
    }
    static async updateSeen(chatid: string, messages: string): Promise<AxiosResponse<string>> {
        return $api.post<string>(`/chatapi/${chatid}/seen`, {
            messages,
        });
    }
}