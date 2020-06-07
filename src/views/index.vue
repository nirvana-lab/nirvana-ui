<template>
  <div id="app">
    <nv-header />
    <router-view v-if="ready" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      ready: false,
    };
  },
  created() {
    this.$store
      .dispatch('global/GET_USER')
      .then(() => {
        this.ready = true;
      })
      .catch(() => {
        this.$router.push({ name: 'login' });
      });
  },
};
</script>
<style lang="scss">
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
