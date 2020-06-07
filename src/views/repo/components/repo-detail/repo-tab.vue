<template>
  <div class="repo-tab">
    <VueGroup :value="value" class="round" @update="handleChange">
      <VueGroupButton value="projects" class="round">Projects</VueGroupButton>
      <VueGroupButton value="tasks" class="round">Tasks</VueGroupButton>
      <VueGroupButton value="scripts" class="round">Scripts</VueGroupButton>
    </VueGroup>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  props: ['value'],
  methods: {
    handleChange(value) {
      this.$emit('update', value);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/colors";
.repo-tab {
  padding-top: 10px;
  max-width: 950px;
  width: 100%;
  margin: 0 auto;
}
</style>
