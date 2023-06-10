export interface IMessage {
    owner: string
    payload: string
    id: string
    _id: string
    chatid: string
    timestamp: number
    seen: number
    last?: boolean
    type: string
    refer: IMessage | null | "null"
}

export interface IServerMessage {
    owner: string
    payload: string
    id: string
    _id: string
    chatid: string
    timestamp: number
    seen: number
    last?: boolean
    type: string
    refer: string | null | "null"
}