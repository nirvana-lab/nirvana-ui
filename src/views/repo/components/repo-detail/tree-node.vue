<template>
  <div>
    <div :style="`padding-left: ${deep * 10}px`" class="repo-tree-item ell" :class="{'active': $route.query.file === item.path}" @click="handleClick(item)">
      <vue-icon :icon="item.type === 'tree' ? (open ? 'expand_more' : 'chevron_right') : ''" />
      <vue-icon
        class="mr-5"
        :icon="item.type === 'tree' ? (open ? 'folder_open' : 'folder') : 'description'"
      />{{ item.name }}
    </div>
    <template v-if="open">
      <vue-loading class="pt-5" v-if="loading && !data.length"/>
      <RepoTreeItem v-for="i in data" :item="i" :key="i.id" :deep="deep + 1" />
    </template>
  </div>
</template>

<script>
import * as userService from '@/services/userService';

export default {
  name: 'RepoTreeItem',
  props: {
    item: {
      default: () => ({}),
      type: Object,
    },
    deep: {
      type: Number,
    },
  },
  data() {
    return {
      loading: true,
      open: false,
      data: [],
    };
  },
  mounted() {
    if (this.$route.query.file) {
      const filePath = this.$route.query.file.split('/');
      const name = filePath.splice(0, this.deep + 1).join('/');
      if (this.item.type === 'tree' && this.item.path === name) {
        this.open = !this.open;
        this.loading = true;
        userService.getRepoTreePath(this.$route.params.id, name).then(({ data }) => {
          this.data = data;
          this.loading = false;
        });
      }
    }
  },
  methods: {
    handleClick(i) {
      if (i.type === 'tree') {
        this.open = !this.open;
        this.loading = true;
        userService.getRepoTreePath(this.$route.params.id, i.path).then(({ data }) => {
          this.data = data;
          this.loading = false;
        });
      } else {
        this.$router.replace({
          name: 'RepoDoc',
          params: this.$route.params,
          query: {
            file: i.path,
            ref: this.$route.query.ref,
          },
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.repo-tree-item {
  cursor: pointer;
  padding: 5px 2px;
  user-select: none;
  border-radius: 4px;
  font-weight: 500;
  &:hover {
    background-color: rgba(193, 201, 209, 0.53);
  }
  &.active {
    background-color: rgba(193, 201, 209, 0.53);
  }
}
</style>
