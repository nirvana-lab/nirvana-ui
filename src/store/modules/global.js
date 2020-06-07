import * as userService from '@/services/userService';

const types = {
  SET_USER: 'SET_USER',
};

// initState
const initState = {
  user: {},
};

// mutations
const mutations = {
  [types.SET_USER](state, data) {
    state.user = data;
  },
};

// actions
const actions = {
  GET_USER: ({ commit }) => userService.getUser().then(({ data }) => {
    commit(types.SET_USER, data);
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
