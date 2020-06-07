<template>
  <div>
    <div class="title">
      <span class="name mr-5">PARAMS</span>
      <vue-button
        small
        class="icon-button round purple flat"
        iconLeft="add_circle"
        @click="handleAdd"
      />
    </div>
    <nv-table odd>
      <col width="110px" />
      <col width="60%" />
      <col width="120px" />
      <col width="100%" />
      <thead>
        <tr>
          <th>In</th>
          <th>Key</th>
          <th>Type</th>
          <th>Value</th>
          <th style="width: 18px"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in value" :key="index">
          <td>
            <VueSelect
              :value="i.in"
              @update="e => handleUpdate(index, 'in', e)"
              button-class="small white"
              class="long"
            >
              <VueSelectButton value="header" label="header" />
              <VueSelectButton value="path" label="path" />
              <VueSelectButton value="query" label="query" />
            </VueSelect>
          </td>
          <td>
            <input
              class="input long small"
              type="text"
              :value="i.key"
              @change="e => handleUpdate(index, 'key', e.target.value)"
            />
          </td>
          <td>
            <VueSelect
              :value="i.type"
              @update="e => handleUpdate(index, 'type', e)"
              button-class="small white"
              class="long"
            >
              <VueSelectButton
                v-for="i in ['integer',
                  'long',
                  'float',
                  'double',
                  'string',
                  'byte',
                  'binary',
                  'boolean',
                  'date',
                  'dateTime',
                  'password']"
                :value="i"
                :label="i"
                :key="i"
              />
            </VueSelect>
          </td>
          <td>
            <input
              class="input long small"
              type="text"
              :value="i.value"
              @change="e => handleUpdate(index, 'value', e.target.value)"
            />
          </td>
          <td style="width: 18px">
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
  </div>
</template>
<script>
export default {
  name: 'Params',
  props: {
    value: {
      default: () => [],
    },
  },
  methods: {
    handleUpdate(index, key, value) {
      const temp = [...this.value];
      temp[index][key] = value;
      this.$emit('input', temp);
    },
    handleAdd() {
      const temp = [...this.value];
      temp.push({
        in: 'header',
        description: '',
        name: '',
        required: false,
        type: 'string',
        assert: '',
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
</style>
