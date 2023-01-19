const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    avatar: {type: String, unique: false, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    username: { type: String, unique: true, required: true },
    watchLater: { type: Array, default: [] },
    friends: { type: Array, default: [] }
})

module.exports = model('User', UserSchema);
