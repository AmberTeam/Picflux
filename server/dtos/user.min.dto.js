module.exports = class UserMinDto {
    username 
    id 
    avatar 
    status

    constructor(model) {
        this.username = model.username 
        this.id = model.id 
        this.avatar = `${process.env.API_URL}/static/${model.avatar}`
        this.status = model.status
    }
}