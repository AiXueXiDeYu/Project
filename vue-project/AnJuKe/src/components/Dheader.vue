<template>
    <div style="width: 100vw;">
        <DNavBar />
        <div class="detail-content">
            <div class="detail-swipe-wrap">
                <van-swipe class="my-swipe" indicator="#1baeae">
                    <van-swipe-item v-for="(item, index) in detailSwiper" :key="index">
                        <img :src="item.url" alt="">
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import DNavBar from './DNavBar.vue';
import { useDetailStore } from '@/store/detail.js'
import { onMounted, computed } from 'vue'

const detailStore = useDetailStore()

const detailSwiper = computed(() => detailStore.detailSwiper)

onMounted(async () => {
    await detailStore.getDetailSwiper()
})
</script>
  
<style lang="stylus" scoped>
  @import '../common/style/mixin.styl';
  .detail-content
        height calc(100vh - 1.33333rem)
        overflow hidden
        overflow-y auto
        .detail-swipe-wrap
            .my-swipe
                img
                    width 100%
</style>