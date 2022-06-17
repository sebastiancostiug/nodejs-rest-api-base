/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const UserController = require('../controller/userController');
const userController = new UserController();

/**
 * user Entity routes
 */
router.get('/count', function (request, response) {
    userController.countAll(response);
});

router.get('/exists/:id', function (request, response) {
    userController.exists(request, response);
});

router.get('/:id', function (request, response) {
    userController.findById(request, response);
});

router.get('/', function (request, response) {
    userController.findAll(response);
});

router.put('/:id', function (request, response) {
    userController.update(request, response);
});

router.post('/create', function (request, response) {
    userController.create(request, response);
});

router.delete('/:id', function (request, response) {
    userController.deleteById(request, response);
});

module.exports = router;
