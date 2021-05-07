<template>
    <div class="container">
        <div v-show="loading" class="loader"><b-spinner label="Spinning"></b-spinner></div>
        <div v-show="!loading" class="itemContainer">
            <h2 class="recipe-title">{{ recipe.title }}</h2>
            <b-row class="mt-5">
                <b-col md="6" style="padding-right: 10px">
                    <div style="position: relative">
                        <img :src="modifyImageURL()" :alt="recipe.title" style="width: 100%" />
                    </div>
                </b-col>
                <b-col md="6">
                    <div class="position-relative" style="height: 100%">
                        <div class="recipe-info">
                            <p>
                                <b>料理名: </b><span>{{ recipe.r_name }}</span>
                            </p>
                            <p>
                                <b>作成者: </b><span>{{ recipe.user.name }}</span>
                            </p>
                            <p>
                                <b>人前: </b><span>{{ recipe.servings }}</span>
                            </p>
                            <p>
                                <b>所要時間: </b><span>{{ recipe.r_time }}</span>
                            </p>
                            <p>
                                <b>いいね数: </b
                                ><span style="color: black; font-size: 18px">{{
                                    modifyLikeCount(this.recipe.like_count)
                                }}</span
                                ><span style="color: red">♥</span>
                            </p>
                        </div>
                        <div class="heart-like">
                            <b-icon
                                v-show="recipe.liked"
                                v-on:click="toggleLike"
                                icon="heart-fill"
                            ></b-icon>
                            <b-icon
                                v-show="!recipe.liked"
                                v-on:click="toggleLike"
                                icon="heart"
                            ></b-icon>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <div class="section-separator">
                <hr class="h-line" />
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    role="img"
                    aria-hidden="true"
                    tabindex="-1"
                    style="position: absolute"
                >
                    <path
                        style="fill: rgb(231, 171, 70)"
                        d="M12.0064715,2.00579868 C14.4463454,2.02579867 16.6134694,2.80767331 18.4712185,4.39429758 C20.3767177,6.02242184 21.5375921,8.09579588 21.888467,10.5790447 C22.3002168,13.5172934 21.5735921,16.1677922 19.680718,18.4600411 C18.0502187,20.4302902 16.5072194,21.5886647 13.9774706,21.9786645 C13.6759707,22.0310395 13.6595957,22.0060395 13.6369708,21.6834147 C13.5658458,20.7627901 13.4807208,19.8430405 13.4110959,18.9216659 C13.3634709,18.3159162 13.3177209,17.7235415 13.2737209,17.1209167 C13.2345959,16.539792 13.192346,15.9650423 13.168096,15.3800425 C13.148596,14.8885428 13.2463459,14.425418 13.5689708,14.0314182 C13.9579706,13.5776684 14.3415954,13.1077936 14.6807203,12.6167938 C15.220595,11.8151692 15.4822199,10.9161696 15.5790949,9.97404502 C15.6689698,9.09304543 15.5900949,8.24417082 15.28772,7.4092962 C15.1212201,6.92067142 14.8759702,6.45467164 14.5595953,6.03892183 C14.1865955,5.55729705 13.4127209,5.27617218 12.8165961,5.16967223 C12.0134715,5.02779729 10.971222,5.13629724 10.3064723,5.64729701 C9.88847247,5.96054686 9.33934773,6.41167166 9.12434782,6.88142144 C8.33459819,8.60479565 8.41034815,10.3272949 9.1774728,12.0411691 C9.46747267,12.6770438 9.92522246,13.2115435 10.3752223,13.7370433 C10.6790971,14.0866681 10.6588471,14.447293 10.7174721,14.9257928 C10.7454721,15.1944176 10.7400971,15.4617925 10.7252221,15.7316674 C10.6392221,16.9532918 10.5502222,18.1746663 10.4529722,19.3919157 C10.4025972,20.1289154 10.3362223,20.861165 10.2849723,21.5956647 C10.2485973,22.0157895 10.5345972,22.0170395 10.1290974,21.9551645 C8.26509822,21.6430397 6.89709885,20.876415 5.4705995,19.6284156 C3.85135024,18.2172912 2.75135075,16.476417 2.28072596,14.379543 C1.5549763,11.1104195 2.22997599,8.14079586 4.380725,5.56117205 C6.05734923,3.54967297 8.23622323,2.40679849 10.828347,2.06454865 C11.2228469,2.01754867 11.6142217,1.98654869 12.0064715,2.00579868"
                    ></path>
                </svg>
            </div>
            <div class="mt-3">
                <b-col md="12" style="padding-left: 0px">
                    <h3>材料</h3>
                    <div class="text-block white-space" v-html="recipe.material"></div>
                    <h3>調味料</h3>
                    <div class="text-block white-space">
                        <ul>
                            <li v-for="spice in recipe.spices" :key="spice.id">
                                {{ spice.name }}
                            </li>
                        </ul>
                    </div>
                    <h3>手順</h3>
                    <div class="text-block white-space" v-html="recipe.r_process"></div>
                </b-col>
            </div>
            <div class="section-separator">
                <hr class="h-line" />
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    role="img"
                    aria-hidden="true"
                    tabindex="-1"
                    style="position: absolute"
                >
                    <path
                        style="fill: rgb(231, 171, 70)"
                        d="M12.0064715,2.00579868 C14.4463454,2.02579867 16.6134694,2.80767331 18.4712185,4.39429758 C20.3767177,6.02242184 21.5375921,8.09579588 21.888467,10.5790447 C22.3002168,13.5172934 21.5735921,16.1677922 19.680718,18.4600411 C18.0502187,20.4302902 16.5072194,21.5886647 13.9774706,21.9786645 C13.6759707,22.0310395 13.6595957,22.0060395 13.6369708,21.6834147 C13.5658458,20.7627901 13.4807208,19.8430405 13.4110959,18.9216659 C13.3634709,18.3159162 13.3177209,17.7235415 13.2737209,17.1209167 C13.2345959,16.539792 13.192346,15.9650423 13.168096,15.3800425 C13.148596,14.8885428 13.2463459,14.425418 13.5689708,14.0314182 C13.9579706,13.5776684 14.3415954,13.1077936 14.6807203,12.6167938 C15.220595,11.8151692 15.4822199,10.9161696 15.5790949,9.97404502 C15.6689698,9.09304543 15.5900949,8.24417082 15.28772,7.4092962 C15.1212201,6.92067142 14.8759702,6.45467164 14.5595953,6.03892183 C14.1865955,5.55729705 13.4127209,5.27617218 12.8165961,5.16967223 C12.0134715,5.02779729 10.971222,5.13629724 10.3064723,5.64729701 C9.88847247,5.96054686 9.33934773,6.41167166 9.12434782,6.88142144 C8.33459819,8.60479565 8.41034815,10.3272949 9.1774728,12.0411691 C9.46747267,12.6770438 9.92522246,13.2115435 10.3752223,13.7370433 C10.6790971,14.0866681 10.6588471,14.447293 10.7174721,14.9257928 C10.7454721,15.1944176 10.7400971,15.4617925 10.7252221,15.7316674 C10.6392221,16.9532918 10.5502222,18.1746663 10.4529722,19.3919157 C10.4025972,20.1289154 10.3362223,20.861165 10.2849723,21.5956647 C10.2485973,22.0157895 10.5345972,22.0170395 10.1290974,21.9551645 C8.26509822,21.6430397 6.89709885,20.876415 5.4705995,19.6284156 C3.85135024,18.2172912 2.75135075,16.476417 2.28072596,14.379543 C1.5549763,11.1104195 2.22997599,8.14079586 4.380725,5.56117205 C6.05734923,3.54967297 8.23622323,2.40679849 10.828347,2.06454865 C11.2228469,2.01754867 11.6142217,1.98654869 12.0064715,2.00579868"
                    ></path>
                </svg>
            </div>
            <comment
                :comments="comments"
                :nextPageUrl="nextPageUrl"
                :previousPageUrl="previousPageUrl"
                @get-first-comment="getFirstComment"
                @get-new-comment="getNewComment"
                @get-old-comment="getOldComment"
                @change-per-page="changePerPage"
                :per-page="commentPerPage"
            ></comment>
        </div>
    </div>
</template>
<script>
import RecipeDataService from '../../services/RecipeDataService';
import RecipeService from '../../services/RecipeService';
import Comment from '../Comment/Comment';
import CommentDataService from '../../services/CommentDataService';
export default {
    components: { Comment },
    data() {
        return {
            recipe: {
                user: {},
                spices: [],
                img_url: '',
            },
            comments: [],
            commentPerPage: 5,
            currentPage: 0,
            nextPageUrl: null,
            previousPageUrl: null,
            host: process.env.APP_BASE_URL,
            loading: true,
        };
    },
    methods: {
        toggleLike() {
            if (this.$store.state.auth.user) {
                RecipeService.toggleLike(this.recipe.recipeid).then((response) => {
                    this.recipe.liked = response.data;
                    this.recipe.like_count += response.data ? 1 : -1;
                });
            } else {
                this.$router.push('/login');
            }
        },
        getRecipe() {
            this.loading = true;
            const _id = this.$route.params.id;
            RecipeDataService.findOne(_id)
                .then((response) => {
                    this.recipe = response.data;
                    this.loading = false;
                })
                .catch((e) => {
                    console.log(e);
                    this.loading = false;
                    this.$router.push('/');
                });
        },

        getAllComments() {
            this.loading = true;
            const _id = this.$route.params.id;
            const params = {
                page: this.currentPage,
                size: this.commentPerPage,
            };
            CommentDataService.getAll(_id, params)
                .then((response) => {
                    this.comments = response.data.data;
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
        getNewComment() {
            this.currentPage++;
            this.getAllComments();
        },
        getOldComment() {
            this.currentPage--;
            this.getAllComments();
        },
        getFirstComment() {
            this.currentPage = 0;
            this.getAllComments();
        },
        modifyImageURL() {
            if (!this.recipe.img_url.includes('http')) {
                return this.host + this.recipe.img_url;
            }
            return this.recipe.img_url;
        },
        changePerPage(value) {
            this.commentPerPage = value;
            this.currentPage = 0;
            this.getAllComments();
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
        this.getRecipe();
        this.getAllComments();
    },
};
</script>
<style scoped>
.recipe-title {
    color: black;
    font-weight: bolder;
    text-align: center;
    margin-top: 30px;
    font-family: serif;
}
.text-block {
    padding: 10px;
    font-family: serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.95);
}
.recipe-info {
    position: relative;
    border-width: 2px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.15);
    border-image: initial;
    border-radius: 4px;
    padding: 24px;
    font-family: serif;
    height: 100%;
}

.section-separator {
    margin-top: 40px;
}
.h-line {
    width: 100%;
    display: inline-block;
    height: 2px;
    border-width: 0;
    color: rgba(0, 0, 0, 0.15);
    background-color: rgba(0, 0, 0, 0.15);
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
