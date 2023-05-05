const {Schema, model} = require('mongoose');
const UserSchema = new Schema({
    email: {type: String, unique: true, required: false},
    avatar: {type: String, unique: false, required: true},
    password: {type: String, required: false},
    tg_username: {type: String, required: false, unique: false ,default: null},
    tg_id: {type: String, required: false, unique: false, default: null},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String, default: null},
    username: { type: String, unique: true, required: true},
    watchLater: { type: Array, default: [] },
    friends: { type: Array, default: [] },
    biography: {type: String, required: false, default: ""},
    last_active: { type: String, default: null },
})

module.exports = model('User', UserSchema);
