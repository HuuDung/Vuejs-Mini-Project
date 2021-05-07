<template>
    <div class="header">
        <b-navbar toggleable="lg" type="dark" class="bg-color">
            <b-navbar-brand href="/"
                ><img src="/static/images/logo.PNG" alt="Profile Image" style="width: 50px" />
                <span> お料理のたのしみ</span></b-navbar-brand
            >
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right v-if="logged">
                    <!-- Using 'button-content' slot -->
                    <template #button-content>
                        <em>{{ user.name ? user.name : 'ユーザ名' }}</em>
                    </template>
                    <b-dropdown-item @click.prevent="mypage">マイページ</b-dropdown-item>
                    <b-dropdown-item @click.prevent="logOut">ロッグアウト</b-dropdown-item>
                </b-nav-item-dropdown>
                <template v-else>
                    <b-nav-item @click.prevent="login">ログイン</b-nav-item>
                    <b-nav-item @click.prevent="register">登録</b-nav-item>
                </template>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
import AuthService from '../../services/AuthService';
export default {
    props: {
        logged: {
            type: Boolean,
            default: false,
        },
        user: {
            type: Object,
            default: null,
        },
    },
    methods: {
        login() {
            this.$router.push('/login');
        },

        logOut() {
            this.$store.dispatch('auth/logout');
            window.location.reload();
        },
        register() {
            this.$router.push('/signup');
        },
        mypage() {
            this.$router.push('/mypage');
        },
        fetchUserData() {
            if (this.$store.state.auth.status.loggedIn) {
                AuthService.refreshToken()
                    .then((response) => {
                        localStorage.setItem('user', JSON.stringify(response.data));
                        this.$store.dispatch('auth/update');
                    })
                    .catch((error) => {
                        console.log(error);
                        localStorage.removeItem('user');
                        window.location.reload();
                    });
            }
        },
    },
    created() {
        this.fetchUserData();
        setInterval(this.fetchUserData, 1000 * 60 * 5); // 5 minutes
    },
};
</script>

<style>
.navbar-brand {
    font-family: cursive;
}

.bg-color {
    background-color: #4691af;
    color: white;
}
.header {
    position: fixed;
    width: 100%;
    top: 0px;
    z-index: 99;
}
</style>
