<template>
    <div>
        <b-row>
            <item-card
                v-for="recipe in recipes"
                :recipe="recipe"
                :key="recipe.id"
                @get-recipe-data="getRecipeData"
            ></item-card>
        </b-row>
    </div>
</template>
<script>
import ItemCard from './ItemCard';
export default {
    components: {
        ItemCard,
    },
    data() {
        return {
            recipes: [
                {
                    recipeid: 434948,
                    title: 'タイトル',
                    r_name: '料理dasfasdfasdfasdadfdsafasdfasdfasdfa',
                    material: '<p>材料</p>',
                    spices: [1, 2],
                    servings: 3,
                    r_time: '11:00',
                    r_process: '<p>process</p>',
                    img_url: 'http://localhost:8080/images/IMG_2230.jpg',
                    liked: true,
                    myself: false,
                },
                {
                    id: 2,
                    title: 'タイトル',
                    foods: '材料',
                    name: '料理名',
                    spices: '調味料',
                    servings: '何人前',
                    time: '所要時間',
                    liked: false,
                    myself: true,
                },
                {
                    id: 3,
                    title: 'タイトル',
                    name: '料理名',
                    foods: '材料',
                    spices: '調味料',
                    servings: '何人前',
                    time: '所要時間',
                    liked: false,
                    myself: true,
                },
                {
                    id: 4,
                    title: 'タイトル',
                    name: '料理名',
                    foods: '材料',
                    spices: '調味料',
                    servings: '何人前',
                    time: '所要時間',
                    liked: true,
                    myself: true,
                },
                {
                    id: 5,
                    title: 'タイトル',
                    name: '料理名',
                    foods: '材料',
                    spices: '調味料',
                    servings: '何人前',
                    time: '所要時間',
                    liked: false,
                    myself: true,
                },
                {
                    id: 6,
                    title: 'タイトル',
                    name: '料理名',
                    foods: '材料',
                    spices: '調味料',
                    servings: '何人前',
                    time: '所要時間',
                    liked: true,
                    myself: true,
                },
            ],
        };
    },
    methods: {
        getRecipeData(data) {
            this.$emit('get-recipe-data', data);
        },
    },
};
</script>
