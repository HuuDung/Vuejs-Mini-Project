<template>
    <div class="container">
        <b-row class="mt-3">
            <div style="width: 100%" class="pl-5">
                <div v-if="replyStatus">
                    <input
                        v-model="newReply"
                        type="text"
                        class="input-reply"
                        placeholder="返事を入力"
                    />
                    <div class="b-group" v-if="newReply">
                        <b-button @click="createReply" variant="outline-success" class="mr-4"
                            >送信</b-button
                        >
                        <b-button @click="newReply = ''" variant="outline-danger" class="mr-4"
                            >キャンセル</b-button
                        >
                    </div>
                </div>
                <div>
                    <reply-card
                        v-for="reply in replies"
                        :reply="reply"
                        :key="reply.reply_id"
                    ></reply-card>
                    <div class="d-flex justify-content-between mt-3" style="cursor: pointer">
                        <a class="mr-3" v-if="previousPageUrl" @click="getOldReply"
                            >...前の返事に戻る</a
                        >
                        <a v-else></a>
                        <a class="mr-3" v-if="nextPageUrl" @click="getNewReply"
                            >次の返事を見る...</a
                        >
                    </div>
                </div>
            </div>
        </b-row>
    </div>
</template>
<script>
import ReplyCard from './ReplyCard';
import ReplyDataService from '../../services/ReplyDataService';
export default {
    name: 'Reply',
    components: { ReplyCard },
    props: {
        replies: {
            type: [Array, Object],
        },
        nextPageUrl: {
            default: null,
        },
        previousPageUrl: {
            default: null,
        },
        replyStatus: {
            default: false,
        },
        commentId: {},
    },
    data() {
        return {
            newReply: null,
        };
    },
    methods: {
        getOldReply() {
            this.$emit('get-old-reply');
        },
        getNewReply() {
            this.$emit('get-new-reply');
        },
        createReply() {
            if (this.$store.state.auth.user) {
                let _id = this.commentId;
                let data = {
                    commentid: _id,
                    content: this.newReply,
                };
                ReplyDataService.create(data)
                    .then((response) => {
                        this.reply = response.data;
                        this.newReply = null;
                        this.$emit('get-first-reply');
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            } else {
                this.$router.push('/login');
            }
        },
    },
};
</script>
<style>
.reply-block {
    margin: 5px;
    padding: 5px;
    border: 1px gray solid;
    border-radius: 10px;
    box-shadow: 3px 0px 4px 1px gray;
}
.input-reply {
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
.text-right {
    cursor: pointer;
    margin-top: 15px;
}
</style>
