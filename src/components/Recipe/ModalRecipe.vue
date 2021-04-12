<template>
  <b-modal
    scrollable
    :id="id"
    :size="size"
    :header-bg-variant="headerBgVariant"
    :header-text-variant="headerTextVariant"
    :body-bg-variant="bodyBgVariant"
    :body-text-variant="bodyTextVariant"
    :footer-bg-variant="footerBgVariant"
    :footer-text-variant="footerTextVariant"
  >
    <template #modal-header>
      <!-- Emulate built in modal header close button action -->
      <h5>{{ title }}</h5>
    </template>

    <template #default>
      <div>
        <b-form-group
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          label-align="center"
          content-cols-lg="9"
          label="タイトル"
          label-for="recipe-title"
        >
          <b-form-input id="recipe-title" v-model="recipe.title"></b-form-input>
        </b-form-group>
      </div>
      <div>
        <b-form-group
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          label-align="center"
          content-cols-lg="9"
          label="料理名"
          label-for="recipe-name"
        >
          <b-form-input id="recipe-name" v-model="recipe.name"></b-form-input>
        </b-form-group>
      </div>
      <div>
        <b-form-group
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          label-align="center"
          content-cols-lg="9"
          label="材料"
          label-for="recipe-food"
        >
          <ckeditor
            :editor="editor"
            v-model="recipe.foods"
            :config="editorConfig"
            tag-name="textarea"
          ></ckeditor>
        </b-form-group>
      </div>
      <div>
        <b-form-group
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          label-align="center"
          content-cols-lg="9"
          label="手順"
          label-for="recipe-process"
        >
          <ckeditor
            :editor="editor"
            v-model="recipe.process"
            :config="editorConfig"
            tag-name="textarea"
          ></ckeditor>
        </b-form-group>
      </div>
      <div>
        <b-form-group
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          label-align="center"
          content-cols-lg="9"
          label="調味料"
          label-for="recipe-spice"
        >
          <b-form-input id="recipe-spice" v-model="recipe.spices"></b-form-input>
        </b-form-group>
      </div>
      <div>
        <b-form-group
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          label-align="center"
          content-cols-lg="9"
          label="何人前"
          label-for="recipe-servings"
        >
          <b-form-input
            id="recipe-servings"
            type="number"
            min="0"
            v-model="recipe.servings"
          ></b-form-input>
        </b-form-group>
      </div>
      <div>
        <b-form-group
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          label-align="center"
          content-cols-lg="9"
          label="所要時間"
          label-for="recipe-time"
        >
          <b-form-input
            id="recipe-time"
            type="time"
            v-model="recipe.time"
          ></b-form-input>
        </b-form-group>
      </div>
    </template>

    <template #modal-footer>
      <b-button variant="success" @click="confirmModal()"> 追加 </b-button>
      <b-button variant="danger" @click="cancelModal()"> キャンセル </b-button>
    </template>
  </b-modal>
</template>
<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  props: {
    id: {
      type: String,
    },
    size: {
      type: String,
      default: "xl",
    },
    headerBgVariant: {
      type: String,
      default: "info",
    },
    headerTextVariant: {
      type: String,
      default: "light",
    },
    bodyBgVariant: {
      type: String,
      default: "light",
    },
    bodyTextVariant: {
      type: String,
      default: "dark",
    },
    footerBgVariant: {
      type: String,
      default: "light",
    },
    footerTextVariant: {
      type: String,
      default: "dark",
    },
    title: {
      type: String,
      required: true,
    },
    recipeData: {
      type: Object,
    },
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
        toolbar: ["bold", "italic", "|", "bulletedList", "numberedList"],
      },
      recipe: {},
    };
  },
  computed: {
    fetchRecipe() {
      this.recipe = this.recipeData;
    },
  },
  updated() {
    this.fetchRecipe();
  },
  methods: {
    confirmModal() {
      this.$emit("confirm-modal", this.recipe);
      this.$bvModal.hide(this.id);
    },
    cancelModal() {
      this.recipe = this.recipeData;
      this.$bvModal.hide(this.id);
    },
  },
};
</script>
