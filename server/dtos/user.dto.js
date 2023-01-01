module.exports = class UserDto {
    email;
    avatar;
    id;
    isActivated;
    username;
    seelater
    friends

    constructor(model) {
        this.email = model.email; 
        this.avatar = `${process.env.API_URL}/${model.avatar}`
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.username = model.username
        this.seeLater = model.seeLater
        this.friends = model.seeLater
    }
}
