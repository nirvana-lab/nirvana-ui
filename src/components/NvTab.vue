<template>
  <div class="main-tab">
    <VueGroup v-model="choice" class="mb-10 round">
      <VueGroupButton value="文档" class="round">文档</VueGroupButton>
      <VueGroupButton value="任务" class="round">任务</VueGroupButton>
      <VueGroupButton value="文档变量" class="round">文档变量</VueGroupButton>
    </VueGroup>
    <!-- <vue-button class="round black">文档</vue-button>
    <vue-button class="round">文档变量</vue-button>
    <vue-button class="round">全局变量</vue-button> -->
    <!-- <div class="tab-item active">文档</div>
    <div class="tab-item">文档变量</div>
    <div class="tab-item">全局变量</div> -->
  </div>
</template>

<script>
export default {
  name: 'NvTab',
  data() {
    return {
      choice: '文档',
    };
  },
  computed: {
    user() {
      return this.$store.state.global.user;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/colors";
.main-tab {
  z-index: 1;
  position: sticky;
  top: 0px;
  padding-top: 15px;
  background-color: #eff4f8;
  max-width: 950px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 25px;
  border-style: solid;
  border-width: 0 0 1px;
  border-image-source: radial-gradient(
    circle at 50% 3%,
    rgba(193, 201, 209, 0.53),
    rgba(255, 255, 255, 0.2)
  );
  border-image-slice: 1;
}
.tab-item {
  display: inline-block;
  font-weight: 500;
  min-width: 60px;
  text-align: center;
  cursor: pointer;
  padding: 10px 2px;
  margin-right: 20px;
  opacity: 0.4;
  border-bottom: 3px solid transparent;
  &:hover {
    opacity: 1;
  }
  &.active {
    opacity: 1;
    border-color: $vue-ui-warning-500;
  }
}
</style>
