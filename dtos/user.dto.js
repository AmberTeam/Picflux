module.exports = class UserDto {
    avatar;
    id;
    username;
    status;
    friends
    subscribed
    biography

    constructor(model) {
        this.avatar = `${process.env.API_URL}/static/${model.avatar}`
        this.id = model._id;
        this.username = model.username
        this.status = model.status
        this.friends = model.friends
        this.subscribed = model.subscribed
        this.biography = model.biography
    }
}
