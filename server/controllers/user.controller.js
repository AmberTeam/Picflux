const userService = require('../service/user.service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api.error');

class UserController {
    
    async setTimestamp(req, res, next) {
        try {
            const data = await userService.setTimestamp(req.user.id, Date.now())
            return res.status(200).json(data)
        } catch(e) {
            console.log(e)
        }
    }

    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return next(ApiError.BadRequest(ApiError.econfig.validation_err, errors.array()))
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const {ddf} = req.body
            const token = await userService.logout(refreshToken, JSON.parse(ddf), req.user);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUserBId(req, res, next) {
        try {
            const {id} = req.params
            const user = await userService.getUserBId(id, (req.user && req.user.id === id) && req.query.crr ? true : false, req.user.id)
            return res.status(200).json(user)
        } catch(e) {
            next(e)
        }
    }

    async subscribe(req, res, next) {
        try {
            const {id} = req.params 
            const data = await userService.subscribe(id, req.user.id)
            return res.status(200).json(data)
        } catch(e) {
            next(e)
        }
    }

    async describe(req, res, next) {
        try {
            const {id} = req.params 
            const data = await userService.describe(id, req.user.id)
            return res.status(200).json(data)
        } catch(e) {
            next(e)
        }
    }

    async verify(req, res, next) {
        try {
            if(req.query.username === req.user.username) return res.json({username:0})
            const data = await userService.verify(req.query)
            return res.json(data)
        } catch(e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const {username, biography} = req.body
            const data = await userService.update(req.user.id, {username, biography, avatar: req.files ? req.files.avatar : null})
            return res.status(200).json(data)
        } catch(e) {
            next(e)
        }
    }
}


module.exports = new UserController();
