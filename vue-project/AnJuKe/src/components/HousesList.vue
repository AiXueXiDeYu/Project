<template>
    <div>
        <section class="house">
            <header class="house-header">新房上线</header>
            <van-skeleton title :row="3" :loading="loading">
                <!-- slot 插槽 -->
                <div class="house-box">
                    <house-item v-for="item in newHouses" :key="item.id" @click="gotoDetail(item.id)" :houses="item" />
                </div>
            </van-skeleton>
        </section>
        <section class="house">
            <header class="house-header">推荐房</header>
            <van-skeleton title :row="3" :loading="loading">
                <!-- slot 插槽 -->
                <div class="house-box">
                    <house-item v-for="item in rentalHouses" :key="item.id" @click="gotoDetail(item.id)" :houses="item" />
                </div>
            </van-skeleton>
        </section>
        <section class="house">
            <header class="house-header">热销房屋</header>
            <van-skeleton title :row="3" :loading="loading">
                <!-- slot 插槽 -->
                <div class="house-box">
                    <house-item v-for="item in hotHouses" :key="item.id" :houses="item" @click="gotoDetail(item.id)" />
                </div>
                <!-- <div class="house-box">
                    <house-item v-for="item in hotHouses" :key="item.id" :houses="item"  />
                </div> -->
            </van-skeleton>
        </section>
    </div>
</template>

<script setup>
import HouseItem from '~/HouseItem.vue'
import { useHomeStore } from '@/store/home.js'
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter(); // 当前的路由
let loading = ref(true);
const homeStore = useHomeStore()
const newHouses = computed(() => homeStore.newHouses)
const hotHouses = computed(() => homeStore.hotHouses)
const rentalHouses = computed(() => homeStore.rentalHouses)
// const hotHouseLeft = computed(() => homeStore.leftGoods);
// const hotHousesRight = computed(() => homeStore.rightGoods);

const gotoDetail = (id) => {
    router.push({
        path: `/detail/${id}`
    })
}

onMounted(async () => {
    await homeStore.getHotHouses()
    await homeStore.getNewHouses()
    await homeStore.getRentalHouses()
    // await homeStore.getHotHousesList()
    loading.value = !loading.value
})
</script>

<style lang="stylus" scoped>
@import '../common/style/mixin';
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