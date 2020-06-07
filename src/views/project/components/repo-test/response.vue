<template>
  <div>
    <div class="title">
      <span class="name mr-5">RESPONSE</span>
      <vue-button
        small
        class="icon-button round purple flat"
        iconLeft="add_circle"
        @click="handleAdd"
      />
    </div>
    <nv-table odd>
      <col width="60%" />
      <col width="120px" />
      <col width="210px" />
      <col width="100%" />
      <thead>
        <tr>
          <th>Key</th>
          <th>Type</th>
          <th>Match Rule</th>
          <th>Expect</th>
          <th style="width: 18px"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in value" :key="index">
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
              :value="i.key_type"
              @update="e => handleUpdate(index, 'key_type', e)"
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
            <VueSelect
              :value="i.comparator"
              @update="e => handleUpdate(index, 'comparator', e)"
              button-class="small white"
              class="long"
            >
              <VueSelectButton
                v-for="i in ['equals',
                  'less_than',
                  'less_than_or_equals',
                  'greater_than',
                  'greater_than_or_equals',
                  'not_equals',
                  'string_equals',
                  'length_equals']"
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
              :value="i.expect_value"
              @change="e => handleUpdate(index, 'expect_value', e.target.value)"
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
  name: 'Response',
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
        key: '',
        key_type: 'string',
        comparator: 'equals',
        expect_value: '',
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
.table th {
  padding: 0 7px;
  font-weight: 400;
  height: 30px;
  text-align: left;
  color: $vue-ui-grey-400;
}
.table td {
  height: 30px;
  padding: 0 3px;
  text-align: left;
}
.table {
  width: 100%;
  text-align: center;
}
.odd > tbody > tr:nth-child(odd),
.even > tbody > tr:nth-child(even) {
  background-color: #eff4f9;
}

.table[class*="hover"] > tbody > tr:hover {
  background-color: #eee;
}
</style>
