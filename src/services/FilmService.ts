import $api from "../http";
import { AxiosResponse } from "axios";
import { IFilmComment } from "../interfaces/IFilm";

interface IPushRatingResponse {
    status: string
}

interface IGetCommentsResponse {
    comments: IFilmComment[],
    can_load: boolean
}

export default class FilmService {
    static async addComment(fid: string, data: string): Promise<AxiosResponse<IFilmComment>> {
        return $api.put<IFilmComment>(`/film/${fid}/comment`, { data });
    }

    static async pushRating(fid: number, value: number): Promise<AxiosResponse<IPushRatingResponse>> {
        return $api.post<IPushRatingResponse>(`/film/rating/${fid}/push`, {
            value
        });
    }

    static async getComments(id: string, offset: number, limit: number): Promise<AxiosResponse<IGetCommentsResponse>> {
        return $api.get<IGetCommentsResponse>(`/film/${id}/comments?offset=${offset}&limit=${limit}`);
    }
}

