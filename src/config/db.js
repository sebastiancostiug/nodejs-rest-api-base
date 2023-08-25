const { Sequelize } = require('sequelize');
const dbconfig = require('./database.js');

const sequelize = new Sequelize(dbconfig.development);

module.exports = sequelize;
