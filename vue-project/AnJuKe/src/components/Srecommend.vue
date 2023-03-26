<template>
    <div class="main">
        <div class="m2">
            <section class="body">
            <header class="header">发现好盘</header>
            <div class="item" v-for="item in findHouses" :key="item.id">
                <img :src="item.imgSrc" alt="">
                <div class="introduce">
                    <div class="title">{{ item.name }}</div>
                    <div class="address">{{ item.address }}</div>
                    <div class="price">{{ item.price }}</div>
                </div>
                <div class="text">在售</div>
            </div>
            <div class="content"></div>
        </section>
        <section class="body2">
            <header class="header">红谷滩人气榜</header>
            <div class="item" v-for="item in findHouses" :key="item.id">
                <text>{{ item.id }}</text>
                <img :src="item.imgSrc" alt="">
                <div class="introduce">
                    <div class="title">{{ item.name }}</div>
                    <div class="address">{{ item.address }}</div>
                    <div class="price">{{ item.price }}</div>
                </div>
                <div class="text">在售</div>
            </div>
            <div class="content"></div>
        </section>
        </div>
    </div>
</template>

<script setup>
import { useSearchStore } from '../store/search';
import { onMounted, computed, ref } from 'vue'

const searchStore = useSearchStore()
const findHouses = computed(() => searchStore.findHouses)

onMounted(async () => {
    await searchStore.getFindHouses()
})
</script>

<style lang="stylus" scoped>
.main
    height 80%
    overflow-x scroll
    // display flex
    // flex-direction row
    .m2
        white-space nowrap
        .body
            // height 100vh
            background-color #fff4f2
            border-radius .133333rem /* 5/37.5 */
            margin .4rem /* 15/37.5 */
            .content
                height 40px
            .header
                margin-left 20px
                padding-top 20px
                font-size .48rem /* 18/37.5 */
                font-weight 700
                color #8c3b17
            .item
                display flex
                flex-direction row
                margin .533333rem /* 20/37.5 */
                text 
                    font-size 16px
                    font-weight 700
                    margin auto 20px auto 10px
                img
                    width 25%
                    height 22%
                    border-radius .133333rem /* 5/37.5 */
                .introduce
                    display flex
                    flex-direction column
                    // margin .666667rem  0 .666667rem 0.233333rem/* 25/37.5 */
                    margin-left 10px
                    padding 0
                    .title
                        color #222333
                        font-size 18px
                        font-weight 900
                    .price
                        color red
                        font-size .48rem /* 18/37.5 */
                        font-weight 700
                    .address
                        color #222333
                        font-size .373333rem /* 14/37.5 */
                        font-weight 600
                .text
                    // display flex
                    font-size .4rem /* 15/37.5 */
                    font-weight 500
                    height 25px
                    border .013333rem /* 0.5/37.5 */ solid black 
                    border-radius .133333rem /* 5/37.5 */
                    cursor: pointer;
                    // margin-right: px;
                    position: absolute;
                    top: 0;
                    right: 0;
        .body2
            background-color #eff1fe
            border-radius .133333rem /* 5/37.5 */
            margin .4rem /* 15/37.5 */
            .content
                height 40px
            .header
                margin-left 20px
                padding-top 20px
                font-size .48rem /* 18/37.5 */
                font-weight 700
                color #8c3b17
            .item
                display flex
                flex-direction row
                margin .533333rem /* 20/37.5 */
                text 
                    font-size 16px
                    font-weight 700
                    margin auto 20px auto 10px
                img
                    width 25%
                    height 22%
                    border-radius .133333rem /* 5/37.5 */
                .introduce
                    display flex
                    flex-direction column
                    // margin .666667rem  0 .666667rem 0.233333rem/* 25/37.5 */
                    margin-left 10px
                    padding 0
                    .title
                        color #222333
                        font-size 18px
                        font-weight 900
                    .price
                        color red
                        font-size .48rem /* 18/37.5 */
                        font-weight 700
                    .address
                        color #222333
                        font-size .373333rem /* 14/37.5 */
                        font-weight 600
                .text
                    // display flex
                    font-size .4rem /* 15/37.5 */
                    font-weight 500
                    height 25px
                    border .013333rem /* 0.5/37.5 */ solid black 
                    border-radius .133333rem /* 5/37.5 */
                    cursor: pointer;
                    // margin-right: px;
                    position: absolute;
                    top: 0;
                    right: 0;
</style>