<template>
  <div id="app" class="d-flex flex-column">
    <header-nav></header-nav>
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
    FooterNav
  },
  methods: {},
};
</script>
