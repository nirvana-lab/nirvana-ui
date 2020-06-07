<template>
  <div class="repo-test">
    <div class="repo-test-left">
      <Info :paths="paths"/>
      <Cases v-if="!loading"/>
    </div>
    <div class="repo-test-right">
      <router-view :paths="paths" v-if="!loading"></router-view>
    </div>
  </div>
</template>

<script>
import SwaggerParser from '@apidevtools/swagger-parser';
import yaml from 'js-yaml';
import Info from '../components/repo-test/info.vue';
import Cases from '../components/repo-test/cases.vue';

export default {
  name: 'RepoTest',
  components: {
    Info, Cases,
  },
  data() {
    return {
      loading: true,
      paths: {
        description: '',
        operationId: '',
        parameters: [],
        responses: {},
        requestBody: {},
        security: [],
        summary: '',
        tags: [],
      },
    };
  },
  methods: {
    async fetchData() {
      this.loading = true;
      if (!this.repo.default_branch) {
        await this.$store.dispatch('repo/GET_GIT_REPO', this.$route.params.id);
      }
      const { file, ref } = this.$route.query;
      const { id } = this.$route.params;
      if (file && id) {
        await this.$store.dispatch('repo/GET_FILE', {
          id,
          path: encodeURIComponent(file),
          ref: ref || this.repo.default_branch,
        });
      }
      await this.handleParse();
      this.loading = false;
    },
    async handleParse() {
      try {
        const api = await SwaggerParser.validate(this.filterData);
        const { path, method } = this.$route.query;
        const queryMethod = method.toLowerCase();
        this.paths = api.paths[path][queryMethod];
      } catch (err) {
        this.paths = {
          description: '',
          operationId: '',
          parameters: [],
          responses: {},
          requestBody: {},
          security: [],
          summary: '',
          tags: [],
        };
      }
    },
  },
  computed: {
    filterData() {
      const { path, method } = this.$route.query;
      let paths = {};
      if (this.swaggerData) {
        paths = { ...this.swaggerData.paths };
      }
      if (path && method) {
        const queryMethod = method.toLowerCase();
        paths = {
          [path]: {
            [queryMethod]: this.swaggerData.paths[path][queryMethod],
          },
        };
      }
      return {
        ...this.swaggerData,
        paths,
      };
    },
    swaggerData() {
      try {
        return yaml.safeLoad(this.$store.state.repo.raw);
      } catch (err) {
        return '';
      }
    },
    repo() {
      return this.$store.state.repo.gitRepo;
    },
  },
  mounted() {
    this.fetchData();
  },
  beforeDestroy() {
    this.$store.dispatch('test/CLEAR_TEST');
  },
};
</script>
<style lang="scss" scoped>
.repo-test {
  flex-grow: 1;
  display: flex;
  min-height: 1px;
}
.repo-test-left{
  width: 350px;
  display: flex;
  overflow: auto;
  flex-shrink: 0;
  min-height: 1px;
  flex-direction: column;
  padding: 15px 0px 10px 15px;
}
.repo-test-right{
  flex-grow: 1;
  width: 100%;
  min-height: 1px;
  overflow: auto;
  padding: 15px 15px 10px;
}
</style>
