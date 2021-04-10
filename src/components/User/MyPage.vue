<template>
  <div class="text-center">
    <h1>HomePage</h1>
    <b-button @click="createRecipe" variant="info">レシピ投稿</b-button>
    <modal-recipe
      id="modal-recipe-create"
      title="レシピ追加"
      :recipe-data="recipe"
      @confirm-modal="confirmModal"
    ></modal-recipe>
    <template>
      <div v-html="recipe.process"></div>
    </template>
  </div>
</template>
<script>
import ModalRecipe from "../Recipe/ModalRecipe";
export default {
  name: "MyPage",
  components: {
    ModalRecipe,
  },
  data() {
    return {
      recipe: {},
    };
  },
  methods: {
    createRecipe() {
      this.recipe = {};
      this.$bvModal.show("modal-recipe-create");
    },
    confirmModal(data) {
      this.recipe = data;
      console.log("Get data from modal success");
      //Create data in here
    },
  },
};
</script>
