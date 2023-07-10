const userService = require('../service/user.service');
const mailService = require('../service/mail.service')
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api.error');
const {validation_err} = require("../utils/resconfig")
 
class UserController {
    
    async setTimestamp(req, res, next) { 
        try {
            const data = await userService.setTimestamp(req.user.id, Date.now())
            return res.status(200).json(data)
        } catch(e) {
            return next(e)
        }
    } 

    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return next(ApiError.CustomError({...validation_err, visible: true}))
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
            const token = await userService.logout(refreshToken, ddf === "true", req.user);
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
            res.redirect('http://localhost:3000-')
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

    async searchCandidates(req, res, next) {
        try {
            const {username} = req.query
            const candidates = await userService.searchCandidates(req.user.id, username)
            return res.status(200).json(candidates)
        } catch(e) {
            next(e)
        }
    }

    async subscribe(req, res, next) {
        try {
            const {id} = req.params 
            const data = await userService.subscribe(id, req.user)
            return res.status(200).json(data)
        } catch(e) {
            next(e)
        }
    }

    async unsubscribe(req, res, next) {
        try {
            const {id} = req.params 
            const data = await userService.unsubscribe(id, req.user.id)
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

    async getAlertsIncoming(req, res, next) {
        try {
            const alerts = await userService.getAlertsIncoming(req.user.id)
            return res.status(200).json(alerts)
        } catch(e) {
            next(e)
        }
    }

    async storeAlert(req, res, next) {
        try { 
            const {rid, tag} = req.body
            const alerts = await userService.storeAlert(req.user.id, rid, tag)
            return res.status(200).json(alerts)
        } catch(e) { 
            next(e)
        }
    }
}


module.exports = new UserController();
