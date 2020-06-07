import Vue from 'vue';
import RepoList from '@/views/repo/views/repo-list.vue';
import RepoDetail from '@/views/repo/views/repo-detail.vue';
import RepoTask from '@/views/repo/views/repo-task.vue';
import RepoTaskCreate from '@/views/repo/views/repo-task-create.vue';
import RepoTaskLog from '@/views/repo/views/repo-task-log.vue';
import RepoScript from '@/views/repo/views/repo-script.vue';
import RepoScriptCreate from '@/views/repo/views/repo-script-create.vue';

import RepoSwagger from '@/views/project/views/repo-swagger.vue';
import RepoVariable from '@/views/project/views/repo-variable.vue';
import RepoTest from '@/views/project/views/repo-test.vue';
import RepoTestCreate from '@/views/project/views/repo-test-create.vue';
import RepoTestEdit from '@/views/project/views/repo-test-edit.vue';
import RepoTestLog from '@/views/project/views/repo-test-log.vue';


const index = Vue.extend({
  template: '<router-view/>',
});
export default {
  path: 'repos',
  component: index,
  children: [
    {
      path: ':id/tests',
      component: RepoTest,
      children: [
        {
          path: ':test/log',
          name: 'RepoTestLog',
          component: RepoTestLog,
        },
        {
          path: ':test',
          name: 'RepoTestEdit',
          component: RepoTestEdit,
        },
        {
          path: '',
          name: 'RepoTest',
          component: RepoTestCreate,
        },
      ],
    },
    {
      path: ':id',
      component: RepoDetail,
      children: [
        {
          path: 'task/:task',
          name: 'RepoTask',
          component: RepoTask,
        }, {
          path: 'task/:task/log',
          name: 'RepoTaskLog',
          component: RepoTaskLog,
        }, {
          path: 'task',
          name: 'RepoTaskCreate',
          component: RepoTaskCreate,
        }, {
          path: 'doc',
          name: 'RepoDoc',
          component: RepoSwagger,
        }, {
          path: 'variable',
          name: 'RepoVariable',
          component: RepoVariable,
        }, {
          path: 'script/:script',
          name: 'RepoScript',
          component: RepoScript,
        }, {
          path: 'script',
          name: 'RepoScriptCreate',
          component: RepoScriptCreate,
        }, {
          path: '',
          name: 'RepoDetail',
          redirect: { name: 'RepoDoc' },
        }],
    },
    {
      path: '',
      name: 'RepoList',
      component: RepoList,
    },
  ],
};
