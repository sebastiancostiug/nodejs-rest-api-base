const checkAuthData = require('./checkAuthData');

// middleware for authentication
async function authorize(request, _response, next) {
    let authData = checkAuthData.headers(request.headers);
    if (!authData) {
        authData = checkAuthData.body(request.body);
    }
    let user;
    if (authData.type == 'basic') {
    } else if (authData.type == 'token') {
    }
    // set user on-success
    request.user = user;

    // always continue to next middleware
    next();
}

module.exports = authorize;
