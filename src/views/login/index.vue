<template>
  <div class="login">
    <header class="login-header">Nirvana</header>
    <svg class='logo'>
      <use xlink:href="#icon-logo"></use>
    </svg>
    <div class="mb-30"></div>
    <div class="login-content">
      <vue-button class="black round" @click="handleLogin">Get Gitlab Authority</vue-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

axios.interceptors.response.use((response) => response, (err) => {
  if (err && err.response) {
    const errCheck = [400, 405, 403, 412, 500, 501, 502, 503, 504].some((errCode) => err.response.status === errCode);
    if (errCheck) {
      if (err.response.data.detail) {
        window.$message({ message: err.response.data.detail, type: 'error' });
      }
    }
  }
  return window.Promise.reject(err);
});

export default {
  name: 'Login',
  methods: {
    handleLogin() {
      axios.get('/api/sso').then(({ data }) => {
        if (data.url) window.open(data.url, '_self');
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  width: 300px;
  margin: 0 auto;
  text-align: center;
  padding: 50px 15px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -250px;
  border-radius: 6px;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
}
.login-header {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 15px;
  font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑, STHeiti, MingLiu;
}
.logo{
  width: 54px;
  height: 54px;
  margin-bottom: 10px;
  vertical-align: bottom;
  fill: #b35bb5;
  margin-right: 10px;
}
.login-notice{
  background-color: #eaeeef;
  padding: 10px;
  border-radius: 6px;
}
</style>
