<template>
    <div class="mt-4">
        <b-row>
            <ranking v-for="ranking of rankings" :ranking="ranking" :key="ranking.id"></ranking>
            <!-- <ranking></ranking> -->
        </b-row>
    </div>
</template>
<script>
import Ranking from './RankingCard';
export default {
    components: { Ranking },
    props: {
        rankings: [Array, Object],
    },
};
</script>
