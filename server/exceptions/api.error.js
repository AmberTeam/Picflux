module.exports = class ApiError {
    status;
    errors;
    config;

    constructor(status, config, errors = []) {
        this.config = config;
        this.status = status;
        this.errors = errors;
    }

    static econfig = {
        bad_request: {code: "x1", alt: "Unknown error. Please check that the data you entered is correct."},
        unauthorized: {code: "x2", alt: "The user is not authorized. Access closed."},
        validation_err: {code: "x3", alt: "Validation failed. Please, enter correct data."},
        user_already_created: {code: "x4", alt: "A user with similar data is already registered in the system."},
        incorrect_alink: {code: "x5", alt: "Outdated or corrupted activation link."}
    }


    static UnauthorizedError() {
        return new ApiError(401, 'Unauthorized')
    } 

    static BadRequest(config, errors = []) {
        return new ApiError(400, config, errors); 
    }
}