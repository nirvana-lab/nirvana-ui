import * as taskService from '@/services/taskService';

const types = {
  SET_TASKS: 'SET_TASKS',
};

// initState
const initState = {
  tasks: [],
};

// mutations
const mutations = {
  [types.SET_TASKS](state, data) {
    state.tasks = data;
  },
};

// actions
const actions = {
  GET_TASKS: ({ commit }, id) => taskService.getTasks(id).then(({ data }) => {
    commit(types.SET_TASKS, data.data);
  }),
  UPDATE_TASK: (_null, { data, id }) => taskService
    .updateTask(data, id),
  CREATE_TASK: ({ dispatch }, { id, data }) => taskService.createTask(data, id).then(() => dispatch('GET_TASKS', id)),
  DELETE_TASK: (_null, id) => taskService.deleteTask(id),
  RUN_TEST: (_null, id) => taskService.runTask(id),
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
