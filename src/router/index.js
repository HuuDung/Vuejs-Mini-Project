import Vue from 'vue';
import Router from 'vue-router';
import adminRouter from './admin';
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
            component: () => import('../components/TopPage/TopPage'),
        },
        ...authRouter,
        ...userRouter,
        ...adminRouter,
        ...recipeRouter,
    ],
});

router.beforeEach((to, from, next) => {
    const publicPageNames = ['home', 'login', 'signup', 'recipe-detail', 'admin'];
    // const publicPages = ["/login", "/signup", "/", "/mypage", "/recipes"];
    // to.matched: List cac route duoc khai bao o tren map voi link dang vao
    // const path = to.matched? to.matched[0].path : to.path;
    const adminPages = ['admin'];
    const authRequired = !publicPageNames.includes(to.name);
    const adminRequired = adminPages.includes(to.name);
    const loggedIn = JSON.parse(localStorage.getItem('user'));
    const isAdmin = loggedIn && loggedIn.role === '1';
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else if (adminRequired && !isAdmin) {
        next('/');
    } else {
        next();
    }
});

export default router;
