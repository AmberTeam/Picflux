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
    refer: IMessage | null | string
}

export interface INotReadMessages {
    [key: string]: IMessage[]
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
    refer: string | null
}