import $api from "../http"
import { AxiosResponse } from "axios"
import { IUser, IUserAuthority, IUserAuthorityResponse, IUserInformation, IUserMin } from "../interfaces/IUser"
import { IFilm, IFilmSearchResponse, IIMDBTranslate } from "../interfaces/IFilm"
import { IDLC } from "../pages/Home"
import IAlert from "../interfaces/IAlert"
import IRating from "../interfaces/IRating"

export interface IFilmGetById {
    comments: string
    countries: string
    description: string
    duration: string
    genres: string
    id: number
    poster: string
    rated: boolean
    rating: IRating[]
    rating_average: number
    year: 2022
    name: string
    players: string[]
    imdb_translate?: IIMDBTranslate
    language: number
    lowerName: string
    watchLater: string[]
}

export default class UserService {
    static async search(query: string, limit: number, page: number, fconfig: IDLC): Promise<AxiosResponse<IFilmSearchResponse>> {
        let req_queried = "/film/search?"
        req_queried += `flt=${fconfig.filtering_type}`
        req_queried += `&datesrt=${fconfig.date}`
        req_queried += `&psrt=${fconfig.sortCriteria}`
        req_queried += `&psrt_t=${fconfig.sortDirection}`
        req_queried += `&fl=${fconfig.genres}`
        return $api.post<IFilmSearchResponse>(req_queried, { query, limit, offset: page })
    }

    static async getById(id: string | undefined, language: string): Promise<AxiosResponse<IFilmGetById>> {
        return $api.get<IFilmGetById>(`/film/get/${id}?lng=${language}`)
    }

    static async addWLFilm(id: number): Promise<AxiosResponse<IFilm>> {
        return $api.post<IFilm>("/film/wl/add", { id })
    }

    static async removeWLFilm(id: number): Promise<AxiosResponse<IFilm>> {
        return $api.post<IFilm>("/film/wl/rem", { id })
    }

    static async getUserBId(id: string, current: boolean): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>(`/user/get/${id}${current ? "?crr=true" : ""}`)
    }

    static async subscribeUser(id: string): Promise<AxiosResponse<any>> {
        return $api.put<any>(`/user/${id}/friendship/init`)
    }

    static async unsubscribeUser(id: string): Promise<AxiosResponse<any>> {
        return $api.put<any>(`/user/${id}/friendship/destroy`)
    }

    static async verifyDataAuthority(data: IUserAuthority): Promise<AxiosResponse<IUserAuthorityResponse>> {
        return $api.get<IUserAuthorityResponse>("/user/verify", {
            params: data
        })
    }

    static async update(data: IUserInformation): Promise<AxiosResponse<IUserInformation>> {
        return $api.post<IUserInformation>("/user/update", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }

    static async searchCandidates(username: string): Promise<AxiosResponse<{users: IUserMin[], status: string}>> {
        return $api.get<{users: IUserMin[], status: string}>("/user/regex", {
            params: {
                username
            }
        })
    }

    static async getAlerts(): Promise<AxiosResponse<IAlert[]>> {
        return $api.get<IAlert[]>("/user/alerts/incoming")
    }
}

