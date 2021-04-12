<template>
  <b-col md="6">
    <b-card class="mb-3 line-break" border-variant="info">
      <b-card-title>
        <h4>{{ recipe.title || "" }}</h4>
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
      <b-card-footer class="text-center bg-white">
        <b-button variant="outline-primary" class="mr-4" size="xl"
          >編集</b-button
        >
        <b-button variant="outline-danger">削除</b-button>
      </b-card-footer>
    </b-card>
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
  padding: 0.5rem;
  max-width: 300px;
  max-height: 300px;
}
.line-break {
  line-break: anywhere;
}
.card {
  height: 400px;
}
</style>