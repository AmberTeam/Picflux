import { IMessage } from "./IMessage";
import { IUserMin } from "./IUser";

export interface IChat {
    chatid: string 
    members: IUserMin[]
    unread: IMessage[]
}

export interface IInbox {
    inbox: IChat[]
}