import VueRouter from "vue-router";
import Home from "./views/home/Home";
import Login from "./views/login/Login";
import Licensing from "./views/licensing/Licensing";
import Profile from "./views/profile/Profile";

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
            meta: {
                requiresAuth: true
            },
            component: Licensing,
            // children: [
            //     {
            //         path: '',
            //         component: LicensingHome,
            //         name: 'licensinghome',
            //         meta: {
            //             requiresAuth: true
            //         },
            //     },
            //     {
            //         path: 'profile',
            //         component: LicensingProfile,
            //         name: 'licensingprofile',
            //         meta: {
            //             requiresAuth: true
            //         },
            //     },
            //     {
            //         path: '*',
            //         redirect: {name: 'licensinghome'}
            //     },
            // ]
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
    if (to.meta.requiresAuth) { // if it requires auth
        if (localStorage.getItem('user') !== null) {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }
});

export default router;