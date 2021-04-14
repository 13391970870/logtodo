import Vue from 'vue';
import App from './app.vue';

import './assets/css/reset.css';
import './assets/css/common.scss';

import router from './router/index.js'
import store from './store/index.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';


Vue.use(vuescroll);
Vue.use(ElementUI);
Vue.use(router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
