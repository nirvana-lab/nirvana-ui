<template>
  <div class="repo-tree">
    <template v-for="i in data" >
      <TreeNode :key="i.id" :item="i" :deep="0"/>
    </template>
  </div>
</template>

<script>
import * as userService from '@/services/userService';
import TreeNode from './tree-node.vue';

export default {
  name: 'RepoTree',
  components: { TreeNode },
  data() {
    return {
      loading: true,
      open: false,
      data: [],
    };
  },
  methods: {
    handleFetch() {
      this.loading = true;
      userService.getRepoTree(this.$route.params.id).then(({ data }) => {
        this.loading = false;
        this.data = data;
      });
    },
  },
  beforeMount() {
    this.handleFetch();
  },
};
</script>
<style lang="scss" scoped>
.repo-tree {
  padding: 15px 0;
  flex-grow: 1;
  min-height: 1px;
  overflow: auto;
}
</style>
