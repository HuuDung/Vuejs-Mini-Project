<template>
    <div class="container">
        <b-row class="mt-5">
            <b-col lg="6" style="padding: 0px">
                <div style="position: relative">
                    <img
                        :src="this.recipe.image"
                        :alt="this.recipe.title"
                        style="max-width: 100%"
                    />
                </div>
            </b-col>
            <b-col md="6">
                <div>
                    <h2>{{ this.recipe.title }}</h2>
                    <h3>{{ this.recipe.name }}</h3>
                    <h6>{{ this.recipe.creator }}</h6>
                    <h6>
                        {{ this.likecount }}
                        <span style="color: red; cursor: pointer" @click="like">{{
                            this.liked ? '♥' : '♡'
                        }}</span>
                    </h6>
                </div>
            </b-col>
        </b-row>
        <b-row class="container">
            <comment></comment>
        </b-row>
    </div>
</template>
<script>
// import ModalRecipe from './ModalRecipe';
import Comment from './Comment';
export default {
    name: 'Detail',
    components: { Comment },
    data() {
        return {
            recipe: {
                title: 'タラコとバター、卵黄で病みつきの味に！',
                user_id: '123',
                name: 'タラコ卵バターご飯',
                intro: 'タラコとバター、卵黄で病みつきの味に！',
                servings: 2,
                image: '/static/images/banhkem.jpg',
                /* eslint-disable */
                material: `タラコ　1/2～1腹
卵黄　2個分
ご飯(炊きたて)茶碗　2杯分
バター　10g
刻みのり　適量
しょうゆ　適量`,
                process: `1　タラコは切り込みを入れ、中身をしごき出す。バターは常温にもどす。
2　器にご飯をよそってバターを押し込み、タラコと卵黄をのせる。刻みのりを散らし、お好みでしょうゆを添える。`,
                creator: 'hai',
            },
            likecount: 100,
            liked: false,
        };
    },
    created() {
        console.log('RecipeId', this.$route.params.recipe_id);
    },
    // Noi viet cac ham se dung cho template, @click="function_nao_do"
    methods: {
        like() {
            if (this.liked) {
                this.likecount--;
            } else {
                this.likecount++;
            }
            this.liked = !this.liked;
        },
    },
};
</script>
