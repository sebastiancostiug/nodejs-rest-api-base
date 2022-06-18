const checkAuthData = require('./checkAuthData');
const { User } = require('../../../database/models');
const bcrypt = require('bcrypt');

// middleware for authentication
async function authorize(request, _response, next) {
    let authData = checkAuthData.headers(request.headers);
    if (!authData) {
        authData = checkAuthData.body(request.body);
    }

    let user;
    if (!authData) {
        user = null;
    } else if (authData.type === 'basic') {
        let searchUser = await User.findOne({
            where: { email: authData.email },
        });
        if (
            searchUser &&
            bcrypt.compareSync(authData.password, searchUser.password_hash)
        ) {
            user = searchUser;
        }
    } else if (authData.type === 'token') {
        user = await User.findOne({
            where: { token: authData.token },
        });
    }
    // set user on-success
    request.user = user;

    // always continue to next middleware
    next();
}

module.exports = authorize;
