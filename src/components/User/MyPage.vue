<template>
    <div>
        <b-container>
            <div class="profile text-center mt-2">
                <h1><i class="bi bi-heart"></i>マイページ</h1>

                <modal-recipe
                    id="modal-recipe-create"
                    title="レシピ追加"
                    :recipe-data="recipe"
                    @confirm-modal="confirmModal"
                ></modal-recipe>
            </div>
            <b-row class="mt-4">
                <b-col md="12">
                    <b-row>
                        <b-col sm="3">
                            <div>
                                <img
                                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                    alt="Profile Image"
                                    style="max-width: 100%"
                                />
                            </div>
                        </b-col>
                        <b-col sm="9">
                            <div>
                                <h4>グエン・フウ・ズン</h4>
                                <p>投稿数:</p>
                            </div>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <div class="mb-3 text-center">
                <h3>投稿したレシピ</h3>
            </div>
            <b-row class="mt-3">
                <b-col sm="4">
                    <b-form-group>
                        <b-form-input placeholder="入力してください"> </b-form-input>
                    </b-form-group>
                </b-col>
                <b-col sm="4">
                    <b-form-group>
                        <b-form-select :options="options"> </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col sm="4">
                    <b-button variant="primary">検索</b-button>
                    <b-button @click="createRecipe" variant="outline-success">レシピ投稿</b-button>
                </b-col>
            </b-row>

            <b-row>
                <b-col sm="12">
                    <b-form-group>
                        <label for=""><b>表示</b>：18/50件</label>
                    </b-form-group>
                </b-col>
            </b-row>
            <div class="card-list mt-3">
                <template>
                    <item-list></item-list>
                </template>
            </div>
        </b-container>
    </div>
</template>
<script>
import ModalRecipe from '../Recipe/ModalRecipe';
import ItemList from '../Recipe/ItemList';
export default {
    name: 'MyPage',
    components: {
        ModalRecipe,
        ItemList,
    },
    data() {
        return {
            recipe: {},
            options: ['タイトル', '料理名', '人前'],
        };
    },
    methods: {
        createRecipe() {
            this.recipe = {};
            this.$bvModal.show('modal-recipe-create');
        },
        confirmModal(data) {
            this.recipe = data;
            console.log('Get data from modal success');
            // Create data in here
            console.log(this.recipe);
        },
    },
};
</script>
