const axios = require('axios');
const Repo = require('../models/Repo');
const { getUser } = require('./UserService');

const getGitRepo = (headers, id) => axios.get(`${process.env.GIT}/api/v4/projects/${id}`, { headers });

const getRepos = async (ctx) => {
  const headers = { authorization: `Bearer ${ctx.cookies.get('token')}` };
  const user = await getUser(headers);
  const repoMap = await Repo.findAll({
    attributes: ['repo'],
    where: { user: user.data.id },
  });
  const data = await Promise.all(
    repoMap.map((repo) => getGitRepo(headers, repo.repo)
      .then((res) => res.data)
      .catch(() => ({
        id: repo.repo, name: 'Deprecated', visibility: 'deleted', namespace: { full_path: '-' },
      }))),
  );
  return data;
};

const postRepo = async (ctx) => {
  const headers = { authorization: `Bearer ${ctx.cookies.get('token')}` };
  const { data: user } = await getUser(headers);
  const repos = await Repo.findAll({
    raw: true,
    where: { user: user.id, repo: ctx.request.body.id },
  });
  if (!repos.length) {
    await Repo.create({ user: user.id, repo: ctx.request.body.id });
  }
};

const deleteRepo = async (ctx) => {
  const headers = { authorization: `Bearer ${ctx.cookies.get('token')}` };
  const { data: user } = await getUser(headers);
  await Repo.destroy({ where: { user: user.id, repo: ctx.params.id } });
};

const getTaskRun = async (ctx) => {
  const headers = { authorization: `Bearer ${ctx.cookies.get('token')}` };
  const { data } = await axios.get(`${process.env.TEST}/api/testsuits/${ctx.params.id}/run`, { headers });
  const html = await axios.get(`${process.env.TEST}/report/${data.data.report_path}`);
  // eslint-disable-next-line quotes
  const css = `html{line-height:1.15;-webkit-text-size-adjust:100%;}h1{font-size:2em;margin:0.67em 0;display:none;}h2{font-size:18px;margin-bottom:10px;}h3{margin-bottom:10px;font-size:14px;}body{margin:0;font-size:13px;font-family:PingFang SC,Helvetica Neue,Helvetica,Arial,Microsoft YaHei,微软雅黑,STHeitiSC-Light,simsun,宋体,WenQuanYi Zen Hei,WenQuanYi Micro Hei,sans-serif;color:#37474f;}table{font-size:13px;}#summary{width:100%;margin-bottom:20px;}#summary th{background-color:rgba(193,201,209,0.6);padding:3px 10px;}#summary td{background-color:#eaeeef;text-align:center;padding:4px 8px;}.details{width:100%;margin-bottom:20px;}.details th{background-color:rgba(193,201,209,0.6);padding:3px 10px;}.details tr .passed{color:#fff;background-color:#56cd96;}.details tr .failed{color:#fff;background-color:#f44747;}.details tr .unchecked{background-color:gray;}.details td{background-color:#eaeeef;padding:3px 10px;}.details .detail{font-size:smaller;padding:5px 10px;line-height:20px;text-align:left;}.details .success{color:#fff;background-color:#56cd96;}.details .error{color:#fff;background-color:#f44747;}.details .failure{color:#fff;background-color:#ff6565;}.details .skipped{background-color:gray;}.button{padding:0px 8px;background-color:#2d3444;border-radius:4px;cursor:pointer;transition:all 0.3s ease-out;}a.button{color:#fff;text-decoration:none;display:inline-block;}.button:hover{background:#566381;}.overlay{position:fixed;top:0;bottom:0;left:0;right:0;transition:opacity 500ms;visibility:hidden;opacity:0;line-height:25px;}.overlay:target{visibility:visible;opacity:1;}.popup{padding:20px;background:#fff;border-radius:10px;position:relative;transition:all 1s ease-in-out;}.popup h2{margin-top:0;}.popup .close{position:absolute;top:20px;right:30px;transition:all 200ms;font-size:30px;font-weight:bold;text-decoration:none;color:#333;}.popup .close:hover{color:#56cd96;}.popup .content{max-height:80%;overflow:auto;text-align:left;}.popup .separator{color:royalblue}@media screen and (max-width:700px){.box{width:70%;}.popup{width:70%;}}`;
  return html.data.toString().replace(/(?<=<style>)[^<]+(?=<\/style>)/, css);
};

module.exports = {
  getRepos,
  postRepo,
  deleteRepo,
  getTaskRun,
};
