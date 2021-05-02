import VueRouter from "vue-router";
import Home from "./views/home/Home";
import Login from "./views/login/Login";
import Licensing from "./views/licensing/Licensing";
import Profile from "./views/profile/Profile";
import Vue from "vue";
import Products from "./views/licensing/Products";
import Product from "./views/licensing/product/Product";
import Manage from "./views/licensing/product/Manage";
import Clients from "./views/licensing/product/clients/Clients";
import NewProduct from "./views/licensing/product/NewProduct";
import NewClient from "./views/licensing/product/clients/NewClient";

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
                            name: 'clients',
                        },
                        {
                            path: 'clients/new',
                            component: NewClient,
                            name: 'newclient'
                        }
                    ]
                },
                {
                    path: "products/new",
                    component: NewProduct,
                    name: "newproduct"
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