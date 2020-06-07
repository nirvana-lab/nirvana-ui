<template>
  <div class="repo-script">
    <div class="repo-test-tab clear mb-10">
      <vue-button class="round black mr-10" @click="handleUpdate">Save Task</vue-button>
      <vue-button class="round mr-10" @click="handleRun">Run</vue-button>
      <vue-button class="round r red flat" @click="deleteDialog = true">Delete</vue-button>
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
    <VueModal v-if="deleteDialog" title="Delete Task" class="small" @close="deleteDialog = false">
      <div class="default-body">
        Do you want to delete this task?
      </div>
      <div slot="footer" class="actions">
        <div class="space"></div>
        <VueButton class="red round" @click="handleDelete" :loading="loadingDelete">Confirm</VueButton>
        <VueButton class="flat round" @click="create = false" :disabled="loadingDelete">Cancel</VueButton>
      </div>
    </VueModal>
  </div>
</template>


<script>
import * as taskService from '@/services/taskService';
import TaskCases from '../components/repo-task/task-cases.vue';

export default {
  name: 'RepoVariable',
  components: { TaskCases },
  data() {
    return {
      loading: true,
      deleteDialog: false,
      caseMap: {},
      envMap: {},
      data: {
        description: '',
        suit: '',
        id: 0,
        suit_content: [],
      },
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
      const { task } = this.$route.params;
      if (task) {
        taskService.getTask(task).then(({ data }) => {
          this.data = data.data;
          this.loading = false;
        });
      }
    },
    handleRun() {
      this.$router.push({ name: 'RepoTaskLog', params: this.$route.params, query: this.$route.query });
    },
    handleDelete() {
      taskService.deleteTask(this.$route.params.task).then(() => {
        this.$store.dispatch('task/GET_TASKS', this.$route.params.id);
        this.$router.push({ name: 'RepoTaskCreate', params: { id: this.$route.params.id }, query: this.$route.query });
      });
    },
    handleUpdate() {
      taskService.updateTask(this.data, this.data.id).then(() => {
        this.$store.dispatch('task/GET_TASKS', this.$route.params.id);
      });
    },
  },
  async mounted() {
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
      this.handleFetch();
    });
  },
  watch: {
    $route() {
      this.handleFetch();
    },
  },
};
</script>
<style lang="scss" scoped>
.repo-script{
  padding-top: 15px;
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
