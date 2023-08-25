const models = require('../../../database/models');
const User = models.User;

checkEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    }).then((user) => {
        if (user) {
            res.status(400).send({
                status: 'error',
                message: 'Email already registered',
            });
            return;
        }

        next();
    });
};

module.exports = {
    checkEmail: checkEmail,
};
