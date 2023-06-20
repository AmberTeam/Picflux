module.exports = class FilmDto {
    id
    _id 
    language
    title 
    description 
    year 
    countries
    duration 
    genres
    poster 
    players
    rated 
    rated_value 
    rating 
    rating_average 
    is_in_watch_list

    constructor(model) {
        this.id = model.id 
        this._id = model._id
        this.language = model.language
        this.title  = model.title 
        this.description = model.description
        this.year = model.year
        this.countries = model.countries
        this.duration = model.duration 
        this.genres = model.genres
        this.poster = model.poster
        this.players = model.players
        this.rated = model.rated
        this.rated_value = model.rated_value
        this.rating  = model.rating
        this.rating_average = model.rating_average
        this.is_in_watch_list = model.is_in_watch_list
    }

}


