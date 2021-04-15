<template>
    <b-col md="4">
        <b-card
            class="mb-3 line-break"
            border-variant="info"
            img-src="https://placekitten.com/300/300"
            img-alt="Image"
            img-top
        >
            <b-card-title class="text-center">
                <h4>{{ recipe.title || '' }}</h4>
            </b-card-title>
            <b-card-text class="mt-4">
                <div>
                    <label for="" class="font-weight-bold">料理名:</label>
                    <label for="">{{ recipe.name }}</label>
                </div>
                <div>
                    <label for="" class="font-weight-bold">材料:</label>
                    <label for="">{{ recipe.foods }}</label>
                </div>
                <div>
                    <label for="" class="font-weight-bold">調味料:</label>
                    <label for="">{{ recipe.spices }}</label>
                </div>
                <div>
                    <label for="" class="font-weight-bold">何人前:</label>
                    <label for="">{{ recipe.servings }}</label>
                </div>
                <div>
                    <label for="" class="font-weight-bold">所要時間:</label>
                    <label for="">{{ recipe.time }}</label>
                </div>
            </b-card-text>
            <div class="heart-like" v-if="!recipe.myself">
                <b-icon
                    icon="heart-fill"
                    v-if="recipe.liked"
                    @click="recipe.liked = !recipe.liked"
                ></b-icon>
                <b-icon icon="heart" v-else @click="recipe.liked = !recipe.liked"></b-icon>
            </div>
        </b-card>
        <div class="text-center mb-4">
            <b-button variant="outline-success" class="mr-4">表示</b-button>
            <b-button variant="outline-primary" class="mr-4" size="xl">編集</b-button>
            <b-button variant="outline-danger">削除</b-button>
        </div>
    </b-col>
</template>
<script>
export default {
    props: {
        recipe: {
            type: [Object],
        },
    },
    data() {
        return {};
    },
};
</script>
<style scoped>
.card-header {
    padding-top: 0rem;
    padding-bottom: 0.5rem;
}
.card-footer {
    padding-top: 0.75rem;
    padding-bottom: 0rem;
}
.card img {
    margin: auto;
    max-height: 200px;
}
.line-break {
    line-break: anywhere;
}
.card {
    height: 500px;
    overflow: auto;
}
.heart-like {
    position: absolute;
    top: 0.25rem;
    right: 0.75rem;
    font-size: 2rem;
    color: red;
}
</style>
