<template>
  <div>
    <div class="title">
      <span class="name mr-5">TEARDOWN</span>
       <vue-button
        small
        class="icon-button round purple flat"
        iconLeft="add_circle"
        @click="handleAdd"
      />
    </div>
    <div v-for="(i, index) in value" :key="index">
      <VueSelect
        button-class="small white mb-5"
        :value="i.name"
        @update="e => handleUpdate(index, 'name', e)"
      >
        <VueSelectButton
          v-for="i in func"
          :value="i.name"
          :label="i.name.replace('.py', '')"
          :key="i.name"
        />
        </VueSelect>
        <div v-if="map[i.name]" class="mb-5">
          <span v-for="arg in map[i.name].args" :key="arg">
            {{arg}}:
             <input
              class="tag small"
              type="text"
              :value="i.args[arg] || ''"
              @change="e => handleUpdateArg(index, 'args', arg, e.target.value)"
            />
          </span>
        </div>
    </div>
  </div>
</template>
<script>
import * as testService from '@/services/testService';

export default {
  name: 'setup',
  props: {
    value: {
      default: () => [],
    },
  },
  data() {
    return {
      func: [],
      map: {},
    };
  },
  mounted() {
    testService.getScriptsSelect(this.$route.params.id).then((({ data }) => {
      this.func = data.data;
      data.data.forEach((item) => {
        this.map[item.name] = item;
      });
    }));
  },
  methods: {
    handleUpdate(index, key, value) {
      const temp = [...this.value];
      temp[index][key] = value;
      this.$emit('input', temp);
    },
    handleUpdateArg(index, key, arg, value) {
      const temp = [...this.value];
      temp[index][key][arg] = value;
      this.$emit('input', temp);
    },
    handleAdd() {
      const temp = [...this.value];
      temp.push({
        name: '',
        args: {},
      });
      this.$emit('input', temp);
    },
    handleDelete(index) {
      const temp = [...this.value];
      temp.splice(index, 1);
      this.$emit('input', temp);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/colors.scss";
.title {
  font-size: 13px;
  padding: 5px;
  font-weight: 600;
  border-style: solid;
  border-width: 1px 0 0;
  margin-top: 10px;
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
.tag{
  border: 0;
  outline: none;
  background-color: #2d3444;
  color: #eee;
  padding: 2px;
  width: 80px;
  border-radius: 4px;
  margin-right: 5px;
}
</style>
