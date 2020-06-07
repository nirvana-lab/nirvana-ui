<template>
  <div class="repo-tree">
    <div v-for="i in data" :key="i.id" class="repo-tree-item ell" :class="{'active': parseInt(i.id) === parseInt($route.params.script)}" @click="handleGo(i)">
      <div class="b mb-5">{{ i.script }}</div>
      <!-- <TreeNode :key="i.id" :item="i" :deep="0"/> -->
      <div class="secondary">{{ i.description }}</div>
    </div>
  </div>
</template>

<script>
// import TreeNode from './tree-node.vue';

export default {
  name: 'RepoTree',
  // components: { TreeNode },
  data() {
    return {
      loading: true,
      open: false,
    };
  },
  computed: {
    data() {
      return this.$store.state.repo.scripts;
    },
  },
  methods: {
    handleGo(i) {
      this.$router.push({ name: 'RepoScript', query: this.$route.query, params: { script: i.id } });
    },
    handleFetch() {
      this.loading = true;
      this.$store.dispatch('repo/GET_SCRIPTS', this.$route.params.id).then(() => {
        this.loading = false;
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
.repo-tree-item {
  cursor: pointer;
  padding: 5px 10px;
  user-select: none;
  border-radius: 4px;
  &:hover {
    background-color: rgba(193, 201, 209, 0.53);
  }
  &.active {
    background-color: rgba(193, 201, 209, 0.53);
  }
}
</style>
