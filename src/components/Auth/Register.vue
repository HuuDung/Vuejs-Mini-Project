<template>
    <div class="col-md-12">
        <div class="card card-container">
            <img
                id="profile-img"
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                class="profile-img-card"
            />
            <form name="form" @submit.prevent="handleRegister">
                <div>
                    <div class="form-group">
                        <label for="username">ユーザー名</label>
                        <input v-model="user.name" type="text" class="form-control" name="name" />
                        <div v-if="submitted && errors.name" class="alert-danger mt-2">
                            {{ errors.name[0] }}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="email">メール</label>
                        <input
                            v-model="user.email"
                            type="email"
                            class="form-control"
                            name="email"
                        />
                        <div v-if="submitted && errors.email" class="alert-danger mt-2">
                            {{ errors.email[0] }}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password">パスワード</label>
                        <input
                            v-model="user.password"
                            type="password"
                            class="form-control"
                            name="password"
                        />
                        <div v-if="submitted && errors.password" class="alert-danger mt-2">
                            {{ errors.password[0] }}
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block">登録</button>
                    </div>
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
            submitted: false,
            message: '',
            errors: {
                email: [],
                password: [],
                name: [],
            },
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    created() {
        if (this.loggedIn) {
            this.$router.push('/');
        }
    },
    methods: {
        handleRegister() {
            this.message = '';
            this.submitted = true;
            this.$store.dispatch('auth/register', this.user).then(
                (data) => {
                    this.message = data.message;
                    this.$router.push('/login');
                },
                (error) => {
                    this.message =
                        (error.response && error.response.data.message) ||
                        error.message ||
                        error.toString();
                    this.$bvToast.toast(this.message, {
                        title: '登録失敗',
                        variant: 'danger',
                        solid: true,
                        autoHide: 2000,
                    });
                    this.errors = error.response.data.errors;
                }
            );
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
