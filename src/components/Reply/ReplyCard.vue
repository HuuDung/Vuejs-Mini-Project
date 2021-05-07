<template>
    <div class="mt-3">
        <div class="reply-block" style="line-break: anywhere">
            <b>{{ reply.user.name }}</b>
            <br />
            <div v-if="reply.content.length > 80">
                <span v-if="!readMoreActivated">{{ reply.content.slice(0, 80) }}...</span>
                <span v-if="readMoreActivated" v-html="reply.content"></span>
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
                <span>{{ reply.content }}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        reply: {
            type: Object,
        },
    },
    data() {
        return {
            readMoreActivated: false,
        };
    },
    methods: {
        activateReadMore() {
            this.readMoreActivated = true;
        },
    },
};
</script>
<style scoped>
.reply-block {
    margin: 5px;
    padding: 5px;
    border: 1px gray solid;
    border-radius: 10px;
    box-shadow: 3px 0px 4px 1px gray;
    font-family: serif;
}
</style>
