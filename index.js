/* Load config */
require('dotenv').config();

/* Load modules */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/* Application routes */
const routes = require('./app/routes/router');
/* Installed modules */
const installedModules = require('./app/config/checkModules');
/* User authentication */
const { authenticate } =
    require('./app/modules/user/auth/authentication') || null;

/* Init server listening */
const port = process.env.LISTEN_PORT;

app.listen(port, function () {
    console.log('Server listening on port : ' + port);
});

/* Express configuration */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* If user module is present and authentication method is defined, user should be authenticated */
if (installedModules.includes('user') && authenticate) {
    //Authentication routes
    app.use(require('./app/modules/user/routes/authRoutes'));
    //Authentication middleware
    app.use(authenticate);
}

/* Router configuration */
app.use(routes);
