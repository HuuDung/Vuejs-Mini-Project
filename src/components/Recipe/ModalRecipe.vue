<template>
  <b-modal
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
        <p>手順</p>
        <ckeditor
          :editor="editor"
          v-model="recipe.process"
          :config="editorConfig"
          tag-name="textarea"
        ></ckeditor>
      </div>
    </template>

    <template #modal-footer="{ cancel }">
      <b-button variant="success" @click="confirmModal()"> 追加 </b-button>
      <b-button variant="danger" @click="cancel()"> キャンセル </b-button>
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
    recipe: {
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
    };
  },
  methods: {
    confirmModal(a) {
      this.$emit("confirm-modal", this.recipe);
      this.$bvModal.hide(this.id);
    },
  },
};
</script>
