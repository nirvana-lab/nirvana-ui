<template>
  <div class="repo-script">
    <div class="repo-test-tab clear mb-10" v-if="!loading">
      <vue-button class="round black mr-10" @click="handleUpdate">Save Script</vue-button>
      <vue-button class="round r red flat" @click="deleteDialog = true">Delete</vue-button>
    </div>
    <div class="clear title mb-10">
      <nv-table>
        <col width="210px" />
        <col width="220px" />
        <col width="100%" />
        <thead>
          <tr>
            <th>Title</th>
            <th>Script Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <vue-input type="text" v-model="data.script" class="b db" />
            </td>
             <td>
              <vue-input type="text" v-model="data.script_file" class="b db" />
            </td>
            <td>
              <vue-input type="text" v-model="data.description" class="db" />
            </td>
          </tr>
        </tbody>
      </nv-table>
    </div>
    <RepoScript v-model="data.content" />
    <VueModal v-if="deleteDialog" title="Delete Script" class="small" @close="deleteDialog = false">
      <div class="default-body">
        Do you want to delete this script?
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
import * as testService from '@/services/testService';
import RepoScript from '../components/repo-script/script.vue';

export default {
  name: 'RepoTask',
  components: {
    RepoScript,
  },
  data() {
    return {
      data: {
        content: '',
        description: '',
        id: 0,
        script: '',
        script_file: '',
      },
      deleteDialog: false,
      loadingDelete: false,
    };
  },
  watch: {
    script() {
      this.handleFetch();
    },
  },
  computed: {
    script() {
      return this.$route.params.script;
    },
  },
  mounted() {
    if (this.script) {
      this.handleFetch();
    }
  },
  methods: {
    handleFetch() {
      testService.getScript(this.script).then(({ data }) => {
        this.data = data.data;
      });
    },
    handleDelete() {
      testService.deleteScript(this.$route.params.script).then(() => {
        this.$store.dispatch('repo/GET_SCRIPTS', this.$route.params.id);
        this.$router.push({ name: 'RepoScriptCreate', params: { id: this.$route.params.id }, query: this.$route.query });
      });
    },
    handleUpdate() {
      testService.updateScript({ id: this.data.id, data: this.data }).then(() => {
        this.$store.dispatch('repo/GET_SCRIPTS', this.$route.params.id);
      });
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
