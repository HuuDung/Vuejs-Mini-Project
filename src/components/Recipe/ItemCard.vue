<template>
  <div class="mb-4">
    <b-card
      img-src="https://placekitten.com/300/300"
      img-alt="Card recipe item image"
      img-left
      class="mb-1"
      border-variant="info"
    >
      <b-card-header>
        <h4>{{ recipe.title || "" }}</h4>
      </b-card-header>
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
      <b-card-footer class="text-center">
        <b-button variant="outline-primary" class="mr-4" size="xl"
          >編集</b-button
        >
        <b-button variant="outline-danger">削除</b-button>
      </b-card-footer>
    </b-card>
  </div>
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
  padding: 10px;
}
.even {
    padding-left: 10px;
}
</style>