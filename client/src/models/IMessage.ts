import { IUserMin } from "./IUser";

export interface IMessage {
    owner: string
    data:string
    id: string
    _id: string
    chatid:string
    timestamp: number 
    seen: number
    last?: boolean
}