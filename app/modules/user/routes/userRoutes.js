/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const UserController = require('../controller/userController');
const userController = new UserController();

/* Load use authorization */
const permit = require('../auth/authorization');

/**
 * user Entity routes
 */
router.get('/:id', permit('user'), function (request, response) {
    userController.findById(request, response);
});

router.get('/', permit('user'), function (request, response) {
    userController.findAll(response);
});

router.put('/:id', permit('user'), function (request, response) {
    userController.update(request, response);
});

router.post('/create', permit('admin'), function (request, response) {
    userController.create(request, response);
});

router.delete('/:id', permit('admin'), function (request, response) {
    userController.deleteById(request, response);
});

module.exports = router;
