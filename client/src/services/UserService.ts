import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {IUser} from "../models/IUser";
import {IFilm} from "../models/IFilm"
import { IDLC } from "../components/pages/Home";

export default class UserService {
    static async search(query: string, limit: number, page: number, fconfig: IDLC): Promise<AxiosResponse<IFilm[]>> {
        var req_queried = '/film/search'
        if(fconfig !== undefined) {
            var fl = '?fl='
            console.log(fconfig)
            fconfig.filtering.forEach((filter: any, i) => {
                fl = fl + " " + filter.value
            })
            req_queried = req_queried + fl
        } 
        if(fconfig.filtering_type) {
            if(req_queried == '/film/search') req_queried = req_queried + "?flt=" + fconfig.filtering_type
            else req_queried = req_queried + "&flt=" + fconfig.filtering_type
        }
        return $api.post<IFilm[]>(req_queried, {query, limit, offset: page})
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

