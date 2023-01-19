import { IFilm } from "./IFilm";

export interface IUser {
    email: string;
    avatar: string;
    isActivated: boolean;
    id: string;
    username: string;
    watchLater?: [IFilm]
}
