const {bad_request, unauthorized} = require("../utils/resconfig")

module.exports = class ApiError {
    config

    constructor(model) {
        this.config = model
    }

    static UnauthorizedError() {
        return new ApiError(unauthorized)
    } 

    static BadRequest(ex_args={}) {
        return new ApiError({...bad_request, ...ex_args})
    }

    static CustomError(model) {
        return new ApiError(model)
    }
}