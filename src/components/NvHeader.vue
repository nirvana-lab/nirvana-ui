<template>
  <header class="main-header">
    <div class="main-header-content">
      <div class="space"></div>
      <div>
        <!-- <sui-icon color="orange" size="big" name="gitlab" /> -->
        <!-- <svg width="24" height="24" class="tanuki-logo mr-10 vb" viewBox="0 0 36 36">
          <path class="tanuki-shape tanuki-left-ear" fill="#e24329" d="M2 14l9.38 9v-9l-4-12.28c-.205-.632-1.176-.632-1.38 0z"></path>
          <path class="tanuki-shape tanuki-right-ear" fill="#e24329" d="M34 14l-9.38 9v-9l4-12.28c.205-.632 1.176-.632 1.38 0z"></path>
          <path class="tanuki-shape tanuki-nose" fill="#e24329" d="M18,34.38 3,14 33,14 Z"></path>
          <path class="tanuki-shape tanuki-left-eye" fill="#fc6d26" d="M18,34.38 11.38,14 2,14 6,25Z"></path>
          <path class="tanuki-shape tanuki-right-eye" fill="#fc6d26" d="M18,34.38 24.62,14 34,14 30,25Z"></path>
          <path class="tanuki-shape tanuki-left-cheek" fill="#fca326" d="M2 14L.1 20.16c-.18.565 0 1.2.5 1.56l17.42 12.66z"></path>
          <path class="tanuki-shape tanuki-right-cheek" fill="#fca326" d="M34 14l1.9 6.16c.18.565 0 1.2-.5 1.56L18 34.38z"></path>
        </svg> -->
        <svg class='logo'>
          <use xlink:href="#icon-logo"></use>
        </svg>
        <span class="main-header-logo">Nirvana</span>
      </div>
      <div class="space"></div>
      <VueAvatar class="mr-5" v-if="user.avatar_url" :src="user.avatar_url"/>
      <VueDropdown :label="user.name" buttonClass="flat" icon-right="keyboard_arrow_down">
        <VueDropdownButton @click="handleLogout">Logout</VueDropdownButton>
      </VueDropdown>
    </div>
  </header>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  name: 'NvHeader',
  computed: {
    user() {
      return this.$store.state.global.user;
    },
  },
  methods: {
    handleLogout() {
      Cookies.remove('token');
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style scoped lang="scss">
.main-header {
  padding: 0 15px;
  height: 50px;
  // color: #eee;
  position: relative;
  // background-color: #181d28;
}
.main-header-content {
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  border-style: solid;
  border-width: 0 0 1px;
  border-image-source: radial-gradient(
    circle at 50% 3%,
    rgba(193, 201, 209, 0.53),
    hsla(0, 0%, 100%, 0.2)
  );
  border-image-slice: 1;
}
.main-header-logo {
  font-size: 20px;
  font-weight: 500;
}
.logo{
  width: 24px;
  height: 24px;
  vertical-align: bottom;
  fill: #b35bb5;
  margin-right: 10px;
}
</style>
