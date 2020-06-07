<template>
  <vue-loading class="big pt-5" v-if="loading" />
  <div class="repo-variable" v-else>
    <div class="repo-variable-left">
      <Env/>
    </div>
    <div class="repo-variable-right">
      <Variable/>
    </div>
  </div>
</template>

<script>
import Env from '../components/repo-variable/env.vue';
import Variable from '../components/repo-variable/variable.vue';

export default {
  name: 'RepoVariable',
  components: { Env, Variable },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    repo() {
      return this.$store.state.repo.gitRepo;
    },
  },
  methods: {
    handleFetch() {
      this.loading = true;
      const {
        file, ref,
      } = this.$route.query;
      const { id } = this.$route.params;
      if (file && id) {
        const params = { project_id: id, file_path: file, ref: ref || this.repo.default_branch };
        this.$store.dispatch('variable/GET_ENVS', params).then(() => {
          this.loading = false;
        });
      }
    },
  },
  mounted() {
    this.handleFetch();
  },
  beforeDestroy() {
    this.$store.dispatch('variable/CLEAR_ENV');
  },
  watch: {
    $route() {
      this.handleFetch();
      this.$store.dispatch('variable/CLEAR_ENV');
    },
  },
};
</script>
<style lang="scss" scoped>
.repo-variable {
  flex-grow: 1;
  display: flex;
  min-height: 1px;
}
.repo-variable-left{
  width: 200px;
  display: flex;
  overflow: auto;
  flex-shrink: 0;
  min-height: 1px;
  flex-direction: column;
}
.repo-variable-right{
  flex-grow: 1;
  width: 100%;
  min-height: 1px;
  overflow: auto;
  padding: 0px 15px 10px;
}
</style>
