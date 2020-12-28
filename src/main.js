import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router';
import router from './router';

import axios from 'axios';
import VueAxios from 'vue-axios';

// Bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// Css
import './scss/main.scss';

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app');
