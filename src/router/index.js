import Vue from 'vue';
import Router from 'vue-router';

import userRouter from './user';
import authRouter from './auth';
import recipeRouter from './recipe';

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
        ...recipeRouter,
    ],
});

router.beforeEach((to, from, next) => {
    const publicPageNames = [
        'home',
        'login',
        'signup',
        'recipe-detail',
        'my-page',
    ];
    // const publicPages = ["/login", "/signup", "/", "/mypage", "/recipes"];
    // to.matched: List cac route duoc khai bao o tren map voi link dang vao
    // const path = to.matched? to.matched[0].path : to.path;
    const authRequired = !publicPageNames.includes(to.name);
    console.log(authRequired);
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
