const axios = require('axios');

const getUser = (headers) => axios.get(`${process.env.GIT}/api/v4/user`, { headers });

module.exports = {
  getUser,
};
