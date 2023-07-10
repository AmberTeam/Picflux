module.exports = class FilmMinDto {
    id
    title
    shortdescription
    startreleaseyear
    endreleaseyear
    countries
    duration
    ratingkp 
    ratingimdb
    ratingfilmcritics
    voteskp
    votesimdb
    votesfilmcritics
    type
    altname 
    genres
    poster
    is_in_watch_list
     
    constructor(model) {
        this.id = model.id 
        this.title= model.title
        this.shortdescription = model.shortdescription
        this.ratingkp = model.ratingkp
        this.ratingimdb = model.ratingimdb 
        this.ratingfilmcritics = model.ratingfilmcritics
        this.voteskp = model.voteskp 
        this.votesimdb = model.votesimdb 
        this.votesfilmcritics =  model.votesfilmcritics
        this.startreleaseyear = model.startreleaseyear
        this.endreleaseyear = model.endreleaseyear
        this.countries = model.countries
        this.duration = model.movielength
        this.genres = model.genres
        this.poster = model.poster 
        this.is_in_watch_list = model.is_in_watch_list
    }

}