const url = require('url');
const axios = require('axios');
const Git = require('../models/Git');

const getGit = () => Git.findOne({
  attributes: ['client_id', 'client_secret', 'callback'],
}).then((data) => (!data ? {} : {
  url: url.format({
    host: process.env.GIT,
    query: { client_id: data.client_id, redirect_uri: data.callback, response_type: 'code' },
    pathname: '/oauth/authorize',
  }),
}));

const getGitToken = (code) => Git.findOne({
  attributes: ['client_id', 'client_secret', 'callback'],
}).then((data) => axios.post(url.format({ host: process.env.GIT, pathname: '/oauth/token' }), {
  client_id: data.client_id,
  client_secret: data.client_secret,
  code,
  grant_type: 'authorization_code',
  redirect_uri: data.callback,
}));

const initGit = ({ id, secret, callback }) => Git.findOne({
  attributes: ['client_id', 'client_secret', 'callback'],
}).then((result) => {
  if (!result) return Git.create({ client_id: id, client_secret: secret, callback });
  return Git.update(
    { client_id: id, client_secret: secret, callback },
    { where: { client_id: result.client_id } },
  );
});

module.exports = {
  getGit,
  getGitToken,
  initGit,
};
