const Sequelize = require('sequelize');
const db = require('../db');

const Git = db.define('git', {
  client_id: Sequelize.STRING(100),
  client_secret: Sequelize.STRING(100),
  callback: Sequelize.STRING(100),
}, {
  timestamps: false,
});

module.exports = Git;
