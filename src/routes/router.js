/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* Installed modules */
const installedModules = require('../config/checkModules');

/* API routes */
router.use('/service', require('./api/serviceRoutes'));

/* Create routes for each installed module */
installedModules.forEach(function (moduleName, index) {
    router.use(
        '/' + moduleName,
        require('../modules/' + moduleName + '/routes/' + moduleName + 'Routes')
    );
});

/* catchall */
router.use(function (request, response) {
    response.status(404).json({
        status: 'error',
        message: 'Invalid route',
    });
});

module.exports = router;
