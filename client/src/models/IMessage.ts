export interface IMessage {
    owner: string
    payload:string
    id: string
    _id: string
    chatid:string
    timestamp: number 
    seen: number
    last?: boolean
    type: string
    refer: IMessage | null
}

export interface ISeverMessage {
    owner: string
    payload:string
    id: string
    _id: string
    chatid:string
    timestamp: number 
    seen: number
    last?: boolean
    type: string
    refer: string
}