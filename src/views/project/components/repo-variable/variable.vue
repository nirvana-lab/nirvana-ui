<template>
  <div v-if="this.current">
     <div class="title">
      <VueDropdown buttonClass="icon-button round flat small" class="r" icon-right="more_vert">
        <VueDropdownButton @click="show = true">Delete</VueDropdownButton>
      </VueDropdown>
      <vue-button v-if="changed" small class="black round r mr-10" @click="handleSave" label="Save"/>
      <span class="name mr-5">Variable</span>
      <vue-button small class="icon-button round purple flat" @click="handleAdd" iconLeft="add_circle"/>
    </div>
    <nv-table odd>
      <col width="50px" />
      <col width="65%" />
      <col width="100%" />
      <col width="32px" />
      <thead>
        <tr>
          <th></th>
          <th>Key</th>
          <th>Value</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, index) in data" :key="index">
          <td>
            <vue-switch v-model="value.selected"/>
          </td>
          <td>
            <input v-model="value.key" class="input long small" type="text" />
          </td>
          <td>
            <input v-model="value.value" class="input long small" type="text" />
          </td>
          <td>
            <vue-button
              small
               @click="handleDelete(index)"
              class="icon-button round red flat"
              iconLeft="remove_circle"
            />
          </td>
        </tr>
      </tbody>
    </nv-table>
    <EnvDelete v-if="show" :show.sync="show" :id="current"/>
  </div>
</template>

<script>
import * as testService from '@/services/testService';
import EnvDelete from './envDelete.vue';

export default {
  name: 'RepoVariable',
  components: { EnvDelete },
  data() {
    return {
      data: [],
      copy: '',
      show: false,
    };
  },
  watch: {
    current() {
      const result = Object.keys(this.variable.env).map((key) => ({
        key,
        ...this.variable.env[key],
      }));
      this.data = result;
      this.copy = JSON.stringify(result);
    },
  },
  computed: {
    variable() {
      return this.$store.state.variable;
    },
    current() {
      return this.variable.current;
    },
    changed() {
      return this.copy !== JSON.stringify(this.data);
    },
  },
  mounted() {
    if (this.current !== '') {
      this.$store.dispatch('variable/GET_ENV', this.current);
    }
  },
  methods: {
    handleSave() {
      const result = {};
      this.data.forEach((i) => {
        result[i.key] = { value: i.value, selected: i.selected };
      });
      testService.updateEnv(this.current, result);
    },
    handleAdd() {
      this.data.push({ key: '', value: '', selected: false });
    },
    handleDelete(index) {
      this.data.splice(index, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/colors.scss";
.title {
  font-size: 13px;
  padding: 0 5px 5px;
  font-weight: 600;
  .name {
    vertical-align: text-bottom;
  }
}
</style>
