/* Load Modules */
const express = require('express');
const router = express.Router();
const installedModules = require('../../config/checkModules');
/**
 * user Entity routes
 */
router.get('/:action', function (request, response) {
    let statusCode = 500;
    let jsonResponse = {
        message: 'Server error',
    };

    switch (request.params.action) {
        case 'install':
            let database = require('../../config/dbconfig');

            database.init();

            statusCode = 200;
            jsonResponse = {
                message: 'Database initiated',
            };

            break;
    }
    response.status(statusCode).json(jsonResponse);
});

module.exports = router;
