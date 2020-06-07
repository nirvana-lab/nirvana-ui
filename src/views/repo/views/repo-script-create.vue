<template>
  <div class="repo-script-create">
    <div class="repo-test-tab clear mb-10">
      <vue-button class="round black" @click="handleCreate">Confirm</vue-button>
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
              <vue-input type="text" v-model="script" class="b db" />
            </td>
             <td>
              <vue-input type="text" v-model="script_file" class="b db" />
            </td>
            <td>
              <vue-input type="text" v-model="description" class="db" />
            </td>
          </tr>
        </tbody>
      </nv-table>
    </div>
    <RepoScript v-model="content" />
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
      script: '',
      description: '',
      content: '',
      script_file: '',
    };
  },
  methods: {
    handleCreate() {
      testService.createScript({
        params: { project_id: this.$route.params.id },
        data: {
          script: this.script,
          description: this.description,
          content: this.content,
          script_file: this.script_file,
        },
      }).then(() => {
        this.$store.dispatch('repo/GET_SCRIPTS', this.$route.params.id);
      });
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
