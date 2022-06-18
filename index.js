/* Load modules */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const middleware = require('./app/config/middleware');

/* Init server listening */
const port = process.argv[2] || 5000;
app.listen(port, function () {
    console.log('Server listening on port : ' + port);
});

/* Express configuration */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// middleware.forEach(function (element, index) {
//     app.use(element);
// });

/* Router configuration */
app.use(require('./app/routes/router'));
