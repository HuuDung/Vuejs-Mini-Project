<template>
    <div>
        <div v-show="loading" class="loader"><b-spinner label="Spinning"></b-spinner></div>
        <div v-show="!loading">
            <div>
                <b-form-input
                    @keyup.enter="searchData"
                    v-model="search_key"
                    placeholder="検索"
                ></b-form-input>
            </div>
            <b-table striped show-empty :items="items" :fields="fields">
                <template #cell(delete_flag)="data">
                    <b-button
                        @click="changeStatus(data)"
                        v-if="data.item.delete_flag"
                        block
                        size="sm"
                        variant="danger"
                        >削除済</b-button
                    >
                    <b-button
                        @click="changeStatus(data)"
                        v-else
                        size="sm"
                        block
                        variant="outline-danger"
                        >削除</b-button
                    >
                </template>
            </b-table>
            <b-row>
                <b-col sm="4">
                    <b-form inline>
                        <b-form-select @change="changePerPage" v-model="perPage" :options="options">
                        </b-form-select
                        ><span> 件／ページ</span>
                    </b-form>
                </b-col>
                <b-col sm="8"
                    ><b-pagination
                        size="md"
                        :total-rows="totalItems"
                        v-model="currentPage"
                        :per-page="perPage"
                        prev-text="前"
                        next-text="次"
                        align="right"
                        @change="paging"
                    ></b-pagination
                ></b-col>
            </b-row>
        </div>
    </div>
</template>
<script>
import UserService from '../../services/UserService';
import moment from 'moment';
export default {
    data() {
        return {
            loading: true,
            search_key: null,
            currentPage: 1,
            perPage: 5,
            totalItems: 0,
            items: [],
            options: [
                { value: 5, text: '5' },
                { value: 10, text: '10' },
                { value: 20, text: '20' },
                { value: 50, text: '50' },
                { value: 100, text: '100' },
            ],
            fields: [
                {
                    label: 'ID',
                    key: 'id',
                },
                {
                    label: '氏名',
                    key: 'name',
                },
                {
                    label: 'メール',
                    key: 'email',
                },
                {
                    label: '作成日時',
                    key: 'created_at',
                },
                {
                    label: '状態',
                    key: 'delete_flag',
                },
            ],
        };
    },
    methods: {
        getUsers(req) {
            this.loading = true;
            UserService.getAll(req)
                .then((response) => {
                    if (response.data) {
                        this.items = response.data.rows;
                        this.items = response.data.rows.map((item, index) => {
                            return {
                                id: (this.currentPage - 1) * this.perPage + index + 1,
                                userid: item.userid,
                                name: item.name,
                                email: item.email,
                                created_at: moment(new Date(item.created_at)).format(
                                    'YYYY/MM/DD  HH:mm:ss'
                                ),
                                delete_flag: item.delete_flag,
                            };
                        });
                        this.totalItems = response.data.count;
                        this.loading = false;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        paging(page) {
            this.getUsers({
                search_key: this.search_key,
                size: this.perPage,
                page: page - 1,
            });
        },
        changeStatus(data) {
            let confirmMsg = '削除しますか?';
            if (data.item.delete_flag) {
                confirmMsg = '解除しますか?';
            }
            if (confirm(confirmMsg)) {
                UserService.delete(data.item.userid)
                    .then((response) => {
                        if (response.status === 200) {
                            this.items[data.index].delete_flag = !data.item.delete_flag;
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        },
        searchData() {
            this.getUsers({
                search_key: this.search_key,
                size: this.perPage,
                page: this.currentPage - 1,
            });
        },
        changePerPage(value) {
            this.getUsers({
                search_key: this.search_key,
                size: value,
                page: this.currentPage - 1,
            });
        },
    },
    mounted() {
        this.getUsers({
            search_key: this.search_key,
            size: this.perPage,
            page: this.currentPage - 1,
        });
    },
};
</script>
<style scoped>
.loader {
    text-align: center;
    margin-top: 300px;
}
</style>
