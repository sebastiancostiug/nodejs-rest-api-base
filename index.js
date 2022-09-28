/* Load config */
require('dotenv').config({
    path: './app/config/.env',
});

/* Load modules */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
};

/* Application routes */
const routes = require('./app/routes/router');

/* Init server listening */
const port = process.env.LISTEN_PORT;

app.use(cors(corsOptions));

/* Express configuration */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Router configuration */
app.use(routes);

app.listen(port, function () {
    console.log('Server listening on port : ' + port);
});
