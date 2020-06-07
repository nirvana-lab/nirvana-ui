<template>
  <div class="repo-script-create">
    <div class="repo-test-tab clear mb-10">
      <vue-button class="round black" @click="handleCreate">Confirm</vue-button>
    </div>
    <div class="clear title mb-10">
      <nv-table>
        <col width="220px" />
        <col width="100%" />
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <vue-input type="text" v-model="data.suit" class="b db" />
            </td>
            <td>
              <vue-input type="text" v-model="data.description" class="db" />
            </td>
          </tr>
        </tbody>
      </nv-table>
      <TaskCases v-model="data.suit_content" :envMap="envMap" :caseMap="caseMap"/>
    </div>
  </div>
</template>
<script>
import * as taskService from '@/services/taskService';
import TaskCases from '../components/repo-task/task-cases.vue';

export default {
  name: 'TestCreate',
  props: ['paths'],
  components: { TaskCases },
  data() {
    return {
      loadingCreate: true,
      create: false,
      caseMap: {},
      envMap: {},
      data: {
        description: '',
        suit: '',
        suit_content: [],
      },
    };
  },
  mounted() {
    const { id } = this.$route.params;
    Promise.all([taskService.getAllEnvs(id), taskService.getAllTestCases(id)]).then((res) => {
      const { data } = res[1];
      const env = res[0].data;
      const caseMap = {};
      const envMap = {};
      data.data.forEach((p, index) => {
        const temp = p.testcases;
        envMap[p.id] = env.data[index].env;
        Object.keys(temp).forEach((a) => temp[a].forEach((c) => {
          const t = a.split('|');
          caseMap[c.id] = {
            name: c.case,
            path: t[1],
            method: t[0],
            file_name: p.file_name,
            file_path: p.file_path,
            id: p.id,
          };
        }));
      });
      this.caseMap = caseMap;
      this.envMap = envMap;
    });
  },
  methods: {
    handleCreate() {
      this.loadingCreate = true;
      const { id } = this.$route.params;
      this.$store.dispatch('task/CREATE_TASK', {
        id,
        data: this.data,
      }).then(() => {
        this.loadingCreate = false;
        this.create = false;
        this.data = {
          description: '',
          suit: '',
          suit_content: [],
        };
      }).catch(() => {
        this.create = false;
        this.loadingCreate = false;
      });
    },
  },
  computed: {
    repo() {
      return this.$store.state.repo.gitRepo;
    },
  },
};
</script>
<style lang="scss" scoped>
.repo-script-create {
  padding-top: 15px;
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
