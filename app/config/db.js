const { Sequelize } = require('sequelize');
const dbconfig = require('./database.json');

const sequelize = new Sequelize(dbconfig.development);

module.exports = sequelize;
