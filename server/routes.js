const Router = require('koa-router');
const GitController = require('./controllers/GitController');
const RepoController = require('./controllers/RepoController');

const forums = new Router();


forums.use('/api', GitController.routes(), GitController.allowedMethods());
forums.use('/api', RepoController.routes(), RepoController.allowedMethods());
exports.routes = () => forums.routes();
exports.allowedMethods = () => forums.allowedMethods();
