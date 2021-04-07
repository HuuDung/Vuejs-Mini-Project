<template>
  <div>
    <h3>User List</h3>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.id }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>
<script>
import UserDataService from "../../services/UserDataService";
import HelloWorld from '../HelloWorld.vue';

export default {
  components: { HelloWorld },
  name: "user-list",
  data() {
    return {
      users: [1, 2],
    };
  },
  methods: {
    getAllUsers() {
      UserDataService.getAll()
        .then((response) => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getAllUsers();
  },
};
</script>
