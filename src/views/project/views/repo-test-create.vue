<template>
  <div class="repo-test-form">
    <div class="clear title mb-10">
      <nv-table>
        <col width="60%">
        <col width="100%">
        <col width="80px">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><vue-input type="text" large v-model="name" class="b db"/></td>
            <td><vue-input type="text" v-model="description" class="db" /></td>
            <td><vue-button class="r round black" @click="handleCreate">Save</vue-button></td>
          </tr>
        </tbody>
      </nv-table>
    </div>
    <Setup v-model="setup" />
    <Params v-model="parameters" />
    <Request v-model="body"/>
    <Response v-model="response"/>
    <Teardown v-model="teardown" />
  </div>
</template>
<script>
import * as testService from '@/services/testService';
import content from '@/utils/content';
import Params from '../components/repo-test/params.vue';
import Request from '../components/repo-test/request.vue';
import Response from '../components/repo-test/response.vue';
import Setup from '../components/repo-test/setup.vue';
import Teardown from '../components/repo-test/teardown.vue';

export default {
  name: 'TestCreate',
  components: {
    Request, Response, Params, Setup, Teardown,
  },
  props: ['paths'],
  data() {
    return {
      description: '',
      name: '',
      parameters: [],
      body: '',
      setup: [],
      teardown: [],
      response: [
        {
          comparator: 'equal', expect_value: '200', key: 'status_code', key_type: 'integer',
        }, {
          comparator: 'less', expect_value: '1000', key: 'elapsed.seconds', key_type: 'integer',
        },
      ],
    };
  },
  mounted() {
    this.handleInit();
  },
  methods: {
    handleInit() {
      if (this.paths.parameters) {
        this.parameters = this.paths.parameters
          .map((i) => ({
            in: i.in,
            description: i.description || '',
            key: i.name || '',
            required: i.required || false,
            type: i.schema.type || 'string',
            value: '',
          }));
      }
      if (this.paths.requestBody) {
        if (this.paths.requestBody.content) {
          Object.keys(this.paths.requestBody.content).forEach((key) => {
            if (key === 'application/json' && this.paths.requestBody.content[key].schema) {
              this.body = JSON.stringify(content(this.paths.requestBody.content[key].schema), null, 2);
            } else {
              this.body = key;
            }
          });
        }
      }
    },
    handleCreate() {
      const { params, query } = this.$route;
      const resultParameters = this.parameters.map((i) => ({
        key: i.key,
        type: i.type,
        value: i.value,
        in: i.in,
      }));
      const resultResponse = this.response.map((i) => ({
        key: i.key,
        key_type: i.key_type,
        comparator: i.comparator,
        expect_value: i.expect_value,
      }));
      testService.createTest({
        params: {
          project_id: params.id, file_path: query.file, ref: query.ref || this.repo.default_branch, method: query.method.toLowerCase(), path: query.path,
        },
        data: {
          case: this.name,
          description: this.description,
          setup: this.setup,
          teardown: this.teardown,
          parameters: resultParameters,
          body: this.body,
          validator: resultResponse,
        },
      }).then(() => {
        this.$store.dispatch('test/GET_TESTS', {
          projectId: params.id, filePath: query.file, ref: query.ref || this.repo.default_branch, method: query.method, path: query.path,
        });
      });
    },
  },
  computed: {
    repo() {
      return this.$store.state.repo.gitRepo;
    },
    method() {
      const { method } = this.$route.query;
      if (method) {
        return method.toLowerCase();
      }
      return '';
    },
  },
};
</script>
<style lang="scss" scoped>
.repo-test-form {
  max-width: 950px;
  width: 100%;
  margin: 0 auto 20px;
}
.repo-test-form-table-title {
  font-size: 12px;
  padding: 5px 0;
  font-weight: 600;
  border-style: solid;
  border-width: 1px 0 0;
  margin-top: 15px;
  border-image-source: radial-gradient(
    circle at 50% 3%,
    rgba(193, 201, 209, 0.53),
    rgba(255, 255, 255, 0.2)
  );
  border-image-slice: 1;
  .name {
    vertical-align: text-bottom;
  }
}
</style>
