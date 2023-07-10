module.exports = class FilmDto {
    id
    title 
    description 
    countries
    duration 
    genres
    poster 
    rated 
    rated_value 
    rating 
    rating_average 
    is_in_watch_list
    startreleaseyear
    endreleaseyear
    ratingkp 
    ratingimdb
    ratingfilmcritics
    voteskp
    votesimdb
    votesfilmcritics
    type
    names 
    altname
    poster_preview
    externalkphd
    externalimdb
    externaltmdb

    constructor(model) {
        this.externalkphd = model.externalkphd
        this.externalimdb = model.externalimdb
        this.externaltmdb = model.externaltmdb
        this.type = model.type
        this.names = model.names 
        this.poster_preview = model.posterpreview
        this.altname = model.altname
        this.id = model.id 
        this.title  = model.title 
        this.description = model.description
        this.countries = model.countries
        this.duration = model.movielength
        this.genres = model.genres
        this.poster = model.poster
        this.rated = model.rated
        this.rated_value = model.rated_value
        this.rating  = model.rating
        this.rating_average = model.rating_average
        this.ratingkp = model.ratingkp
        this.ratingimdb = model.ratingimdb 
        this.ratingfilmcritics = model.ratingfilmcritics
        this.voteskp = model.voteskp 
        this.votesimdb = model.votesimdb 
        this.votesfilmcritics =  model.votesfilmcritics
        this.startreleaseyear = model.startreleaseyear
        this.endreleaseyear = model.endreleaseyear
        this.is_in_watch_list = model.is_in_watch_list
    }

}


