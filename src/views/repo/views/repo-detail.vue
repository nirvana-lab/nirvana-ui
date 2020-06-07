<template>
  <div class="repo-detail">
    <div class="repo-detail-left">
      <RepoInfo/>
      <RepoTab :value="mode" @update="hanleChangeMode">
        <VueButton v-if="mode === 'scripts'" class="round r" @click="handleCreateScript" label="Create"/>
        <VueButton v-if="mode === 'tasks'" class="round r" @click="handleCreateTask" label="Create"/>
      </RepoTab>
      <RepoTree v-if="mode === 'projects'"/>
      <RepoScript v-if="mode === 'scripts'"/>
      <RepoTask v-if="mode === 'tasks'"/>
    </div>
    <div class="repo-detail-right">
      <ProjectTab v-if="$route.name === 'RepoDoc' || $route.name === 'RepoVariable'"/>
      <router-view class="repo-detail-container" v-if="!loading"></router-view>
    </div>
  </div>
</template>

<script>
import RepoTab from '../components/repo-detail/repo-tab.vue';
import ProjectTab from '../components/repo-detail/tab.vue';
import RepoScript from '../components/repo-detail/script.vue';
import RepoTask from '../components/repo-detail/repo-task.vue';
import RepoTree from '../components/repo-detail/tree.vue';
import RepoInfo from '../components/repo-detail/info.vue';

export default {
  name: 'RepoDetail',
  components: {
    RepoTab, RepoTree, RepoInfo, ProjectTab, RepoScript, RepoTask,
  },
  data() {
    return {
      mode: '',
      map: {
        RepoDoc: 'projects',
        RepoVariable: 'projects',
        RepoScript: 'scripts',
        RepoScriptCreate: 'scripts',
        RepoTask: 'tasks',
        RepoTaskCreate: 'tasks',
        RepoTaskLog: 'tasks',
      },
      loading: true,
    };
  },
  methods: {
    handleCreateScript() {
      this.$router.push({ name: 'RepoScriptCreate', params: { id: this.$route.params.id }, query: this.$route.query });
    },
    handleCreateTask() {
      this.$router.push({ name: 'RepoTaskCreate', params: { id: this.$route.params.id }, query: this.$route.query });
    },
    hanleChangeMode(value) {
      this.mode = value;
      if (value === 'projects') {
        if (!this.$route.query.file) {
          this.$router.push({ name: 'RepoDoc' });
          return;
        }
        this.$router.push({ name: 'RepoDoc', params: { id: this.$route.params.id }, query: this.$route.query });
      } else if (value === 'scripts') {
        if (!this.$route.params.script) {
          this.$router.push({ name: 'RepoScriptCreate', params: { id: this.$route.params.id }, query: this.$route.query });
          return;
        }
        this.$router.push({ name: 'RepoScript', params: { id: this.$route.params.id }, query: this.$route.query });
      } else if (value === 'tasks') {
        if (!this.$route.params.task) {
          this.$router.push({ name: 'RepoTaskCreate', params: { id: this.$route.params.id }, query: this.$route.query });
          return;
        }
        this.$router.push({ name: 'RepoTask', params: { id: this.$route.params.id }, query: this.$route.query });
      }
    },
  },
  async mounted() {
    this.mode = this.map[this.$route.name];
    await this.$store.dispatch('repo/GET_GIT_REPO', this.$route.params.id);
    this.loading = false;
  },
};
</script>
<style lang="scss" scoped>
.repo-detail {
  flex-grow: 1;
  display: flex;
  min-height: 1px;
}
.repo-detail-left{
  width: 350px;
  display: flex;
  overflow: auto;
  flex-shrink: 0;
  min-height: 1px;
  flex-direction: column;
  padding: 15px 0px 10px 15px;
}
.repo-detail-right{
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 1px;
  overflow: auto;
  padding: 0px 15px 10px;
}
.repo-detail-container{
  max-width: 950px;
  width: 100%;
  flex-grow: 1;
  min-height: 1px;
  overflow: auto;
  margin: 0 auto;
}
</style>
