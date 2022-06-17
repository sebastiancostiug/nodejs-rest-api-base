const fs = require('fs');
let modules = fs.readdirSync('./app/modules');

module.exports = modules;
