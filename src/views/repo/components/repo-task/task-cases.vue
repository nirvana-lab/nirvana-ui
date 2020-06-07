<template>
  <div>
    <div class="title">
      <span class="name mr-5">CASES</span>
      <vue-button
        small
        class="icon-button round purple flat"
        iconLeft="add_circle"
        @click="show = true"
      />
    </div>
      <nv-table odd>
      <col width="50px" />
      <col width="70%" />
      <col width="150px" />
      <col width="100%" />
      <col width="40" />
      <thead>
        <tr>
          <th></th>
          <th>Case</th>
          <th>Env</th>
          <th>Path</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in value" :key="index">
          <template  v-if="caseMap[i.exec_id]">
          <td>
            <span class="method">{{caseMap[i.exec_id].method.toUpperCase()}}</span>
          </td>
          <td>
             {{caseMap[i.exec_id].name}}
          </td>
          <td>
            <VueSelect
              :value="i.env_id"
              @update="e => handleUpdate(index, 'env_id', e)"
              button-class="small white"
              class="long"
            >
              <VueSelectButton :value="`${env.id}`" :label="env.env" v-for="env in envMap[caseMap[i.exec_id].id]" :key="env.id"/>
            </VueSelect>
          </td>
          <td class="ell">
            {{caseMap[i.exec_id].path}}
          </td>
          <td>
            <vue-button
              small
              @click="handleDelete(index)"
              class="icon-button round red flat"
              iconLeft="remove_circle"
            />
          </td>
          </template>
        </tr>
      </tbody>
    </nv-table>
    <Project v-if="show" :show.sync="show" @handleAdd="handleAdd" />
  </div>
</template>
<script>
import Project from './task-project.vue';

export default {
  name: 'Cases',
  components: { Project },
  props: {
    value: {
      default: () => [],
    },
    caseMap: {
      default: () => ({}),
    },
    envMap: {
      default: () => ({}),
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    handleUpdate(index, key, value) {
      const temp = [...this.value];
      temp[index][key] = value;
      this.$emit('input', temp);
    },
    handleAdd(arr) {
      const temp = [...this.value];
      arr.forEach((i) => {
        if (!temp.some((t) => t.exec_id === i)) {
          temp.push({ exec_id: i, env_id: -1, suit_type: 'testcase' });
        }
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
.method {
  padding: 1px 5px;
  background-color: #2d3444;
  color: #fff;
  border-radius: 3px;
  font-size: 11px;
  margin-right: 5px;
}
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

</style>
