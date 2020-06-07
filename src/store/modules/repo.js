import * as userService from '@/services/userService';
import * as testService from '@/services/testService';

const types = {
  SET_REPOS: 'SET_REPOS',
  SET_GIT_REPOS: 'SET_GIT_REPOS',
  SET_GIT_REPO: 'SET_GIT_REPO',
  SET_RAW: 'SET_RAW',
  SET_SCRIPTS: 'SET_SCRIPTS',
};

// initState
const initState = {
  repos: [],
  gitRepos: [],
  gitRepo: {},
  raw: '',
  scripts: [],
};

// mutations
const mutations = {
  [types.SET_REPOS](state, data) {
    state.repos = data;
  },
  [types.SET_GIT_REPOS](state, data) {
    state.gitRepos = data;
  },
  [types.SET_GIT_REPO](state, data) {
    state.gitRepo = data;
  },
  [types.SET_RAW](state, data) {
    state.raw = data;
  },
  [types.SET_SCRIPTS](state, data) {
    state.scripts = data;
  },
};

// actions
const actions = {
  GET_REPOS: ({ commit, rootState }) => userService.getProjects(rootState.global.user.id).then(({ data }) => {
    commit(types.SET_REPOS, data);
  }),
  GET_GIT_REPOS: ({ commit }, page) => userService.getAllProjects(page).then((res) => {
    commit(types.SET_GIT_REPOS, res.data);
    return res;
  }),
  GET_GIT_REPO: ({ commit }, id) => userService.getProject(id).then(({ data }) => {
    commit(types.SET_GIT_REPO, data);
  }),
  POST_REPO: (_, id) => userService.postProject(id),
  GET_FILE: ({ commit }, { id, path, ref }) => {
    commit(types.SET_RAW, '');
    return userService
      .getRepoTreeFile(id, path, ref).then(({ data }) => {
        commit(types.SET_RAW, data);
      });
  },
  GET_SCRIPTS: ({ commit }, params) => testService.getScripts(params).then(({ data }) => {
    commit(types.SET_SCRIPTS, data.data);
  }),
};
// getters
const getters = {
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};
