module.exports = class FilmDto {
    id 
    name  
    year   
    description   
    countries  
    duration   
    genres 
    poster
    language 
    players
     
    constructor(model) {
        this.id = model.id 
        this.name = model.name 
        this.year = model.year 
        this.description = model.description 
        this.countries = JSON.parse(model.countries) 
        this.duration = model.duration
        this.genres = JSON.parse(model.genres) 
        this.poster = model.poster 
        this.language = model.language 
        this.players = JSON.parse(model.Players)
    }

}