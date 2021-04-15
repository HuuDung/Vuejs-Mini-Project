export default [
    {
        path: '/users',
        name: 'users',
        component: () => import('../components/User/UserList'),
    },
    {
        path: '/mypage',
        name: 'my-page',
        component: () => import('../components/User/MyPage'),
    },
];
