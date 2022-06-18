/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

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

/* root route should be used just to chek that the API is woking correctly */
router.use('/', function (request, response) {
    response.status(200).json({
        status: 'success',
        message: 'API WORKING FINE!',
    });
});

module.exports = router;
