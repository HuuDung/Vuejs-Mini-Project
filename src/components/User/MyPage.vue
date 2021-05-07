<template>
    <div>
        <b-container>
            <div v-show="loading" class="loader"><b-spinner label="Spinning"></b-spinner></div>
            <div v-show="!loading" class="itemContainer">
                <modal-recipe
                    id="modal-recipe-create"
                    title="レシピ追加"
                    :recipe-data="recipeObj"
                    :spice-data="spices"
                    @confirm-modal="confirmModalCreate"
                    @cancel-modal="cancelModal"
                ></modal-recipe>
                <modal-recipe
                    id="modal-recipe-edit"
                    title="レシピ編集"
                    :recipe-data="recipeObj"
                    :spice-data="spices"
                    @confirm-modal="confirmModalEdit"
                    @cancel-modal="cancelModal"
                ></modal-recipe>
                <b-modal id="delete-modal" size="xl" title="削除">
                    <div class="d-block text-center">
                        <h4>このレシピを削除したいですか？</h4>
                    </div>
                    <template #modal-footer>
                        <b-button variant="success" @click="deleteRecipe"> 同意 </b-button>
                        <b-button variant="danger" @click="cancelDeleteModal">
                            キャンセル
                        </b-button>
                    </template>
                </b-modal>
                <div id="div_border">
                    <p style="font-size: 25px; color: #4691af; margin-bottom:0;">マイページ</p>
                    <b-row>
                        <b-col md="3">
                            <div>
                                <img
                                    src="/static/images/ava.PNG"
                                    alt="Profile Image"
                                    style="max-width: 100%"
                                />
                            </div>
                        </b-col>
                        <b-col sm="8">
                            <div style="margin-top: 50px">
                                <h4>ユーザー名：{{ this.$store.state.auth.user.name }}</h4>
                                <p></p>
                                <h5>投稿数：{{ total }}</h5>
                            </div>
                        </b-col>
                    </b-row>
                </div>
                <div id="div_border">
                    <p style="font-size: 25px; color: #4691af">投稿したレシピ</p>
                    <div style="height: 50px; align-items: center; margin-left: 13px">
                        <b-row>
                            <b-col md="8" style="margin: auto">
                                <b-form inline style="padding: 2px">
                                    <b-form-input
                                        id="inline-form-input-tittle"
                                        class="mb-4 mr-sm-2 mb-sm-0"
                                        v-model="form_value"
                                        placeholder="検索入力"
                                        style="width: 315px"
                                    ></b-form-input>
                                    <b-form-select
                                        id="input-3"
                                        v-model="form_type"
                                        :options="types"
                                        required
                                        style="width: 150x; margin-left: 20px"
                                    >
                                    </b-form-select>
                                    <b-button
                                        @click="search"
                                        style="
                                            margin-left: 20px;
                                            width: 70px;
                                            background-color: #4691af;
                                        "
                                    >
                                        検索</b-button
                                    >
                                    <b-button
                                        style="
                                            margin-left: 20px;
                                            width: 70px;
                                            background-color: #657689;
                                        "
                                        @click="createRecipe"
                                    >
                                        投稿</b-button
                                    >
                                </b-form>
                            </b-col>
                            <b-col md="4" style="margin: auto">
                                <b-form inline style="margin: auto; text-align: right">
                                    <label
                                        style="
                                            width: 200px;
                                            height: 40px;
                                            border: 1px solid #bcc0c3;
                                        "
                                        ><b>表示</b>：<span>{{ total_defaul }}</span
                                        >/<span>{{ total_cards }}</span
                                        >件</label
                                    >
                                </b-form>
                            </b-col>
                        </b-row>
                    </div>
                    <item-list
                        :recipes="recipes"
                        @get-recipe-data="editRecipeData"
                        @delete-recipe="deleteRecipeModal"
                        :my-page="true"
                    ></item-list>
                </div>
                <div class="mt-3" style="height: 50px; text-color: rgb(133, 106, 11)">
                    <b-pagination
                        v-model="current_page"
                        :total-rows="total_cards"
                        :per-page="per_page"
                        @change="paging"
                        align="right"
                    ></b-pagination>
                </div>
            </div>
        </b-container>
    </div>
</template>
<script>
import ModalRecipe from '../Recipe/ModalRecipe';
import RecipeDataService from '../../services/RecipeDataService';
import RecipeService from '../../services/RecipeService';
import SpiceDataService from '../../services/SpiceDataService';
import ItemList from '../TopPage/ItemList.vue';
import moment from 'moment';

export default {
    components: { ItemList, ModalRecipe },
    data() {
        return {
            recipeObj: {},
            spices: [],
            form_value: null,
            form_type: null,
            current_page: 1,
            per_page: 18,
            total_cards: 100,
            recipes: [],
            loading: true,
            types: [{ text: 'タイトル', value: null }, '料理名'],
            total_defaul: 18,
            myself: true,
            total: 10,
        };
    },

    methods: {
        paging(val) {
            this.getAllRecipes({
                size: this.per_page,
                page: val - 1,
                keyword: this.form_value,
                type: this.form_type,
            });
        },

        search() {
            this.current_page = 1;
            this.getAllRecipes({
                size: this.per_page,
                page: this.current_page - 1,
                keyword: this.form_value,
                type: this.form_type,
            });
        },
        createRecipe() {
            this.recipeObj = {};
            this.$bvModal.show('modal-recipe-create');
        },
        confirmModalCreate(data) {
            this.recipeObj = data;
            console.log('Get data from modal success');

            let recipeData = new FormData();
            recipeData.append('title', this.recipeObj.title);
            recipeData.append('r_name', this.recipeObj.r_name);
            recipeData.append('material', this.recipeObj.material);
            recipeData.append('servings', this.recipeObj.servings);
            recipeData.append('r_process', this.recipeObj.r_process);
            recipeData.append('r_time', this.recipeObj.r_time);
            recipeData.append('img_url', this.recipeObj.img_url);

            this.recipeObj.spices.forEach(element => {
                recipeData.append('spices[]', element);
            });
            // Create data in here
            RecipeDataService.createRecipe(recipeData)
                .then(response => {
                    console.log(response);
                    this.recipeObj = {};
                    // this.$router.push(`/recipes/${response.data.recipeid}`);
                    let msg = response.data.message ? response.data.message : 'Success';
                    this.$bvToast.toast(msg, {
                        title: 'Create successful',
                        variant: 'success',
                        solid: true,
                        autoHide: 2000,
                    });
                })
                .then(() => {
                    this.getAllRecipes({
                        size: this.per_page,
                        page: 0,
                    });
                })
                .catch(error => {
                    console.log(error);
                    let msg = error.response.data.message
                        ? error.response.data.message
                        : 'An error occured';
                    this.$bvToast.toast(msg, {
                        title: 'Update Fail',
                        variant: 'danger',
                        solid: true,
                        autoHide: 2000,
                    });
                });
            // console.log(this.recipe);
        },
        getAllSpices() {
            SpiceDataService.getAll()
                .then(response => {
                    this.spices = response.data.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        editRecipeData(data) {
            this.recipeObj = data;
            RecipeDataService.findOne(this.recipeObj.recipeid).then(response => {
                this.recipeObj = response.data;
                let spices = [];
                this.recipeObj.spices.forEach(element => {
                    spices.push(element.spiceid);
                });
                this.recipeObj.spices = spices;
                this.$bvModal.show('modal-recipe-edit');
            });
        },
        confirmModalEdit(data) {
            this.recipeObj = data;
            console.log('Get data from modal success');

            let recipeData = new FormData();
            recipeData.append('title', this.recipeObj.title);
            recipeData.append('r_name', this.recipeObj.r_name);
            recipeData.append('material', this.recipeObj.material);
            recipeData.append('servings', this.recipeObj.servings);
            recipeData.append('r_process', this.recipeObj.r_process);
            recipeData.append('r_time', this.recipeObj.r_time);
            if (this.recipeObj.img_url) {
                recipeData.append('img_url', this.recipeObj.img_url);
            }

            this.recipeObj.spices.forEach(element => {
                recipeData.append('spices[]', element);
            });
            // Update data in here
            RecipeDataService.updateRecipe(this.recipeObj.recipeid, recipeData)
                .then(response => {
                    console.log(response);
                    this.recipeObj = {};
                    // this.$router.push(`/recipes/${response.data.recipeid}`);
                    let msg = response.data.message ? response.data.message : 'Success';
                    this.$bvToast.toast(msg, {
                        title: 'Update successful',
                        variant: 'success',
                        solid: true,
                        autoHide: 2000,
                    });
                })
                .then(() => {
                    this.getAllRecipes({
                        size: this.per_page,
                        page: 0,
                    });
                })
                .catch(error => {
                    console.log(error);
                    let msg = error.response.data.message
                        ? error.response.data.message
                        : 'An error occured';
                    this.$bvToast.toast(msg, {
                        title: 'Update Fail',
                        variant: 'danger',
                        solid: true,
                        autoHide: 2000,
                    });
                });
            // console.log(this.recipeObj);
        },
        cancelModal() {
            this.recipeObj = {};
        },
        getAllRecipes(params) {
            this.loading = true;
            RecipeService.getTotalRecipe(params)
                .then(response => {
                    this.total = response.data.count;
                    this.total_cards = response.data.totalItems;
                    this.recipes = response.data.data.map(item => ({
                        ...item,
                        created_at: moment(new Date(item.created_at)).format(
                            'YYYY年MM月DD日HH時MM分'
                        ),
                    }));
                    this.total_defaul =
                        (this.current_page - 1) * this.per_page + this.recipes.length;
                    this.loading = false;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        cancelDeleteModal() {
            this.recipeObj = {};
            this.$bvModal.hide('delete-modal');
        },
        deleteRecipeModal(data) {
            this.$bvModal.show('delete-modal');
            this.recipeObj = data;
            console.log(data);
        },
        deleteRecipe() {
            RecipeDataService.deleteRecipe(this.recipeObj.recipeid)
                .then(response => {
                    this.$bvModal.hide('delete-modal');
                    console.log('Delete Success');
                    this.recipeObj = {};
                    let msg = response.data.message ? response.data.message : 'Success';
                    this.$bvToast.toast(msg, {
                        title: 'Delete successful',
                        variant: 'success',
                        solid: true,
                        autoHide: 2000,
                    });
                })
                .then(() => {
                    this.getAllRecipes({
                        size: this.per_page,
                        page: 0,
                    });
                })
                .catch(error => {
                    console.log(error);
                    let msg = error.response.data.message
                        ? error.response.data.message
                        : 'An error occured';
                    this.$bvToast.toast(msg, {
                        title: 'Delete Fail',
                        variant: 'danger',
                        solid: true,
                        autoHide: 2000,
                    });
                });
        },
    },
    mounted() {
        this.getAllSpices();
        this.getAllRecipes({
            size: this.per_page,
            page: this.current_page - 1,
            keyword: this.form_value,
            type: this.form_type,
        });
    },
};
</script>
<style scoped>
div.loader {
    text-align: center;
    margin-top: 300px;
}
.spinner {
    text-align: center;
}
#div_border {
    border: 1px solid #a0a8ac;
    padding: 10px;
    margin-top: 25px;
    margin-bottom: 25px;
    background: white;
}
</style>
