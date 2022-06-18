// middleware for doing role-based permissions
const permit = function (...permittedRoles) {
    // return a middleware
    return (request, response, next) => {
        const { user } = request;
        console.log(permittedRoles);

        if (
            (user && permittedRoles.includes(user.role)) ||
            permittedRoles == []
        ) {
            next(); // role is allowed, so continue on the next middleware
        } else {
            response.status(403).json({ message: 'Forbidden' }); // user is forbidden
        }
    };
};

module.exports = permit;
