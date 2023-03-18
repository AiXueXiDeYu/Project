<template>
   <div id="home-wrapper">
        <MyHeader />
        <HomeSwiper :swiperList="swiperList" />
        <CategoryList :categoryList="categoryList" />
        <HousesList />
   </div> 
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { showLoadingToast, closeToast } from 'vant'
// import { useRouter } from 'vue-router';
import { useHomeStore } from '@/store/home.js'
import HomeSwiper from '~/HomeSwiper.vue'
import CategoryList from '~/CategoryList.vue'
import MyHeader from '~/MyHeader.vue'
import HousesList from '~/HousesList.vue'


// const router = useRouter()

const homeStore = useHomeStore()
const swiperList = computed(() => homeStore.swiperList) 
const categoryList = computed(() => homeStore.categoryList)
// const loading = computed(() => (homeStore.loading))


onMounted(async () => {
    showLoadingToast({
        message: '加载中...',
        forbidClick: true
    })
   await homeStore.getSwiperList()
   await homeStore.getCategoryList()
    // console.log(homeStore.loading);
   homeStore.loading = false
   closeToast()
//    console.log(homeStore.loading);
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
</style>  