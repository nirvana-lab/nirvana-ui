const compose = require('koa-compose');

// const proxy = require('./proxy');
const { accessLogger } = require('./logger');
const oauth = require('./oauth');

const middleware = () => compose([
  oauth(),
  accessLogger(),
  // ...proxy,
]);
module.exports = middleware;
