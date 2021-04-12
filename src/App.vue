<template>
  <div id="app">
    <header-nav :logged="logged"></header-nav>
    <router-view></router-view>
    <footer-nav></footer-nav>
  </div>
</template>
<script>
import HeaderNav from "./components/Layout/Header";
import FooterNav from "./components/Layout/Footer";
export default {
  name: "App",
  components: {
    HeaderNav,
    FooterNav,
  },
  data() {
    return {
      logged: false,
    };
  },
  created() {
    this.loggedIn();
  },
  updated() {
    this.loggedIn();
  },
  methods: {
    loggedIn() {
      this.logged = this.$store.state.auth.status.loggedIn;
    },
  },
};
</script>
<style scoped>
 #app {
   padding-bottom: 40px;
 }
</style>