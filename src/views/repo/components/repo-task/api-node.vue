<template>
  <div>
    <div class="repo-tree-item ell" @click="open = !open">
      <vue-icon :icon="open ? 'expand_more' : 'chevron_right'" />
      <span class="method">{{ data.key.split('|')[0].toUpperCase() }}</span><span>{{ data.key.split('|')[1] }}</span>
    </div>
    <template v-if="open">
      <label class="case ell" v-for="i in data.cases" :key="i.id">
        <input type="checkbox" :value="i.id" class="mr-10 vm"  :checked="value.some(a => `${a}` === `${i.id}`)" @change="handleChange">
        <span class="vm">{{i.case}}</span>
      </label>
    </template>
  </div>
</template>

<script>

export default {
  name: 'ApiNode',
  props: {
    data: {
      default: () => ({}),
      type: Object,
    },
    value: {
      default: () => [],
    },
  },
  data() {
    return {
      loading: true,
      open: false,
    };
  },
  methods: {
    handleChange(e) {
      const temp = [...this.value];
      const index = this.value.indexOf(e.target.value);
      if (index !== -1) {
        temp.splice(index, 1);
        this.$emit('update', temp);
      } else {
        this.$emit('update', [...temp, e.target.value]);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.repo-tree-item {
  cursor: pointer;
  padding: 5px;
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
.method{
  padding: 1px 5px;
  background-color: #2d3444;
  color: #fff;
  border-radius: 3px;
  font-size: 11px;
  margin-right: 5px;
}
.case{
  display: block;
  cursor: pointer;
  padding: 5px 2px 5px 22px;
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
