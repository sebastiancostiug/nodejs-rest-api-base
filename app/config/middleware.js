const installedModules = require('./checkModules');

const elements = [];

if (installedModules.includes('user')) {
    const authenticate = require('../modules/user/auth/authentication');
    elements.push(authenticate);
    const permit = require('../modules/user/auth/authorization');
    elements.push(permit);
}

module.exports = elements;
