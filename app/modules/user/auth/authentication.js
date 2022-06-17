const checkAuthData = require('./checkAuthData');
const UserDao = require('../dao/userDao');

// middleware for authentication
async function authorize(request, _response, next) {
    let authData = checkAuthData.headers(request.headers);
    if (!authData) {
        authData = checkAuthData.body(request.body);
    }
    let user;
    if (authData.type == 'basic') {
        const userDao = new UserDao();
        user = await userDao.findByEmail(authData.email);
    } else if (authData.type == 'token') {
    }
    // set user on-success
    request.user = user;

    // always continue to next middleware
    next();
}

module.exports = authorize;
