<template>
    <b-col sm="12" md="6" lg="4" class="mb-4">
        <b-card no-body :img-src="modifyImageURL()" img-alt="" class="mb-4" tag="article">
            <template #header>
                <div>
                    <b-card-title>{{ recipe.title }}</b-card-title>
                </div>
            </template>
            <b-card-body>
                <b-row>
                    <b-col md="12" class="mb-4">
                        <span>料理名：</span>
                        <span>{{ recipe.r_name }}</span>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="9" class="mb-4">
                        <span>作成者：</span>
                        <span>{{ recipe.user.name }}</span>
                    </b-col>
                    <b-col md="3" class="mb-4" style="text-align: right">
                        <a @click="showRecipe" class="card-link" style="color: #4691af">詳細</a>
                    </b-col>
                </b-row>
            </b-card-body>
            <b-card-footer
                >{{ recipe.created_at }}
                <div class="heart-like">
                    <span style="color: black; font-size: 18px">{{
                        modifyLikeCount(this.recipe.like_count)
                    }}</span>
                    <b-icon v-show="recipe.liked" @click="toggleLike" icon="heart-fill"></b-icon>
                    <b-icon v-show="!recipe.liked" v-on:click="toggleLike" icon="heart"></b-icon>
                </div>
            </b-card-footer>
        </b-card>
        <div class="text-center mb-4" v-if="myPage">
            <b-button variant="outline-success" class="mr-4" @click="showRecipe">表示</b-button>
            <b-button variant="outline-primary" class="mr-4" @click="getRecipeData">編集</b-button>
            <b-button variant="outline-danger" @click="deleteRecipe">削除</b-button>
        </div>
    </b-col>
</template>

<script>
import RecipeService from '../../services/RecipeService';
export default {
    props: {
        recipe: {
            type: Object,
            required: true,
        },
        myPage: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            host: process.env.APP_BASE_URL,
        };
    },
    methods: {
        getRecipeData() {
            this.$emit('get-recipe-data', this.recipe);
        },
        deleteRecipe() {
            this.$emit('delete-recipe', this.recipe);
        },
        toggleLike() {
            if (this.$store.state.auth.user) {
                RecipeService.toggleLike(this.recipe.recipeid).then((response) => {
                    this.recipe.liked = response.data;
                    this.recipe.like_count += response.data ? 1 : -1;
                });
            } else {
                this.$router.push('/login');
            }
        },
        modifyImageURL() {
            if (!this.recipe.img_url.includes('http')) {
                return this.host + this.recipe.img_url;
            }
            return this.recipe.img_url;
        },
        showRecipe() {
            this.$router.push(`/recipes/${this.recipe.recipeid}`);
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
    color: #f57676;
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
