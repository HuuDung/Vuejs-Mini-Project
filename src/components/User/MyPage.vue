<template>
  <div>
    <b-container>
      <div class="profile text-center">
        <h1>マイページ</h1>
        <b-button @click="createRecipe" variant="outline-success">レシピ投稿</b-button>
        <modal-recipe
          id="modal-recipe-create"
          title="レシピ追加"
          :recipe-data="recipe"
          @confirm-modal="confirmModal"
        ></modal-recipe>
      </div>

      <template class="mt-3">
        <div v-html="recipe.process"></div>
      </template>

      <div class="card-list mt-3">
        <template>
          <item-list></item-list>
        </template>
      </div>
    </b-container>
  </div>
</template>
<script>
import ModalRecipe from "../Recipe/ModalRecipe";
import ItemList from "../Recipe/ItemList";
export default {
  name: "MyPage",
  components: {
    ModalRecipe,
    ItemList,
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
      console.log(this.recipe);
    },
  },
};
</script>
