import VueRouter from "vue-router";
import Home from "./views/home/Home";
import Login from "./views/login/Login";
import Licensing from "./views/licensing/Licensing";
import Profile from "./views/profile/Profile";
import Vue from "vue";
import Products from "./views/licensing/products/Products";
import Manage from "./views/licensing/products/Manage";
import Product from "./views/licensing/products/Product";
import Clients from "./views/licensing/products/Clients";

// create router
const router = new VueRouter({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/profile',
            name: 'profile',
            meta: {
                requiresAuth: true
            },
            component: Profile,
        },
        {
            path: '/licensing',
            name: 'licensing',
            meta: {
                requiresAuth: true
            },
            component: Licensing,
            children: [
                {
                    path: 'products',
                    component: Products,
                    name: 'products',
                    meta: {
                        requiresAuth: true
                    },
                },
                {
                    path: "product/:id",
                    component: Product,
                    name: 'product',
                    children: [
                        {
                            path: 'manage',
                            component: Manage,
                            name: 'manage'
                        },
                        {
                            path: 'clients',
                            component: Clients,
                            name: 'clients'
                        }
                    ]
                },
                {
                    path: '',
                    redirect: {name: 'products'}
                },
            ],
        },
        {
            path: '*',
            redirect: {name: 'home'}
        },
    ],
    mode: 'history'
});

// set authentication
router.beforeEach((to, from, next) => {
    // get user
    const user = Vue.prototype.$supabase.auth.user();

    if (to.meta.requiresAuth) { // if it requires auth
        if (user) {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }
});

export default router;