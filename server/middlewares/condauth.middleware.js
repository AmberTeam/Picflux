const ApiError = require('../exceptions/api.error');
const tokenService = require('../service/token.service');

module.exports = function (req, res, next) {
    try {
        if(!req.headers.authorization.includes('null')) {
            const authorizationHeader = req.headers.authorization
            const accessToken = authorizationHeader.split(' ')[1];
    
            const userData = tokenService.validateAccessToken(accessToken);
            
            if (!userData) return next()
    
            req.user = userData;
            
            return next()
        } else {
            return next();
        }
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};
