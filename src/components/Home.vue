<template>
  <div class="text-center">
    <h1>HomePage</h1>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
  },
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
