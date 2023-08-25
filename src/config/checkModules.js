const fs = require('fs');
let modules = fs.readdirSync('./src/modules');

module.exports = modules;
