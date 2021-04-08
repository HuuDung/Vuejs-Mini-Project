<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/">レシピ</b-navbar-brand>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="logged">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item @click.prevent="logOut">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
          <template v-else>
            <b-nav-item @click.prevent="login">Login</b-nav-item>
            <b-nav-item @click.prevent="register">Register</b-nav-item>
          </template>
        </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
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
    register() {
      this.$router.push("/signup");
    },
  },
};
</script>

<style>
</style>