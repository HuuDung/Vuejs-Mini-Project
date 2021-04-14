export default [
    {
        path: '/users',
        name: 'users',
        component: () => import('../components/User/UserList'),
    },
    {
        path: '/mypage',
        name: 'mypage',
        component: () => import('../components/User/MyPage'),
    },
];
