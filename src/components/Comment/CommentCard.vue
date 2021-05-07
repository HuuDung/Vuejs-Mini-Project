<template>
    <div class="mt-3">
        <div v-show="loading" class="loader"><b-spinner label="Spinning"></b-spinner></div>
        <div v-show="!loading" class="itemContainer">
            <div class="comment-block" style="line-break: anywhere">
                <b>{{ comment.user.name }}</b>
                <br />
                <!-- <span>{{ comment.content }}</span> -->
                <div v-if="comment.content.length > 80">
                    <span v-if="!readMoreActivated">{{ comment.content.slice(0, 80) }}...</span>
                    <span v-if="readMoreActivated" v-html="comment.content"></span>
                    <div class="text-primary" style="cursor: pointer">
                        <span
                            @click="readMoreActivated = !readMoreActivated"
                            class="text-decoration-none"
                        >
                            <a v-if="readMoreActivated" style="cursor: pointer">「省略」</a>
                            <a v-else style="cursor: pointer">「もっと」</a>
                        </span>
                    </div>
                </div>
                <div v-else>
                    <span>{{ comment.content }}</span>
                </div>
            </div>
            <div style="margin-left: 10px">
                <span class="like-count" @click="toggleLike">
                    {{ modifyLikeCount(comment.like_count) }}
                    <span class="like-heart">{{ comment.liked ? ' ♥' : ' ♡' }}</span>
                </span>
                <a class="reply-link" @click="replyStatus = !replyStatus">返事</a>
            </div>
            <replyList
                :replies="replies"
                :comment-id="comment.commentid"
                :nextPageUrl="nextPageUrl"
                :previousPageUrl="previousPageUrl"
                :reply-status="replyStatus"
                @get-new-reply="getNewReply"
                @get-old-reply="getOldReply"
                @get-first-reply="getFirstReply"
            ></replyList>
        </div>
    </div>
</template>
<script>
import ReplyList from '../Reply/ReplyList';
import ReplyDataService from '../../services/ReplyDataService';
import CommentDataService from '../../services/CommentDataService';
export default {
    components: { ReplyList },
    props: {
        comment: {
            type: Object,
        },
    },
    data() {
        return {
            readMoreActivated: false,
            replies: [],
            replyPerPage: 3,
            currentPage: 0,
            nextPageUrl: null,
            previousPageUrl: null,
            replyStatus: false,
            loading: true,
        };
    },
    methods: {
        activateReadMore() {
            this.readMoreActivated = true;
        },
        getAllReplies() {
            this.loading = true;
            const _id = this.comment.commentid;
            const params = {
                page: this.currentPage,
                size: this.replyPerPage,
            };
            ReplyDataService.getAll(_id, params)
                .then((response) => {
                    this.replies = response.data.data;
                    this.currentPage = response.data.currentPage;
                    this.nextPageUrl = response.data.nextPageUrl;
                    this.previousPageUrl = response.data.previousPageUrl;
                    this.loading = false;
                })
                .catch((e) => {
                    console.log(e);
                    this.loading = false;
                });
        },
        getNewReply() {
            this.currentPage++;
            this.getAllReplies();
        },
        getOldReply() {
            this.currentPage--;
            this.getAllReplies();
        },
        getFirstReply() {
            this.currentPage = 0;
            this.getAllReplies();
        },
        toggleLike() {
            if (this.$store.state.auth.user) {
                CommentDataService.toggleLike(this.comment.commentid).then((response) => {
                    this.comment.liked = response.data;
                    this.comment.like_count += response.data ? 1 : -1;
                });
            } else {
                this.$router.push('/login');
            }
        },
        modifyLikeCount(value) {
            if (Math.abs(Number(value)) >= 1.0e9) {
                return (Math.abs(Number(value)) / 1.0e9).toFixed(2) + 'B';
            } else if (Math.abs(Number(value)) >= 1.0e6) {
                return (Math.abs(Number(value)) / 1.0e6).toFixed(2) + 'M';
            } else if (Math.abs(Number(value)) >= 1.0e3) {
                return (Math.abs(Number(value)) / 1.0e3).toFixed(2) + 'K';
            } else return Math.abs(Number(value));
        },
    },
    mounted() {
        this.getAllReplies();
    },
};
</script>
<style scoped>
.comment-block {
    margin: 5px;
    padding: 5px;
    border: 1px rgb(233, 219, 219) solid;
    border-radius: 10px;
    box-shadow: 3px 0px 4px 1px gray;
    font-family: serif;
}
.reply {
    margin-left: 50px;
}

.reply-link {
    cursor: pointer;
}
.reply-link:hover {
    text-decoration: underline;
}
.heart-like {
    position: absolute;
    top: 0rem;
    right: 1.25rem;
    font-size: 1.5rem;
    color: #f86c6c;
}
div.loader {
    text-align: center;
    margin-top: 300px;
}
.spinner {
    text-align: center;
}
</style>
