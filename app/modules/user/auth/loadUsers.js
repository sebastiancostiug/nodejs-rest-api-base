// dummy middleware for db (set's request.db)
/* Load User Data Access Object */
const UserDao = require('../dao/userDao');

const loadUsers = function (request, _response, next) {
    // dummy db
    request.user = {
        request: request,
        // findByApiKey: async (token) => {
        //     return null;
        // },
    };

    next();
};

module.exports = loadUsers;
