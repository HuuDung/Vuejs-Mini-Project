<template>
  <div class="home">
    <h1>HomePage</h1>
    <a v-if="logged" @click.prevent="logOut"><button>Logout</button></a>
    <a v-else @click.prevent="login"><button>Login</button></a>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      logged: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    this.logged = this.loggedIn;
  },
  methods: {
    login() {
      this.$router.push("/login");
    },

    logOut() {
      this.$store.dispatch("auth/logout");
      window.location.reload();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
