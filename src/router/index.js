import Vue from 'vue';
import Router from 'vue-router';

import userRouter from './user';
import authRouter from './auth';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../components/Home'),
        },
        ...authRouter,
        ...userRouter,
    ],
});

router.beforeEach((to, from, next) => {
    const publicPageNames = ['home', 'login', 'signup', 'mypage'];
    const publicPages = ['/login', '/signup', '/', '/mypage'];
    const authRequired = !publicPageNames.includes(to.name);
    const loggedIn = localStorage.getItem('user');
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
