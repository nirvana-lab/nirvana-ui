import * as testService from '@/services/testService';

const types = {
  SET_ENVS: 'SET_ENVS',
  SET_ENV: 'SET_ENV',
  SET_CURRENT: 'SET_CURRENT',
};

// initState
const initState = {
  envs: [],
  env: {},
  current: '',
};

// mutations
const mutations = {
  [types.SET_ENVS](state, data) {
    state.envs = data;
  },
  [types.SET_ENV](state, data) {
    state.env = data;
  },
  [types.SET_CURRENT](state, data) {
    state.current = data;
  },
};

// actions
const actions = {
  CLEAR_ENV: ({ commit }) => {
    commit(types.SET_CURRENT, '');
    commit(types.SET_ENV, {});
  },
  GET_ENVS: ({ commit }, params) => testService
    .getEnvs({ params })
    .then(({ data }) => {
      commit(types.SET_ENVS, data.data);
    }),
  GET_ENV: ({ commit }, id) => {
    commit(types.SET_CURRENT, '');
    commit(types.SET_ENV, {});
    return testService
      .getEnv(id)
      .then(({ data }) => {
        commit(types.SET_CURRENT, id);
        commit(types.SET_ENV, data.data.metadata);
      });
  },
};
// getters
const getters = {};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};
