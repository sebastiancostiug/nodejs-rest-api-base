/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* Installed modules */
const installedModules = require('../config/checkModules');

/* API Service routes */
router.use('/service', require('./api/serviceRoutes'));

/* Create routes for each installed module */
installedModules.forEach(function (moduleName, index) {
    router.use(
        '/' + moduleName,
        require('../modules/' + moduleName + '/routes/' + moduleName + 'Routes')
    );
});

/* ping */
router.use('/ping', function (request, response) {
    response.status(200).json({
        status: 'success',
        message: 'pong',
    });
});

/* catchall */
router.use(function (request, response) {
    response.status(404).json({
        status: 'error',
        message: 'Invalid route',
    });
});

module.exports = router;
