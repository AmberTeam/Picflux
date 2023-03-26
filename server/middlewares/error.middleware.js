const ApiError = require('../exceptions/api.error');

module.exports = function (err, req, res, next) {
    console.error(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({config: err.config, errors: err.errors})
    }
    return res.status(500).json(err)

};