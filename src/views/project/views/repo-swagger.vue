<template>
<div>
  <vue-loading class="big pt-5" v-if="loading" />
  <RepoSwagger v-show="!loading"/>
</div>
</template>

<script>
import RepoSwagger from '../components/repo-swagger/swagger.vue';

export default {
  name: 'RepoDoc',
  components: { RepoSwagger },
  data() {
    return {
      loading: true,
    };
  },
  watch: {
    $route() {
      this.fetchData();
    },
  },
  methods: {
    async fetchData() {
      this.loading = true;
      const { file, ref } = this.$route.query;
      const { id } = this.$route.params;
      if (file && id) {
        await this.$store.dispatch('repo/GET_FILE', {
          id,
          path: encodeURIComponent(file),
          ref: ref || this.repo.default_branch,
        });
      }
      this.loading = false;
    },
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    repo() {
      return this.$store.state.repo.gitRepo;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
