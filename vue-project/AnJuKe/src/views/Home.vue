<template>
   <div id="home-wrapper">
        <MyHeader />
        <HomeSwiper :swiperList="swiperList" />
        <CategoryList :categoryList="categoryList" />
        <section class="house">
            <header class="house-header">新房上线</header>
            <van-skeleton title :row="3" :loading="loading">
                <!-- slot 插槽 -->
                <div class="house-box">
                    <house-item
                        v-for="item in houseList.newHouses" 
                        :key="item.id"
                        @click="gotoDetail(item.houseId)"
                        :house="item"/>
                </div>
            </van-skeleton>
        </section>
        <section class="house">
            <header class="house-header">推荐房</header>
            <van-skeleton title :row="3" :loading="loading">
                <!-- slot 插槽 -->
                <div class="house-box">
                    <house-item
                        v-for="item in houseList.rentalHouses" 
                        :key="item.id"
                        @click="gotoDetail(item.houseId)"
                        :house="item"/>
                </div>
            </van-skeleton>
        </section>
        <section class="house">
            <header class="house-header">热销房屋</header>
            <van-skeleton title :row="3" :loading="loading">
                <!-- slot 插槽 -->
                <div class="house-box">
                    <house-item
                        v-for="item in houseList.hotHouses" 
                        :key="item.id"
                        :house="item"
                        @click="gotoDetail(item.houseId)"
                        />
                </div>
            </van-skeleton>
        </section>
   </div> 
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { showLoadingToast, closeToast } from 'vant'
// import { useRouter } from 'vue-router';
import { useHomeStore } from '@/store/home.js'
import HomeSwiper from '~/HomeSwiper.vue'
import CategoryList from '~/CategoryList.vue'
import MyHeader from '~/MyHeader.vue'
import HouseItem from '~/HouseItem.vue'


// const router = useRouter()

const homeStore = useHomeStore()
const swiperList = computed(() => homeStore.swiperList) 
const categoryList = computed(() => homeStore.categoryList)
const houseList = computed(() => homeStore.houseList)
const loading = ref(homeStore.loading)

onMounted(async () => {
    showLoadingToast({
        message: '加载中...',
        forbidClick: true
    })
   await homeStore.getSwiperList()
   await homeStore.getHouseList()
   await homeStore.getCategoryList()
    console.log(homeStore.loading);
   homeStore.loading = false
   closeToast()
   console.log(homeStore.loading);
})

</script>

<style lang="stylus" scoped>
@import '../common/style/mixin'
// 可以一次性设置widht height 的mixin 混合
// stylus 提供的tab 缩进 css 提供了模块化的能力？ 
#home-wrapper
    padding-bottom 2rem 
.category-list
    display flex
    flex-shrink 0
    flex-wrap wrap
    width 100%
    padding-bottom .34667rem
    div
        display flex
        flex-direction column
        width 20%
        text-align center
        img
            wh(.96rem, .96rem)
            margin .346667rem auto .213333rem auto
.house
    .house-header
        background #f9f9f9
        height 1.3333rem
        line-height 1.3333rem
        text-align center
        color $primary
        font-size .426667rem
        font-weight 500
    .house-box
        fj(flex-start)
        flex-wrap wrap
</style>  