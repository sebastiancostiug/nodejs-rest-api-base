/* Load modules */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/* Installed modules */
const installedModules = require('./app/config/checkModules');
/* User authentication */
const authenticate = require('./app/modules/user/auth/authentication') || null;

/* Init server listening */
const port = process.argv[2] || 5000;
app.listen(port, function () {
    console.log('Server listening on port : ' + port);
});

/* Express configuration */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* If user module is present user should be authenticated */
if (installedModules.includes('user')) {
    app.use(authenticate);
}

/* Router configuration */
app.use(require('./app/routes/router'));
