
<template>
  <div class="repo-script">
    <iframe class="iframe" :src="`/api/task/${$route.params.task}`" frameborder="0"></iframe>
  </div>
</template>


<script>
import * as taskService from '@/services/taskService';

export default {
  name: 'RepoVariable',
  data() {
    return {
    };
  },
  methods: {
    handleFetch() {
      const { task } = this.$route.params;
      taskService.runTask(task).then(({ data }) => {
        this.data = data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.repo-script{
  padding-top: 15px;
}
.iframe{
  width: 100%;
  height: 100%;
}
</style>
