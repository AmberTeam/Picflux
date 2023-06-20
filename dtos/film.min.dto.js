module.exports = class FilmMinDto {
    id
    title
    year
    countries
    duration
    genres
    poster
    is_in_watch_list
     
    constructor(model) {
        this.id = model.id 
        this.title= model.title
        this.year = model.year 
        this.countries = model.countries
        this.duration = model.duration
        this.genres = model.genres
        this.poster = model.poster 
        this.is_in_watch_list = model.is_in_watch_list
    }

}