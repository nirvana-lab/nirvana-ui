<template>
  <VueModal title="Global Variable" class="small" @close="handleCancel">
    <div class="body">
      <table class="table odd mb-10">
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
              <vue-switch v-model="value.selected" />
            </td>
            <td>
              <input type="text" class="input long small" v-model.trim="value.key" />
            </td>
            <td>
              <input type="text" class="input long small" v-model.trim="value.value" />
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
      </table>
      <vue-button
        small
        class="icon-button round purple flat"
        @click="handlePush"
        iconLeft="add_circle"
      />
    </div>
    <div slot="footer" class="actions">
      <div class="space"></div>
      <VueButton class="purple round" @click="handleConfirm" :loading="loading">Confirm</VueButton>
      <VueButton
        :disabled="loading"
        class="flat round"
        @click="handleCancel"
      >Cancel</VueButton>
    </div>
  </VueModal>
</template>

<script>
import * as testService from '@/services/testService';

export default {
  name: 'RepoVariable',
  data() {
    return {
      data: [],
      loading: false,
    };
  },
  watch: {
    current() {
      this.data = Object.keys(this.variable.env).map((key) => ({
        key,
        ...this.variable.env[key],
      }));
    },
  },
  created() {
    testService.getVariable(this.$route.params.id).then(({ data }) => {
      this.data = Object.keys(data.data.metadata).map((key) => ({
        key,
        ...data.data.metadata[key],
      }));
    });
  },
  methods: {
    async handleConfirm() {
      this.loading = true;
      const result = {};
      this.data.forEach((i) => {
        result[i.key] = { value: i.value, selected: i.selected };
      });
      await testService.updateVariable(result, this.$route.params.id).then(() => {
        this.handleCancel();
      });
      this.loading = false;
    },
    handleCancel() {
      this.$emit('update:show', false);
    },
    handlePush() {
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
.body {
  padding: 0 24px;
}
.title {
  font-size: 13px;
  padding: 0 5px 5px;
  font-weight: 600;
  .name {
    vertical-align: text-bottom;
  }
}
</style>
