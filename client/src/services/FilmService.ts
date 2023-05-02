import $api from "../http";
import {AxiosResponse} from 'axios';
import {IFilmComment} from "../models/IFilm"

export default class FilmService {
    static async addComment(fid:number, data:string): Promise<AxiosResponse<IFilmComment>> {
        return $api.put<IFilmComment>(`/film/${fid}/comment`, {data})
    }

    static async pushRating(fid:number, value:number): Promise<AxiosResponse<any>> {
        return $api.post<any>(`/film/rating/${fid}/push`, {
            value
        })
    }

    static async getComments(id:number, offset:number, limit:number): Promise<AxiosResponse<any>> {
        return $api.get<any>(`/film/${id}/comments?offset=${offset}&limit=${limit}`)
    }
}

