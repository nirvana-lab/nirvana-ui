import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import Layout from '@/views/index.vue';
import Login from '@/views/login/index.vue';
import Repo from '@/views/repo/routes';

const OriginalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return OriginalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      login: true,
    },
    component: Login,
  },
  {
    path: '/',
    component: Layout,
    children: [
      Repo,
      { path: '', redirect: 'repos' },
    ],
  },
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  const token = Cookies.get('token');
  if (to.meta.login && !token) {
    next();
  } else if (to.meta.login && token) {
    if (from.path) {
      next(from.path);
    } else {
      next('/');
    }
  } else if (!token) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
