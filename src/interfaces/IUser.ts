import { IFilm } from "./IFilm";

export interface IUserInformation {
    username?: string
    biography?: string
    avatar?: File
}

export interface IUserMin {
    id: string
    username: string
    avatar: string
    status?: number
}

export interface IUserAuthority {
    username: string
}

export interface IUserAuthorityResponse {
    username: number
}

export interface IUser {
    email: string;
    avatar: string;
    isActivated: boolean;
    id: string;
    username: string;
    watchLater?: [IFilm]
    status?: number
    friends: IUser[]
    subscribed: boolean
    biography: string
}
