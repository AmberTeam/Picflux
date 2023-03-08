export interface IPlayer {
    url: string
    variant: number
    geo: string 
    err?: boolean 
    index: number 
    ps_index: number 
}

interface IImdbCfg {
    description: string 
    poster: string
    name: string 
}

export interface IFilm {
    id: number
    name: string
    year: string
    description: string
    countries: [string]
    duration: string
    genres: [string]
    poster: string
    language: number
    players: IPlayer[]
    watchLater?: any[]
    wlChangeCb?: () => void
    imdb_cfg: IImdbCfg | undefined | null
    imdb_translate_status: string
}