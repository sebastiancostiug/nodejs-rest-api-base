const installedModules = require('./checkModules');

const elements = [];

if (installedModules.includes('user')) {
    const users = require('../modules/user/auth/loadUsers');
    elements.push(users);

    // authenticate each request
    // will set `request.user`
    const authenticate = require('../modules/user/auth/authentication'); // middleware for doing authentication
    elements.push(authenticate);
}

module.exports = elements;
