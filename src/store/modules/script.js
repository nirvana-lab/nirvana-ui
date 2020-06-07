import * as testService from '@/services/testService';

const types = {
  SET_SCRIPTS: 'SET_SCRIPTS',
};

// initState
const initState = {
  scripts: [],
};

// mutations
const mutations = {
  [types.SET_SCRIPTS](state, data) {
    state.scripts = data;
  },
};

// actions
const actions = {
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
