import { IUserMin } from "./IUser"

export interface IChat {
    chatid:string 
    members: IUserMin[]
}

export interface IInbox {
    inbox: IChat[]
}