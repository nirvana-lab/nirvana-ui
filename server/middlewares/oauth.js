const GitService = require('../services/GitService');

const oauth = () => async (ctx, next) => {
  const { code } = ctx.query;
  const token = ctx.cookies.get('token');
  if (code && !token) {
    const res = await GitService.getGitToken(code);
    ctx.cookies.set('token', res.data.access_token, { httpOnly: false });
    ctx.redirect('/');
  }
  await next();
};

module.exports = oauth;
