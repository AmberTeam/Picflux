const ApiError = require('../exceptions/api.error');
const tokenService = require('../service/token.service');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            console.log("dropped authorization cause !authorizationToken")
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            console.log("dropped authorization cause !accessToken")
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            console.log("dropped authorization cause !userData")
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        console.error(e)
        console.log("dropped authorization cause error")
        return next(ApiError.UnauthorizedError());
    }
};
