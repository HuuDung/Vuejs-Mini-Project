export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Auth/Login'),
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('../components/Auth/Register'),
    },
];
