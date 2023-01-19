const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const tokenService = require('./token.service');
const UserDto = require('../dtos/user.dto');
const ApiError = require('../exceptions/api.error');
const rid = require("random-id");
const sqlite = require('sqlite3')

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(ApiError.econfig.user_already_created)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

        const user = await UserModel.create({email, password: hashPassword, activationLink, avatar: "user64.png", username: `user_${rid(8, 'aA0')}`})

        const userDto = new UserDto(user); // id, email, isActivated
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest(ApiError.econfig.incorrect_alink)
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest(ApiError.econfig.bad_request)
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest(ApiError.econfig.bad_request);
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken, ddf, user) {
        if(ddf == true) await UserModel.deleteOne({email: user.email})
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async update(user, txt, password, avatar = null) {

    }

    async getUserBId(id, own) {
        const userData = await UserModel.findById(id)
        const userDto = new UserDto(userData)
        if(own) {
            const watchLater = []
            const promices = []
            userData.watchLater.map(fid => {
                const pr = new Promise(function(resolve, reject) {
                    const db = new sqlite.Database("ifdb.db")
                    db.get("SELECT * FROM films WHERE id = ?", [fid], async (err, row) => {
                        row.players = JSON.parse(row.players)
                        row.genres = JSON.parse(row.genres),
                        row.countries = JSON.parse(row.countries)
                        resolve(row)
                    }) 
                })
                promices.push(pr)
            })
            await Promise.all(promices).then(values => values.map(val => watchLater.push(val)))
            return {
                ...userDto,
                watchLater
            }
        }

        return userDto
    }
}

module.exports = new UserService();
