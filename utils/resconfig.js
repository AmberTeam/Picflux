
module.exports = Object.freeze({
    bad_request: {
        status: 400,
        message: "Unknown error. Please check that the data you entered is correct.", 
        code: "x1"
    },
    unauthorized: {
        status: 401,
        message: "The user is not authorized. Access closed.",
        code: "x2"
    },
    validation_err: {
        status: 400,
        message: "Validation failed. Please, enter correct data.",
        code: "x3"
    },
    user_already_created: {
        status: 400,
        message: "A user with similar data is already registered in the system.", 
        code: "x4"
    },
    incorrect_alink: {
        status: 400,
        message: "Outdated or corrupted activation link.", 
        code: "x5"
    }, 
    ok: {
        status: 200, 
        message: "Succeed."
    }
})