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
            <ValidationObserver ref="observer">
                <div>
                    <ValidationProvider
                        name="タイトル"
                        rules="required|max:250"
                        v-slot="{ errors, valid, validated }"
                    >
                        <b-form-group
                            label-cols-sm="4"
                            label-cols-lg="3"
                            content-cols-sm
                            label-align="center"
                            content-cols-lg="9"
                            label="タイトル"
                            label-for="recipe-title"
                        >
                            <b-form-input
                                id="recipe-title"
                                v-model="recipeData.title"
                                :state="validated ? valid : null"
                            ></b-form-input>
                            <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                    </ValidationProvider>
                </div>
                <div>
                    <ValidationProvider
                        name="料理名"
                        rules="required|max:250"
                        v-slot="{ errors, valid, validated }"
                    >
                        <b-form-group
                            label-cols-sm="4"
                            label-cols-lg="3"
                            content-cols-sm
                            label-align="center"
                            content-cols-lg="9"
                            label="料理名"
                            label-for="recipe-name"
                        >
                            <b-form-input
                                id="recipe-name"
                                v-model="recipeData.r_name"
                                :state="validated ? valid : null"
                            ></b-form-input>
                            <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                    </ValidationProvider>
                </div>
                <div>
                    <ValidationProvider
                        name="人前"
                        rules="required|max:4"
                        v-slot="{ errors, valid, validated }"
                    >
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
                                v-model="recipeData.servings"
                                :state="validated ? valid : null"
                            ></b-form-input>
                            <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                    </ValidationProvider>
                </div>
                <div>
                    <b-form-group
                        label-cols-sm="4"
                        label-cols-lg="3"
                        content-cols-sm
                        label-align="center"
                        content-cols-lg="9"
                        label="イメージ"
                        label-for="recipe-image"
                    >
                        <div v-if="recipeData.img_url" class="mb-1">
                            <img :src="modifyImageURL()" style="max-width: 100%" />
                        </div>
                        <b-form-file
                            v-model="file"
                            accept="image/jpeg, image/png, image/gif"
                            placeholder="Choose a file or drop it here..."
                            drop-placeholder="Drop file here..."
                            @change="uploadFile"
                        ></b-form-file>
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
                        label-for="recipe-material"
                    >
                        <div v-bind:class="{ 'select-invalid': !validation.material }">
                            <ckeditor
                                :editor="editor"
                                v-model="recipeData.material"
                                :config="editorConfig"
                                tag-name="textarea"
                            ></ckeditor>
                        </div>
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
                        <div v-bind:class="{ 'select-invalid': !validation.process }">
                            <ckeditor
                                :editor="editor"
                                v-model="recipeData.r_process"
                                :config="editorConfig"
                                tag-name="textarea"
                            ></ckeditor>
                        </div>
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
                        <v-select
                            multiple
                            :options="spiceData"
                            :reduce="(spiceData) => spiceData.spiceid"
                            label="name"
                            v-model="recipeData.spices"
                            v-bind:class="{ 'select-invalid': !validation.spices }"
                        >
                        </v-select>
                    </b-form-group>
                </div>
                <div>
                    <ValidationProvider
                        name="所要時間"
                        rules="required"
                        v-slot="{ errors, valid, validated }"
                    >
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
                                v-model="recipeData.r_time"
                                :state="validated ? valid : null"
                            ></b-form-input>
                            <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                    </ValidationProvider>
                </div>
            </ValidationObserver>
        </template>

        <template #modal-footer>
            <b-button variant="success" @click="confirmModal"> 保存 </b-button>
            <b-button variant="danger" @click="cancelModal"> キャンセル </b-button>
        </template>
    </b-modal>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//
import vSelect from 'vue-select';
import Vue from 'vue';
Vue.component('v-select', vSelect);
export default {
    props: {
        id: {
            type: String,
        },
        size: {
            type: String,
            default: 'xl',
        },
        headerBgVariant: {
            type: String,
            default: 'info',
        },
        headerTextVariant: {
            type: String,
            default: 'light',
        },
        bodyBgVariant: {
            type: String,
            default: 'light',
        },
        bodyTextVariant: {
            type: String,
            default: 'dark',
        },
        footerBgVariant: {
            type: String,
            default: 'light',
        },
        footerTextVariant: {
            type: String,
            default: 'dark',
        },
        title: {
            type: String,
            required: true,
        },
        recipeData: {
            type: Object,
        },
        spiceData: {
            type: [Array],
        },
    },
    data() {
        return {
            editor: ClassicEditor,
            editorConfig: {
                // The configuration of the editor.
                toolbar: ['bold', 'italic', '|', 'bulletedList', 'numberedList'],
            },
            url: '',
            file: [],
            validation: {
                spices: true,
                process: true,
                material: true,
            },
            host: process.env.APP_BASE_URL,
        };
    },
    methods: {
        async confirmModal() {
            const isValid = await this.$refs.observer.validate();
            this.fetchData();
            if (!this.recipeData.spices) {
                this.validation.spices = false;
            }
            if (!this.recipeData.r_process) {
                this.validation.process = false;
            }
            if (!this.recipeData.material) {
                this.validation.material = false;
            }
            if (
                isValid &
                this.validation.material &
                this.validation.spices &
                this.validation.process
            ) {
                if (this.file) {
                    this.recipeData.img_url = this.file;
                }
                this.$emit('confirm-modal', this.recipeData);
                this.fetchData();
                this.$bvModal.hide(this.id);
            }
        },
        cancelModal() {
            this.$emit('cancel-modal');
            this.fetchData();
            this.$bvModal.hide(this.id);
        },
        uploadFile(e) {
            this.file = e.target.files[0];
            this.recipeData.img_url = URL.createObjectURL(this.file);
        },
        fetchData() {
            this.validation = {
                spices: true,
                process: true,
                material: true,
            };
        },
        modifyImageURL() {
            if (typeof this.recipeData.img_url === 'string') {
                if (!this.recipeData.img_url.includes('http') && this.file.length === 0) {
                    return this.host + this.recipeData.img_url;
                }
            }
            return this.recipeData.img_url;
        },
        mounted() {
            this.fetchData();
        },
    },
};
</script>
<style>
@import 'vue-select/dist/vue-select.css';
.select-invalid {
    border: 1px solid red;
    border-radius: 0.25rem;
}
</style>
