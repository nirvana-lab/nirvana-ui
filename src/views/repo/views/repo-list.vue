<template>
  <div class="repo-list">
    <div class="mb-20">
      <vue-button
        class="black mr-15 l"
        icon-left="add_circle"
        @click="
          getGitRepos();
          create = true;
        "
        label="Add Repo"
      />
      <vue-input
        placeholder="Search ..."
        class="flat purple db"
        icon-left="search"
        v-model.trim="search"
      />
    </div>
    <h3>
      <span class="mr-10 ml-5">Repos</span>
    </h3>
    <vue-loading class="big" v-if="loading" />
    <div class="clear repo-wrapper" v-if="!loading">
      <div class="g-sm-4 g-xs-6" v-for="repo in repos" :key="repo.id">
        <Repo :repo="repo" @handleFetch="handleFetch" />
      </div>
    </div>
    <VueModal v-if="create" title="Add Repo" class="small" @close="handleClose">
      <div class="default-body">
        <div
          v-for="repo in gitRepos"
          class="repo-select"
          :class="{'active': repo.id === choose}"
          @click="choose = repo.id"
          :key="repo.id"
        >{{repo.path_with_namespace}}</div>
      </div>
      <div slot="footer" class="actions">
        <NvPage :total="total" @changePage="page" :currentPage="currentPage" :currentSize="20" />
        <div class="space"></div>
        <VueButton class="purple round" @click="handleCreateRepo" :loading="loadingCreate">Confirm</VueButton>
        <VueButton class="flat round" @click="handleClose">Cancel</VueButton>
      </div>
    </VueModal>
  </div>
</template>

<script>
import Repo from '../components/repo-list/repo.vue';

export default {
  name: 'RepoList',
  components: { Repo },
  data() {
    return {
      search: '',
      total: 0,
      currentPage: 1,
      create: false,
      loading: true,
      loadingCreate: false,
      choose: '',
    };
  },
  computed: {
    repos() {
      return this.$store.state.repo.repos.filter((i) => i.name.includes(this.search));
    },
    gitRepos() {
      return this.$store.state.repo.gitRepos;
    },
  },
  methods: {
    async handleFetch() {
      this.loading = true;
      try {
        await this.$store.dispatch('repo/GET_REPOS');
      } catch (error) {
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    async handleCreateRepo() {
      this.loadingCreate = true;
      try {
        await this.$store.dispatch('repo/POST_REPO', this.choose);
      } catch (error) {
        this.loadingCreate = false;
      } finally {
        this.loadingCreate = false;
        this.choose = '';
        this.create = false;
        this.$store.dispatch('repo/GET_REPOS');
      }
    },
    handleClose() {
      this.create = false;
      this.currentPage = 1;
      this.total = 0;
    },
    page(page) {
      this.currentPage = page;
      this.getGitRepos(page);
    },
    async getGitRepos() {
      await this.$store
        .dispatch('repo/GET_GIT_REPOS', this.currentPage)
        .then((res) => {
          this.total = res.headers['x-total']
            ? parseInt(res.headers['x-total'], 10)
            : 0;
        });
    },
  },
  beforeMount() {
    this.handleFetch();
  },
};
</script>
<style lang="scss" scoped>
.repo-list {
  max-width: 950px;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
}
.repo-wrapper {
  margin: 0 -10px;
}
.default-body {
  min-width: 500px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
}
.default-body-inner{
  min-height: 1px;
  flex-flow: 1;
}
.repo-select {
  padding: 5px 7px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  &:hover,
  &.active {
    background-color: rgba(193, 201, 209, 0.53);
  }
}
</style>
