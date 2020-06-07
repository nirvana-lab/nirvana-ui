<template>
  <div class="test-cases">
    <vue-button class="round r" @click="handleCreateCase" label="Create" />
    <vue-input
      placeholder="Search..."
      class="flat purple db mb-10"
      icon-left="search"
      v-model.trim="search"
    />
    <vue-loading class="pt-5" v-if="loading"/>
    <div
      class="test-case"
      :class="{ 'active': parseInt($route.params.test, 10) === parseInt(i.id, 10) }"
      @click="handleGetCase(i.id)"
      v-for="i in filterCases"
      :key="i.id"
    >
      <div class="title">{{ i.case }}</div>
      <div class="sm secondary mt-5">{{ i.description || "-" }}</div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleGetCase(id) {
      const { params, query } = this.$route;
      this.$router.push({
        name: 'RepoTestEdit',
        params: {
          ...params,
          test: id,
        },
        query,
      });
    },
    handleCreateCase() {
      const { params, query } = this.$route;
      this.$router.push({
        name: 'RepoTest',
        params,
        query,
      });
    },
    async handleFetch() {
      const { params, query } = this.$route;
      this.loading = true;
      await this.$store.dispatch('test/GET_TESTS', {
        projectId: params.id,
        filePath: query.file,
        ref: query.ref || this.repo.default_branch,
        method: query.method,
        path: query.path,
      });
      this.loading = false;
    },
  },
  data() {
    return {
      search: '',
      loading: true,
    };
  },
  computed: {
    filterCases() {
      return this.cases.filter((i) => i.case.includes(this.search));
    },
    cases() {
      return this.$store.state.test.tests;
    },
    repo() {
      return this.$store.state.repo.gitRepo;
    },
  },
  mounted() {
    this.handleFetch();
  },
};
</script>
<style lang="scss" scoped>
.test-case {
  cursor: pointer;
  padding: 5px 5px 5px 10px;
  user-select: none;
  border-radius: 4px;
  &:hover,
  &.active {
      background-color: rgba(193, 201, 209, 0.53);
  }
  .title {
    font-weight: 500;
  }
}
</style>
