<template>
    <div class="container">
        <b-row class="mt-5">
            <ul>
                <li
                    v-for="comment in this.comments.slice(0, this.displayed_comments_count)"
                    :key="comment.comment_id"
                >
                    <b>{{ comment.user_name }}</b
                    >: {{ comment.c_content }}
                    <ul>
                        <li v-for="reply in comment.replies" :key="reply.reply_id">
                            <b>{{ reply.user_name }}</b
                            >: {{ reply.r_content }}
                        </li>
                    </ul>
                </li>
            </ul>
        </b-row>
        <b-row>
            <a href="#" @click="view_more">もっと見る</a>
        </b-row>
    </div>
</template>
<script>
export default {
    name: 'Comment',
    components: {},
    data() {
        return {
            displayed_comments_count: 2,
            comments: [
                {
                    user_name: 'Đỗ Thị Hải',
                    c_content: 'tuyet voi, chuc binh an hanh phuc',
                    comment_id: 1,
                    replies: [
                        {
                            reply_id: 1,
                            user_name: 'Đỗ Thị Hải',
                            r_content: 'tuyet voi, chuc binh an hanh phuc',
                        },
                        {
                            reply_id: 2,
                            user_name: 'Lê Công Hậu',
                            r_content: 'tuyet voi, chuc binh an hanh phuc',
                        },
                    ],
                },
                {
                    user_name: 'Lê Công Hậu',
                    c_content: 'tuyet voi, chuc binh an hanh phuc',
                    comment_id: 2,
                    replies: [
                        {
                            reply_id: 3,
                            user_name: 'Đỗ Thị Hải',
                            r_content: 'tuyet voi, chuc binh an hanh phuc',
                        },
                        {
                            reply_id: 4,
                            user_name: 'Lê Công Hậu',
                            r_content: 'tuyet voi, chuc binh an hanh phuc',
                        },
                    ],
                },

                {
                    user_name: 'Nguyen Thi Kieu Thuong',
                    c_content: 'da lam theo va thanh cong',
                    comment_id: 3,
                    replies: [
                        {
                            reply_id: 5,
                            user_name: 'Hoang The Anh',
                            r_content: 'cong thuc rat hay',
                        },
                        {
                            reply_id: 6,
                            user_name: 'Nguyen Huu Dung',
                            r_content: 'cong thuc rat tuyet',
                        },
                    ],
                },
            ],
        };
    },
    created() {
        // console.log("RecipeId", this.$route.params.recipe_id);
    },
    // Noi viet cac ham se dung cho template, @click="function_nao_do"
    methods: {
        view_more() {
            this.displayed_comments_count++;
        },
    },
};
</script>
