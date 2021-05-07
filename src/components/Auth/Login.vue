<template>
    <div class="col-md-12">
        <div class="card card-container">
            <img
                id="profile-img"
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                class="profile-img-card"
            />
            <form name="form" @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="username">メール</label>
                    <input v-model="user.email" type="text" class="form-control" name="email" />
                </div>
                <div class="form-group">
                    <label for="password">パスワード</label>
                    <input
                        v-model="user.password"
                        type="password"
                        class="form-control"
                        name="password"
                    />
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block" :disabled="loading">
                        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                        <span>ログイン</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
            loading: false,
            message: '',
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    created() {
        if (this.loggedIn) {
            // console.log('User has been logged');
            this.$router.push('/');
        }
    },
    methods: {
        handleLogin() {
            this.loading = true;
            if (this.user.email && this.user.password) {
                this.$store.dispatch('auth/login', this.user).then(
                    () => {
                        if (this.$store.state.auth.user.role === '1') {
                            this.$router.push('/admin');
                        } else this.$router.push('/');
                    },
                    (error) => {
                        this.loading = false;
                        this.message =
                            (error.response && error.response.data.message) ||
                            error.message ||
                            error.toString();
                        this.$bvToast.toast(this.message, {
                            title: 'ログイン失敗',
                            variant: 'danger',
                            solid: true,
                            autoHide: 2000,
                        });
                    }
                );
            } else {
                this.loading = false;
                this.message = '無効なユーザー';
                this.$bvToast.toast(this.message, {
                    title: 'ログイン失敗',
                    variant: 'danger',
                    solid: true,
                    autoHide: 2000,
                });
            }
        },
    },
};
</script>

<style scoped>
label {
    display: block;
    margin-top: 10px;
}

.card-container.card {
    max-width: 350px !important;
    padding: 40px 40px;
}

.card {
    background-color: #f7f7f7;
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 50px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}
</style>
