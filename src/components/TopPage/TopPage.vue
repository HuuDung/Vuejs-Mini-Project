<template>
    <div class="container">
        <div v-show="loading" class="loader"><b-spinner label="Spinning"></b-spinner></div>
        <div v-show="!loading" class="itemContainer">
            <div id="div_border" style="background: white">
                <p style="font-size: 25px; color: #4691af;">人気のレシピランキング</p>
                <ranking-list :rankings="rankings"></ranking-list>
            </div>

            <div id="div_border">
                <p style="font-size: 25px; color: #4691af;">レシピ一覧</p>
                <div style="height: 50px; align-items: center;  margin-left:13px;">
                    <b-row>
                        <b-col md="8" style="margin: auto">
                            <b-form inline style="padding: 2px,  ">
                                <b-form-input
                                    id="inline-form-input-tittle"
                                    class="mb-4 mr-sm-2 mb-sm-0"
                                    v-model="form_value"
                                    placeholder="検索入力"
                                    style="width: 315px;"
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
                                    v-on:click="search"
                                    style="
                                        margin-left: 20px;
                                        width: 70px;
                                        background-color: #4691af;
                                    "
                                >
                                    検索</b-button
                                >
                            </b-form>
                        </b-col>
                        <b-col md="4" style="margin: auto">
                            <b-form inline style="margin: auto; text-align:right;margin-left:17px;">
                                <label style="width: 200px; height: 40px; border: 1px solid #bcc0c3"
                                    ><b>表示</b>：<span>{{ total }}</span
                                    >/<span>{{ total_cards }}</span
                                    >件</label
                                >
                            </b-form>
                        </b-col>
                    </b-row>
                </div>
                <item-list :recipes="recipes"></item-list>
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
    </div>
</template>
<script>
import ItemList from './ItemList.vue';
import RankingList from './RankingList.vue';
import RecipeService from '../../services/RecipeService';
import moment from 'moment';

export default {
    components: { ItemList, RankingList },
    data() {
        return {
            form_value: null,
            form_type: null,
            current_page: 1,
            per_page: 18,
            total_cards: 100,
            recipes: [],
            loading: true,
            types: [{ text: 'タイトル', value: null }, '料理名'],
            total: 18,
            myself: true,
            rankings: [],
            recipesWithLike: [],
            type: null,
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
        getAllRecipes(params) {
            this.loading = true;
            RecipeService.getAll(params)
                .then(response => {
                    this.total_cards = response.data.totalItems;
                    this.recipes = response.data.data.map(item => ({
                        ...item,
                        created_at: moment(new Date(item.created_at)).format(
                            'YYYY年MM月DD日HH時MM分'
                        ),
                    }));
                    this.total = (this.current_page - 1) * this.per_page + this.recipes.length;
                    this.loading = false;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getAllRanking() {
            this.loading = true;
            RecipeService.getRanking()
                .then(response => {
                    this.rankings = response.data.map(item => ({
                        ...item,
                        created_at: moment(new Date(item.created_at)).format(
                            'YYYY年MM月DD日HH時MM分'
                        ),
                    }));
                })
                .catch(e => {
                    console.log(e);
                });
        },
        async init() {
            this.loading = true;
            await RecipeService.getRanking()
                .then(response => {
                    this.rankings = response.data.map(item => ({
                        ...item,
                        created_at: moment(new Date(item.created_at)).format(
                            'YYYY年MM月DD日HH時MM分'
                        ),
                    }));
                })
                .catch(e => {
                    console.log(e);
                });
            await RecipeService.getAll({
                size: this.per_page,
                page: this.current_page - 1,
                keyword: this.form_value,
                type: this.form_type,
            })
                .then(response => {
                    this.total_cards = response.data.totalItems;
                    this.recipes = response.data.data.map(item => ({
                        ...item,
                        created_at: moment(new Date(item.created_at)).format(
                            'YYYY年MM月DD日HH時MM分'
                        ),
                    }));
                    this.total = (this.current_page - 1) * this.per_page + this.recipes.length;
                    this.loading = false;
                })
                .catch(e => {
                    console.log(e);
                });
            this.loading = false;
        },
    },
    mounted() {
        this.init();
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
    margin-top: 50px;
    margin-bottom: 25px;
    background: white;
    border-radius: 0.5rem;
}
</style>
