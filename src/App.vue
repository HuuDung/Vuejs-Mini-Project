<template>
    <div id="app">
        <header-nav :logged="logged" :user="user"></header-nav>
        <div style="margin-top: 140px">
            <router-view></router-view>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>
<script>
import HeaderNav from './components/Layout/Header';
import FooterNav from './components/Layout/Footer';
export default {
    name: 'App',
    components: {
        HeaderNav,
        FooterNav,
    },
    data() {
        return {
            logged: false,
            user: {},
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
            this.user = this.$store.state.auth.user;
        },
    },
};
</script>
<style scoped>
#app {
    padding-bottom: 80px;
}
</style>
