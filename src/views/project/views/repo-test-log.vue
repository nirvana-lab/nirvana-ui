<template>
  <div class="repo-test-log">
    <div class="repo-test-tab clear mb-10">
      <vue-button
        iconLeft="chevron_left"
        class="round black mr-10"
        @click="handleTestCases"
      >TestCases</vue-button>
    </div>
    <div class="clear mb-10">
      <VueSelect
        v-model="env"
        button-class="white"
        :disabled="loadingEnv"
        class="mr-5"
        placeholder="Select Environment"
      >
        <VueSelectButton v-for="i in envs" :key="i.id" :value="i.id" :label="i.env" />
      </VueSelect>
      <vue-button
        iconLeft="cached"
        :disabled="loadingEnv"
        class="icon-button flat round"
        @click="handleGetEnv"
      ></vue-button>
      <vue-button
        :disabled="env === -1"
        iconLeft="bug_report"
        class="flat round r orange"
        @click="handleFetch"
      >Run</vue-button>
    </div>
    <!-- <div v-if="run.stat">
      <vue-button iconLeft="cancel" class="flat round red">fail {{run.stat.testcases.fail}}</vue-button>
      <vue-button iconLeft="check_circle" class="flat round green">success {{run.stat.testcases.success}}</vue-button>
      <vue-button iconLeft="format_list_bulleted" class="flat round">total {{run.stat.testcases.total}}</vue-button>
    </div>-->
    <vue-loading class="big pt-5" v-if="loading" />
    <nv-table odd v-if="!run.details.length && !error.length">
      <col width="65%" />
      <col width="100%" />
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, index) in variable" :key="index">
          <td>{{value.key}}</td>
          <td>{{value.value}}</td>
        </tr>
      </tbody>
    </nv-table>
    <pre v-if="error.length" class="result-cmd">{{ error }}</pre>
    <div v-for="detail in run.details" :key="detail['HRUN-Request-ID']">
      <h5 class="mb-10 title">HRUN-Request-ID: {{ detail["HRUN-Request-ID"] }}</h5>
      <div v-for="(record, index) in detail.records" :key="index">
        <div class="record_status">
          <vue-button iconLeft="assignment" class="round white mr-10" @click="logDialog = true">log</vue-button>
          <vue-button iconLeft="assignment" class="round white mr-10" @click="consoleDialog = true">console</vue-button>
          <vue-button
            :iconLeft="record.status === 'success' ? 'check_circle' : 'cancel'"
            class="flat round"
            :class="record.status === 'success' ? 'green' : 'red'"
          >{{ record.status }}</vue-button>
          <vue-button iconLeft="access_time" class="flat round">{{ record.response_time }}</vue-button>
        </div>
        <nv-table odd v-if="record.meta_datas.validators" class="mb-15">
          <col width="40px" />
          <col width="60%" />
          <col width="130px" />
          <col width="100%" />
          <col width="100%" />
          <thead>
            <tr>
              <th></th>
              <th>Key</th>
              <th>Match Rule</th>
              <th>Value</th>
              <th>Expect</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(validators, validatorsIndex) in record.meta_datas.validators
                .validate_extractor"
              :key="validatorsIndex"
              :class="{ 'tr-err': validators.check_result !== 'pass' }"
            >
              <td>
                <vue-button
                  :iconLeft="validators.check_result === 'pass' ? 'check_circle' : 'cancel'"
                  class="flat round icon-button"
                  :class="validators.check_result === 'pass' ? 'green' : 'red'"
                ></vue-button>
              </td>
              <td class="ell" v-tooltip="`${validators.check}`">{{ validators.check }}</td>
              <td>{{ validators.comparator }}</td>
              <td class="ell" v-tooltip="`${validators.check_value}`">{{ validators.check_value }}</td>
              <td class="ell" v-tooltip="`${validators.expect}`">{{ validators.expect }}</td>
            </tr>
          </tbody>
        </nv-table>
        <div v-for="(meta_data, meta_data_index) in record.meta_datas.data" :key="meta_data_index">
          <pre class="result-cmd">{{ meta_data.response.body }}</pre>
        </div>
      </div>
    </div>
    <VueModal v-if="logDialog" title="Log" @close="logDialog = false">
      <div class="default-body">
        <pre class="result-cmd">{{ run }}</pre>
      </div>
    </VueModal>
    <VueModal v-if="consoleDialog" title="Log" @close="consoleDialog = false">
      <div class="default-body">
        <pre class="result-cmd">{{ run.console }}</pre>
      </div>
    </VueModal>
  </div>
</template>
<script>
export default {
  name: 'TestLog',
  data() {
    return {
      env: -1,
      loading: false,
      loadingEnv: true,
      run: { console: '', details: [] },
      logDialog: false,
      consoleDialog: false,
      error: '',
    };
  },
  watch: {
    $route(newRouter, oldRouter) {
      if (newRouter.params.test !== oldRouter.params.test) {
        this.handleGetEnv();
      }
    },
    env() {
      this.run = { console: '', details: [] };
      this.error = '';
      if (this.env !== -1) {
        this.$store.dispatch('variable/GET_ENV', this.env);
      }
    },
  },
  mounted() {
    this.handleGetEnv().then(() => {
      this.env = !this.envs.length ? -1 : this.envs[0].id;
      if (this.env !== -1) {
        this.$store.dispatch('variable/GET_ENV', this.env);
      }
    });
  },
  computed: {
    variable() {
      const { env } = this.$store.state.variable;
      return Object.keys(env)
        .map((key) => ({
          key,
          value: env[key].value,
          selected: env[key].selected,
        }))
        .filter((i) => i.selected);
    },
    envs() {
      return this.$store.state.variable.envs;
    },
    repo() {
      return this.$store.state.repo.gitRepo;
    },
  },
  methods: {
    handleGetEnv() {
      this.loadingEnv = true;
      const { file, ref } = this.$route.query;
      const { id } = this.$route.params;
      const params = {
        project_id: id,
        file_path: file,
        ref: ref || this.repo.default_branch,
      };
      return this.$store.dispatch('variable/GET_ENVS', params).then(() => {
        this.loadingEnv = false;
      });
    },
    handleTestCases() {
      this.$router.push({
        name: 'RepoTestEdit',
        params: this.$route.params,
        query: this.$route.query,
      });
    },
    handleFetch() {
      this.run = { console: '', details: [] };
      this.error = '';
      this.loading = true;
      this.$store
        .dispatch('test/RUN_TEST', {
          env_id: this.env,
          test_id: this.$route.params.test,
        })
        .then(({ data }) => {
          this.loading = false;
          this.run = data;
        })
        .catch((err) => {
          this.loading = false;
          this.error = err.response.data.detail;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/colors.scss";
.repo-test-log {
  max-width: 950px;
  width: 100%;
  margin: 0 auto;
}
// &.success {
//   color: #49cc90;
// }
// &.warning {
//   color: #fca130;
// }
// resulfail {
//   color: #f93e3e;
// }
.result-cmd {
  background-color: #282c34;
  border-radius: 4px;
  padding: 10px;
  font-size: 12px;
  line-height: 14px;
  color: #fff;
  overflow-x: auto;
}
.title {
  padding: 0 5px;
}
.tr-err {
  background-color: #{$vue-ui-danger-100}40 !important;
}
.record_status {
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-style: solid;
  border-width: 0 0 1px 0;
  border-image-source: radial-gradient(
    circle at 50% 3%,
    rgba(193, 201, 209, 0.53),
    rgba(255, 255, 255, 0.2)
  );
  border-image-slice: 1;
}
.repo-test-tab {
  padding-bottom: 10px;
  border-style: solid;
  border-width: 0 0 1px 0;
  border-image-source: radial-gradient(
    circle at 50% 3%,
    rgba(193, 201, 209, 0.53),
    rgba(255, 255, 255, 0.2)
  );
  border-image-slice: 1;
}
</style>
