<template>
  <div id="app">
    <header-nav></header-nav>
    <router-view />
  </div>
</template>
<script>
import HeaderNav from "./components/Layout/Header";

export default {
  name: "App",
  components: {
    HeaderNav,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>