interface IPlayer {
    player: string
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
}