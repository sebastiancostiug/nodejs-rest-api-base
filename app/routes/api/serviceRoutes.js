/* Load Modules */
const express = require('express');
const router = express.Router();

/**
 * user Entity routes
 */
router.get('/:action', function (req, res) {
    switch (req.params.action) {
        case 'install':
            let database = require('../../config/dbconfig');

            database.init();

            let statusCode = 200;
            let jsonResponse = {
                message: 'Database initiated',
            };

            break;
    }
    res.status(statusCode).json(jsonResponse);
});

module.exports = router;
