const ApiError = require('../exceptions/api.error');
const {bad_request} = require("../utils/resconfig")

module.exports = function (err, req, res, next) {
    console.error(err);
    if (err instanceof ApiError) {
        return res.status(err.config.status).json(err.config)
    }
    return res.status(bad_request.status).json(ApiError.BadRequest().config)

};