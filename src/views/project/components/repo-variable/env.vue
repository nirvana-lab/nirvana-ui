<template>
  <div class="variable-envs">
    <div class="title">
      <span class="name mr-5">Envs</span>
      <vue-button
        @click="create = true"
        small
        class="icon-button round purple flat"
        iconLeft="add_circle"
      />
    </div>
    <template v-for="(i, index) in envs">
      <div
        :key="index"
        class="variable-env ell"
        :class="{ active: current === i.id }"
        @click="handleGetEnv(i.id)"
      >
        <div class="b mb-5">{{ i.env }}</div>
        <div class="sm secondary">{{ i.description || '-' }}</div>
      </div>
    </template>
    <VueModal v-if="create" title="Create Env" class="small" @close="create = false">
      <div class="default-body">
        <h4 class="mb-5">Enviroment</h4>
        <vue-input class="db warning" small type="text" v-model="form.env" />
        <h4 class="mb-5">Description</h4>
        <vue-input class="db warning" small type="text" v-model="form.description" />
      </div>
      <div slot="footer" class="actions">
        <div class="space"></div>
        <VueButton
          class="purple round"
          :disabled="!form.env.length"
          @click="handleCreate"
          :loading="loadingCreate"
          >Confirm</VueButton
        >
        <VueButton class="flat round" @click="create = false">Cancel</VueButton>
      </div>
    </VueModal>
  </div>
</template>

<script>
import * as testService from '@/services/testService';

export default {
  name: 'RepoTree',
  data() {
    return {
      loading: true,
      create: false,
      loadingCreate: false,
      form: {
        description: '',
        env: '',
      },
    };
  },
  computed: {
    envs() {
      return this.$store.state.variable.envs;
    },
    current() {
      return this.$store.state.variable.current;
    },
    repo() {
      return this.$store.state.repo.gitRepo;
    },
  },
  methods: {
    handleGetEnv(id) {
      this.$store.dispatch('variable/GET_ENV', id);
    },
    handleCreate() {
      this.loadingCreate = true;
      const { file, ref } = this.$route.query;
      const { id } = this.$route.params;
      const params = {
        project_id: id,
        file_path: file,
        ref: ref || this.repo.default_branch,
      };
      testService
        .createEnv({
          params,
          data: this.form,
        })
        .then(() => {
          this.loadingCreate = false;
          this.create = false;
          this.form = {
            description: '',
            env: '',
          };
          if (file && id) {
            this.$store.dispatch('variable/GET_ENVS', params);
          }
        }).catch(() => {
          this.create = false;
          this.loadingCreate = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 13px;
  padding: 0 5px 5px;
  font-weight: 600;
  .name {
    vertical-align: text-bottom;
  }
}
.variable-envs {
  padding-bottom: 10px;
  padding-right: 5px;
  flex-grow: 1;
  min-height: 1px;
  overflow: auto;
  border-style: solid;
  border-width: 0 1px 0 0;
  border-image-source: radial-gradient(circle at 50% 3%, rgba(193, 201, 209, 0.53), rgba(255, 255, 255, 0.2));
  border-image-slice: 1;
}
.variable-env {
  cursor: pointer;
  padding: 5px;
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
