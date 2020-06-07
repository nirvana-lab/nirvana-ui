import Vue from 'vue';
import '@/assets/styles/base.scss';
import '@/assets/styles/lib.scss';
import '@/assets/styles/grid.scss';
import '@/assets/styles/swagger.css';
import '@/lib/slime.css';
import '@/assets/icons';
import dayjs from 'dayjs';
import router from '@/router';
import store from '@/store';
import slime from '@/lib/slime.umd.min';
import codemirror from './components/codemirror';
import App from './App.vue';
import components from './components';
import './utils/content';

Vue.use(codemirror);

window.moment = dayjs;

const dateformat = {
  install: (vm) => vm.filter('dateformat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => dayjs(dataStr).format(pattern)),
};

Vue.config.productionTip = false;
Vue.use(slime);
Vue.use(dateformat);
Vue.use(components);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
