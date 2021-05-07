<template>
    <b-col sm="12" md="6" lg="4" class="mb-3">
        <b-card no-body :img-src="modifyImageURL()" img-alt="" class="mb-2" tag="article">
            <template #header>
                <div>
                    <div class="position-absolute" style="top: 3px; left: 15px">
                        <b-icon icon="star-fill" variant="warning" font-scale="1.5"></b-icon>
                    </div>

                    <b-card-title>{{ ranking.title }}</b-card-title>
                </div>
            </template>
            <b-card-body>
                <b-row>
                    <b-col md="12" class="mb-3">
                        <span>料理名：</span>
                        <span>{{ ranking.r_name }}</span>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="9" class="mb-3">
                        <span>作成者：</span>
                        <span>{{ ranking.user.name }}</span>
                    </b-col>
                    <b-col md="3" class="mb-3" style="text-align: right">
                        <a @click="showRecipe" class="card-link" style="color: #4691af">詳細</a>
                    </b-col>
                </b-row>
            </b-card-body>
            <b-card-footer
                >{{ ranking.created_at }}
               <div class="heart-like">
                    <span style="color: black; font-size: 18px">{{
                        modifyLikeCount(this.ranking.like_count)
                    }}</span>
                    <b-icon v-show="ranking.liked" @click="toggleLike" icon="heart-fill"></b-icon>
                    <b-icon v-show="!ranking.liked" v-on:click="toggleLike" icon="heart"></b-icon>
                </div>
            </b-card-footer>
        </b-card>
    </b-col>
</template>

<script>
import RecipeService from '../../services/RecipeService';
export default {
    props: {
        ranking: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            host: process.env.APP_BASE_URL,
        };
    },
    methods: {
        toggleLike() {
            if (this.$store.state.auth.user) {
                RecipeService.toggleLike(this.ranking.recipeid).then((response) => {
                    this.ranking.liked = response.data;
                    this.ranking.like_count += response.data ? 1 : -1;
                });
            } else {
                this.$router.push('/login');
            }
        },
        modifyImageURL() {
            if (!this.ranking.img_url.includes('http')) {
                return this.host + this.ranking.img_url;
            }
            return this.ranking.img_url;
        },
        showRecipe() {
            this.$router.push(`/recipes/${this.ranking.recipeid}`);
        },
        modifyLikeCount(value) {
            if (Math.abs(Number(value)) >= 1.0e9) {
                return (Math.abs(Number(value)) / 1.0e9).toFixed(2) + 'B';
            } else if (Math.abs(Number(value)) >= 1.0e6) {
                return (Math.abs(Number(value)) / 1.0e6).toFixed(2) + 'M';
            } else if (Math.abs(Number(value)) >= 1.0e3) {
                return (Math.abs(Number(value)) / 1.0e3).toFixed(2) + 'K';
            } else return Math.abs(Number(value));
        },
    },
};
</script>

<style scoped>
.like-count {
    color: #f05e5e;
    cursor: pointer;
}
.card {
    width: 20rem;
    padding: 3px;
    margin: auto;
}
.card-img {
    height: 200px;
}
.card-header {
    height: 8rem;
    position: relative;
    background-color: white;
}
.card-body {
    height: 6rem;
}
.card-footer {
    height: 3em;
    font-size: 12px;
    position: relative;
}
.card-title {
    font: caption;
    font-weight: bold;
    font-family: Serif;
    text-align: center;
    margin-top: 6%;
}
.heart-like {
    position: absolute;
    top: 0rem;
    right: 1.25rem;
    font-size: 1.5rem;
    color: #f86c6c;
}
</style>
