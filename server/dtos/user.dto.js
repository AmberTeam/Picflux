module.exports = class UserDto {
    email;
    avatar;
    id;
    isActivated;
    username;

    constructor(model) {
        this.email = model.email; 
        this.avatar = `${process.env.API_URL}/static/${model.avatar}`
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.username = model.username
    }
}
