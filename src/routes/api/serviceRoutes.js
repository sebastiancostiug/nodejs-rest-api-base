/* Load Modules */
const express = require('express');
const router = express.Router();
/* Load controller */
const ServiceController = require('../../controller/serviceController');
const serviceController = new ServiceController();

let authenticate = (request, response, next) => next();
let permit = () => {
    return (request, response, next) => next();
};

/**
 * If User table exists and is populated and user module is present,
 * The user should be authenticated and authorized
 */
const installedModules = require('../../config/checkModules');
if (installedModules.includes('user')) {
    authenticate =
        require('../../modules/user/auth/authentication').authenticate;
    permit = require('../../modules/user/auth/authorization');
}

/**
 * service  routes
 */
router.get('/install', (request, response) => {
    serviceController.install(request, response);
});

router.post(
    '/migrate-up',
    [authenticate, permit('admin')],
    (request, response) => {
        serviceController.migrateUp(request, response);
    }
);

module.exports = router;
