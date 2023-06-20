module.exports = class UserDto {
    avatar;
    id;
    username;
    status;
    friends
    subscribed
    biography
    watch_later

    constructor(model) {
        this.avatar = `${process.env.API_URL}/static/${model.avatar}`
        this.id = model.id;
        this.username = model.username
        this.status = model.status
        this.friends = model.friends
        this.subscribed = model.subscribed
        this.biography = model.biography
        this.watch_later = model.watch_later
    }
}
