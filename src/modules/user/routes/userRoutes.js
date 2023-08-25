/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const UserController = require('../controller/userController');
const userController = new UserController();

/* Load use auth methods */
const { authenticate } = require('../auth/authentication');
const permit = require('../auth/authorization');
const { checkEmail } = require('../auth/validation');

/**
 * user authentication routes
 */
router.post('/register', checkEmail, (request, response) => {
    userController.create(request, response);
});

router.post('/login', (request, response) => {
    userController.login(request, response);
});

router.delete(
    '/logout',
    [authenticate, permit('user')],
    (request, response) => {
        userController.logout(request, response);
    }
);

router.post('/refresh', (request, response) => {
    userController.refresh(request, response);
});

/**
 * user Entity routes
 */
router.get(
    '/:id',
    [authenticate, permit('user')],
    function (request, response) {
        userController.findById(request, response);
    }
);

router.get('/', [authenticate, permit('user')], (request, response) => {
    userController.findAll(response);
});

router.put('/:id', [authenticate, permit('user')], (request, response) => {
    userController.update(request, response);
});

router.post('/create', [authenticate, permit('admin')], (request, response) => {
    userController.create(request, response);
});

router.delete('/:id', [authenticate, permit('admin')], (request, response) => {
    userController.deleteById(request, response);
});

module.exports = router;
