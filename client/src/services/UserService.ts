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
}

