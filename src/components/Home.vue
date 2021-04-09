<template>
  <div class="container">
    <h1>HomePage</h1>
    <div class=" text-center">
      <div>
        <b-button @click="$bvModal.show('modal-scoped')" variant="info"
          >Open Modal</b-button
        >
        <b-modal
          id="modal-scoped"
          size="xl"
          header-bg-variant="info"
          header-text-variant="light"
        >
          <template #modal-header>
            <h3>レシピ作成</h3>
          </template>

          <template #default>
            <div class="form-group">
              <p>材料</p>
              <ckeditor
                :editor="editor"
                v-model="recipe.spices"
                :config="editorConfig"
                tag-name="textarea"
              ></ckeditor>
            </div>
            <div class="form-group">
              <p>手順</p>
              <ckeditor
                :editor="editor"
                v-model="recipe.process"
                :config="editorConfig"
                tag-name="textarea"
              ></ckeditor>
            </div>
          </template>

          <template #modal-footer="{ ok, cancel }">
            <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-button size="" variant="success" @click="ok()"> 追加 </b-button>
            <b-button size="" variant="danger" @click="cancel()">
              キャンセル
            </b-button>
          </template>
        </b-modal>
      </div>
    </div>
    <div>
      <template>
        <p>材料</p>
        <div v-html="recipe.spices"></div>
        <p>手順</p>
        <div v-html="recipe.process"></div>
      </template>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  name: "Home",
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
        toolbar: ["bold", "italic", "|", "bulletedList", "numberedList"],
      },
      recipe: {
        process: "",
        spices: "",
      },
      logged: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    this.logged = this.loggedIn;
  },
  methods: {
    login() {
      this.$router.push("/login");
    },

    logOut() {
      this.$store.dispatch("auth/logout");
      window.location.reload();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
