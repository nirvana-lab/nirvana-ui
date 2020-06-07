const Router = require('koa-router');

const { logger } = require('../middlewares/logger');
const RepoService = require('../services/RepoService');

const RepoController = new Router();
RepoController.get('/repos', async (ctx) => {
  try {
    const data = await RepoService.getRepos(ctx);
    ctx.body = data;
  } catch (err) {
    logger.error(err);
  }
});

RepoController.post('/repo', async (ctx) => {
  try {
    await RepoService.postRepo(ctx);
    ctx.body = { message: '创建成功' };
  } catch (err) {
    logger.error(err);
  }
});

RepoController.delete('/repo/:id', async (ctx) => {
  try {
    await RepoService.deleteRepo(ctx);
    ctx.body = { message: '删除成功' };
  } catch (err) {
    logger.error(err);
  }
});

RepoController.get('/task/:id', async (ctx) => {
  try {
    const data = await RepoService.getTaskRun(ctx);
    ctx.body = data;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = err;
    logger.error(err);
  }
});
module.exports = RepoController;
