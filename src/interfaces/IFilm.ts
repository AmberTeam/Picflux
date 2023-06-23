import IRating from "./IRating";
import { IUserMin } from "./IUser";

export interface IPlayer {
    url: string
    geo: string
}


export interface IFilmComment {
    data: string
    user: IUserMin
    datef_ms: string
    datef_v: string
    id: number
    fid: number
    uid: string
}

export interface IIMDBCredit {
    name: string
    pic: string
    role: string
}

export interface IIMDBTranslate {
    status: string
    origin: string
    origin_cr: string
    poster: string
    lang: string
    title: string
    description: string
    credits: IIMDBCredit[]
}

export interface IFilm {
    id: number
    title: string
    year: string
    description: string
    countries: [string]
    duration: string
    genres: [string]
    poster: string
    language: number
    players: string[]
    is_in_watch_list: boolean
    wlChangeCb?: () => void
    comments: IFilmComment[]
    imdb_translate?: IIMDBTranslate
    rated?: boolean
    rating?: IRating[]
    rating_average?: number
    rated_value?: number
}

export interface IFilmSearchResponse {
    films: IFilm[]
    can_load: boolean
}