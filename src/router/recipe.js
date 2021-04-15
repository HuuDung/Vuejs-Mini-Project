export default[{
    path: '/recipes/:id',
    name: 'recipe-detail',
    component: () => import('../components/Recipe/Detail'),
    meta: { public: true },
},

];
