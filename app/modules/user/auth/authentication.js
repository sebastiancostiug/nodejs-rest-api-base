const jwt = require('jsonwebtoken');
const { User } = require('../../../database/models');

// middleware for authentication
async function authenticate(request, response, next) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return response.status(401).json({
            status: 'error',
            message: 'Token missing',
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, jwt) => {
        if (err) {
            return response.status(403).json({
                status: 'error',
                message: 'Token invalid',
            });
        }
        User.findOne({ where: { id: jwt.user } })
            .then((user) => {
                request.user = user;
                next();
            })
            .catch((error) => console.log(error));
    });
}

function generateToken(user, refresh = false) {
    if (refresh) return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    });
}

module.exports = {
    authenticate: authenticate,
    generateToken: generateToken,
};
