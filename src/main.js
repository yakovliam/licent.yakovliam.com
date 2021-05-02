import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router';
import router from './router';

import axios from 'axios';
import VueAxios from 'vue-axios';

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import {createClient} from '@supabase/supabase-js'
import VuePageTransition from 'vue-page-transition';
import VueAnalytics from "vue-analytics";


// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
// Use page transitions
Vue.use(VuePageTransition)
// Use vue analytics
Vue.use(VueAnalytics, {
    id: "G-LC5R5HHQW6",
    router
});

// Css
import './scss/main.scss';
import EventBus from "./eventbus";

Vue.config.productionTip = false

// initialize event bus
Vue.prototype.$bus = EventBus;

// create a single supabase product for interacting with your database
const supabase = createClient(process.env.VUE_APP_SUPABASE_URL, process.env.VUE_APP_SUPABASE_KEY)
// create global context
Vue.prototype.$supabase = supabase;

Vue.prototype.$loggedIn = supabase.auth.user() !== null;

Vue.use(VueAxios, axios)
Vue.use(VueRouter);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
}).$mount('#app');
