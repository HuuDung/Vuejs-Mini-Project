<template>
    <div class="container">
        <b-row class="mt-3">
            <div style="width: 100%">
                <div class="d-flex justify-content-between">
                    <h3>コメント</h3>
                    <b-form inline style="margin-bottom: 0.5rem">
                        <b-form-select @change="changePerPage" v-model="perPage" :options="options">
                        </b-form-select
                        ><span> 数／コメント</span>
                    </b-form>
                </div>

                <div>
                    <input
                        v-model="newComment"
                        type="text"
                        class="input-comment"
                        placeholder="コメントを入力"
                    />
                    <div class="b-group" v-if="newComment">
                        <b-button @click="createComment" variant="outline-success" class="mr-4"
                            >送信</b-button
                        >
                        <b-button @click="newComment = ''" variant="outline-danger" class="mr-4"
                            >キャンセル</b-button
                        >
                    </div>
                </div>
                <div>
                    <comment-card
                        ref="child"
                        v-for="comment in comments"
                        :comment="comment"
                        :key="comment.comment_id"
                    ></comment-card>
                    <div class="d-flex justify-content-between mt-3">
                        <a
                            class="mr-3"
                            v-if="previousPageUrl"
                            @click="getOldComment"
                            style="cursor: pointer"
                            >...前のコメントに戻る</a
                        >
                        <a v-else></a>
                        <a
                            class="mr-3"
                            v-if="nextPageUrl"
                            @click="getNewComment"
                            style="cursor: pointer"
                            >次のコメントを見る...
                        </a>
                    </div>
                </div>
            </div>
        </b-row>
    </div>
</template>
<script>
import CommentCard from './CommentCard';
import CommentDataService from '../../services/CommentDataService';
export default {
    name: 'Comment',
    components: { CommentCard },
    props: {
        comments: {
            type: [Array, Object],
        },
        nextPageUrl: {
            default: null,
        },
        previousPageUrl: {
            default: null,
        },
        perPage: {
            type: Number,
        },
    },
    data() {
        return {
            newComment: null,
            readMoreActivated: false,
            options: [
                { value: 3, text: '3' },
                { value: 5, text: '5' },
                { value: 10, text: '10' },
                { value: 20, text: '20' },
                { value: 50, text: '50' },
            ],
        };
    },
    methods: {
        activateReadMore() {
            this.readMoreActivated = true;
        },
        getOldComment() {
            this.$emit('get-old-comment');
        },
        getNewComment() {
            this.$emit('get-new-comment');
        },
        createComment() {
            if (this.$store.state.auth.user) {
                let data = {
                    recipeid: this.$route.params.id,
                    content: this.newComment,
                };
                CommentDataService.create(data)
                    .then((response) => {
                        this.comment = response.data;
                        this.newComment = null;
                        this.$emit('get-first-comment');
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            } else {
                this.$router.push('/login');
            }
        },
        changePerPage() {
            this.$emit('change-per-page', this.perPage);
        },
    },
    updated() {
        if (this.$refs.child) {
            this.$refs.child.forEach((element) => {
                element.getAllReplies();
            });
        }
    },
};
</script>
<style>
.comment-block {
    margin: 5px;
    padding: 5px;
    border: 1px gray solid;
    border-radius: 10px;
    box-shadow: 3px 0px 4px 1px gray;
}
.reply {
    margin-left: 50px;
}
.input-comment {
    margin: 5px;
    padding: 5px;
    border: 1px gray solid;
    border-radius: 10px;
    outline: none;
    width: 100%;
}
.b-group {
    text-align: right;
}
.b-group button {
    border-radius: 20px;
    outline: none;
    margin-bottom: 10px;
}
.like-count {
    cursor: pointer;
}
.like-heart {
    color: red;
}
</style>
