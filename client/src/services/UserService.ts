import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {IUser, IUserAuthority, IUserAuthorityResponse} from "../models/IUser";
import {IFilm, IFilmSearchResponse} from "../models/IFilm"
import { IDLC } from "../components/pages/Home";

export default class UserService {
    static async search(query: string, limit: number, page: number, fconfig: IDLC): Promise<AxiosResponse<IFilmSearchResponse>> {
        var req_queried = '/film/search'
        if(fconfig !== undefined || fconfig !== null) {
            if(fconfig.filtering !== null) {
                var fl = '?fl='
                fconfig.filtering.forEach((filter: any, i) => {
                    fl = fl + " " + filter.value
                })
                req_queried = req_queried + fl
            } else req_queried = '/film/search?fl=[]'
        } 
        if(fconfig.filtering_type) {
            if(fconfig.filtering_type=='without') req_queried = '/film/search?fl=[]&flt=' + fconfig.filtering_type
            else {
                if(req_queried == '/film/search') req_queried = req_queried + "?flt=" + fconfig.filtering_type
                else req_queried = req_queried + "&flt=" + fconfig.filtering_type
            }
        }
        if(fconfig.datesrt) req_queried = req_queried + '&datesrt=' + fconfig.datesrt
        else req_queried = req_queried + '&datesrt=any'
        if(fconfig.psrt) req_queried = req_queried + '&psrt="' + fconfig.psrt + '"'
        else req_queried = req_queried + '&psrt="without"'
        if(fconfig.psrt_t) req_queried = req_queried + '&psrt_t=' + fconfig.psrt_t
        else req_queried = req_queried + '&psrt_t=desc'
        return $api.post<IFilmSearchResponse>(req_queried, {query, limit, offset: page})
    }

    static async getById(id: any, lng: string): Promise<AxiosResponse<IFilm>> {
        return $api.get<IFilm>(`/film/get/${id}?lng=${lng}`)
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

    static async subscribeUser(id: string): Promise<AxiosResponse<any>> {
        return $api.put<any>(`/user/${id}/friendship/init`)
    }

    static async describeUser(id: string): Promise<AxiosResponse<any>> {
        return $api.put<any>(`/user/${id}/friendship/destroy`)
    }

    static async verifyDataAuthority(data:IUserAuthority): Promise<AxiosResponse<IUserAuthorityResponse>> {
        return $api.get<IUserAuthorityResponse>(`/user/verify`, {
            params: data
        })
    }

    static async update(data:any): Promise<AxiosResponse<any>> {
        return $api.post<any>('/user/update', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

