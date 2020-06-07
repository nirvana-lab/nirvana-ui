<template>
  <div class="repo-tab">
    <VueGroup v-if="$route.query.file" :value="choice" class="mb-10 round" @update="handleChange">
      <VueGroupButton value="RepoDoc" class="round">Swagger</VueGroupButton>
      <!-- <VueGroupButton value="RepoTask" class="round">Tasks</VueGroupButton> -->
      <!-- <VueGroupButton value="RepoScript" class="round">Scripts</VueGroupButton> -->
      <VueGroupButton value="RepoVariable" class="round">Variables</VueGroupButton>
    </VueGroup>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  data() {
    return {
    };
  },
  computed: {
    choice() { return this.$route.name; },
  },
  methods: {
    handleChange(value) {
      this.$router.push({ name: value, params: this.$route.params, query: this.$route.query });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/colors";
.repo-tab {
  padding-top: 15px;
  max-width: 950px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
  border-style: solid;
  border-width: 0 0 1px;
  border-image-source: radial-gradient(
    circle at 50% 3%,
    rgba(193, 201, 209, 0.53),
    rgba(255, 255, 255, 0.2)
  );
  border-image-slice: 1;
}
</style>
