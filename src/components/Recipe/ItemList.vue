<template>
  <div>
    <b-row>
      <item-card
        v-for="recipe in recipes"
        :recipe="recipe"
        :key="recipe.id"
      ></item-card>
    </b-row>
  </div>
</template>
<script>
import ItemCard from "./ItemCard";
export default {
  components: {
    ItemCard,
  },
  data() {
    return {
      recipes: [
        {
          id: 1,
          title: "タイトル",
          name: "料理dasfasdfasdfasdadfdsafasdfasdfasdfa",
          foods: "材料",
          spices: "調味料",
          servings: "何人前",
          time: "所要時間",
        },
        {
          id: 2,
          title: "タイトル",
          foods: "材料",
          name: "料理名",
          spices: "調味料",
          servings: "何人前",
          time: "所要時間",
        },
        {
          id: 3,
          title: "タイトル",
          name: "料理名",
          foods: "材料",
          spices: "調味料",
          servings: "何人前",
          time: "所要時間",
        },
        {
          id: 4,
          title: "タイトル",
          name: "料理名",
          foods: "材料",
          spices: "調味料",
          servings: "何人前",
          time: "所要時間",
        },
        {
          id: 5,
          title: "タイトル",
          name: "料理名",
          foods: "材料",
          spices: "調味料",
          servings: "何人前",
          time: "所要時間",
        },
        {
          id: 6,
          title: "タイトル",
          name: "料理名",
          foods: "材料",
          spices: "調味料",
          servings: "何人前",
          time: "所要時間",
        },
      ],
    };
  },
};
</script>