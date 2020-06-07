import Vue from 'vue';
import Vuex from 'vuex';
import global from './modules/global';
import repo from './modules/repo';
import test from './modules/test';
import task from './modules/task';
import variable from './modules/variable';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    repo,
    test,
    task,
    variable,
  },
});
