<template>
    <div class="mt-4">
        <b-row>
            <recipe
                v-for="recipe of recipes"
                :recipe="recipe"
                :key="recipe.id"
                @get-recipe-data="getRecipeData"
                @delete-recipe="deleteRecipe"
                :my-page="myPage"
            ></recipe>
        </b-row>
    </div>
</template>
<script>
import Recipe from './ItemCard';
export default {
    components: { Recipe },
    props: {
        recipes: [Array, Object],
        myPage: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        getRecipeData(data) {
            this.$emit('get-recipe-data', data);
        },
        deleteRecipe(data) {
            this.$emit('delete-recipe', data);
        },
    },
};
</script>
