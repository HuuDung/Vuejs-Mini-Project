<template>
    <b-container class="admin-dashboard">
        <b-row class="mt-5">
            <b-col sm="3">
                <div class="mb-3">
                    <b-button
                        squared
                        block
                        size="lg"
                        variant="outline-primary"
                        :pressed="model === 'user'"
                        v-on:click="changeModel('user')"
                        >ユーザー一覧</b-button
                    >
                </div>
            </b-col>
            <b-col sm="3">
                <div>
                    <b-button
                        squared
                        block
                        size="lg"
                        variant="outline-primary"
                        :pressed="model === 'recipe'"
                        v-on:click="changeModel('recipe')"
                        >レシピ一覧</b-button
                    >
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <user-table v-if="model === 'user'" />
                <recipe-table v-else-if="model === 'recipe'" />
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import UserTable from './UserTable';
import RecipeTable from './RecipeTable';

export default {
    components: { UserTable, RecipeTable },
    data() {
        return {
            model: 'user',
        };
    },
    methods: {
        changeModel(model) {
            this.model = model;
        },
    },
};
</script>
