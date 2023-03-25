import $api from "../http";
import {AxiosResponse} from 'axios';
import {IFilmComment} from "../models/IFilm"

export default class FilmService {
    static async addComment(fid:number, data:string): Promise<AxiosResponse<IFilmComment>> {
        return $api.put<IFilmComment>(`/film/${fid}/comment`, {data})
    }
}

