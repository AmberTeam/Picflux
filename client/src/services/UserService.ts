import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {IUser} from "../models/IUser";
import {IFilm} from "../models/IFilm"

export default class UserService {
    static async search(query: string, limit: number, page: number): Promise<AxiosResponse<IFilm[]>> {
        return $api.post<IFilm[]>(`/film/search`, {query, limit, offset: page})
    }

    static async getById(id: any): Promise<AxiosResponse<IFilm>> {
        return $api.get<IFilm>(`/film/get/${id}`)
    }

    static async addWLFilm(id: number): Promise<AxiosResponse<IFilm>> {
        return $api.post<IFilm>(`/film/wl/add`, {id})
    }

    static async removeWLFilm(id: number): Promise<AxiosResponse<IFilm>> {
        return $api.post<IFilm>(`/film/wl/rem`, {id})
    }

    static async getUserBId(id: string, current: boolean): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>(`/user/get/${id}${current ? "?crr=true" : ""}`)
    }
}

