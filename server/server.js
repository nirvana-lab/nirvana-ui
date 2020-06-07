// eslint-disable-next-line no-console
console.log(`
 _____  _  _   _____           _
|   __||_|| |_|_   _|___  ___ | |_
|  |  || ||  _| | | | -_||_ -||  _|
|_____||_||_|   |_| |___||___||_|
`);

const Koa = require('koa');
const path = require('path');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');

const history = require('koa-connect-history-api-fallback');
const { logger } = require('./middlewares/logger');
const middlewares = require('./middlewares');
const proxy = require('./middlewares/proxy');
const router = require('./routes');

const app = new Koa();
const port = process.env.PORT || 80;
app.use(proxy());
app.use(bodyParser());

app
  .use(router.routes())
  .use(router.allowedMethods());
app.use(middlewares());

app.use(history());
app.use(koaStatic(path.resolve(__dirname, '..', 'dist')));
app.listen(port, (err) => {
  if (err) { logger.error(err); }
  logger.info('server run at', port);
});
