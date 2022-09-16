/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const UserController = require('../controller/userController');
const userController = new UserController();

/**
 * user authentication routes
 */
router.post('/register', (request, response) => {
    userController.create(request, response);
});

router.post('/login', (request, response) => {
    userController.login(request, response);
});

router.delete('/logout', (request, response) => {
    userController.logout(request, response);
});

router.post('/refresh', (request, response) => {
    userController.refresh(request, response);
});

module.exports = router;
