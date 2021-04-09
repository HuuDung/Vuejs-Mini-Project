<template>
  <div id="app">
    <header-nav></header-nav>
    <router-view />
    <div class="container">
      <ckeditor
        :editor="editor"
        v-model="editorData"
        :config="editorConfig"
        tag-name="textarea"
      ></ckeditor>
      <template>
        <div v-html="editorData"></div>
      </template>
    </div>
  </div>
</template>
<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import HeaderNav from "./components/Layout/Header";

export default {
  name: "App",
  components: {
    HeaderNav,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        // The configuration of the editor.
        toolbar: ["bold", "italic", "|","bulletedList", "numberedList",""],
      },
    };
  },
  methods: {},
};
</script>