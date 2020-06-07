const Router = require('koa-router');

const { logger } = require('../middlewares/logger');
const GitService = require('../services/GitService');

const GitController = new Router();
GitController.get('/sso', async (ctx) => {
  try {
    const data = await GitService.getGit();
    ctx.body = data;
  } catch (err) {
    logger.error(err);
  }
});
GitController.put('/sso', async (ctx) => {
  try {
    await GitService.initGit(ctx.request.body);
    ctx.body = { message: '更新成功' };
  } catch (err) {
    logger.error(err);
    ctx.throw(500);
    ctx.body = { message: '更新失败' };
  }
});

module.exports = GitController;
