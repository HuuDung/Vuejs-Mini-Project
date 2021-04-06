export default [
  {
    path: "/users",
    name: "users",
    component: () => import("../components/User/UserList")
  }
];
