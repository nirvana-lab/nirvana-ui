<template>
  <VueModal title="Delete Environment" class="small" @close="$emit('update:show', false)">
    <div class="body">
      Do you want to delete environment?
    </div>
    <div slot="footer" class="actions">
      <div class="space"></div>
      <VueButton
        class="red round"
        @click="handleDelete"
        :loading="loadingDelete"
        >Confirm</VueButton
      >
      <VueButton :disabled="loadingDelete" class="flat round" @click="$emit('update:show', false)">Cancel</VueButton>
    </div>
  </VueModal>
</template>

<script>
import * as testService from '@/services/testService';

export default {
  name: 'EnvDeleteDialog',
  props: ['id'],
  data() {
    return {
      loadingDelete: false,
    };
  },
  computed: {
    repo() {
      return this.$store.state.repo.gitRepo;
    },
  },
  methods: {
    handleDelete() {
      testService
        .deleteEnv(this.id).then(() => {
          const { file, ref } = this.$route.query;
          const { id } = this.$route.params;
          const params = {
            project_id: id,
            file_path: file,
            ref: ref || this.repo.default_branch,
          };
          this.$store.dispatch('variable/GET_ENVS', params);
          this.$store.dispatch('variable/CLEAR_ENV');
          this.$emit('update:show', false);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/colors.scss";
.body{
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
  table-layout:fixed;
}
.table-wrapper {
  background-color: #fff;
  border-radius: 4px;
}
.odd > tbody > tr:nth-child(odd),
.even > tbody > tr:nth-child(even) {
  background-color: #eff4f9;
}

.table[class*="hover"] > tbody > tr:hover {
  background-color: #eee;
}
</style>
