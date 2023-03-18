<template>
  <div class="product-info">
    <div class="product-title">
      {{ detailList.houseName }}
    </div>
    <div class="product-price">
      <span>￥{{ detailList.housePrice }}</span>
      <span>{{  detailList.houseSize }}</span>
      <span>{{  detailList.houseAll }}</span>
      <span>{{  detailList.houseAddress }}</span>
    </div>
  </div>
  <div class="product-intro">
    <ul>
      <li>概述</li>
      <li>参数</li>
      <li>安装服务</li>
      <li>常见问题</li>
    </ul>
    <div class="product-content" v-html="detailList.houseDetailContent"></div>
  </div>
</template>
  
<script setup>
import { useDetailStore } from '@/store/detail.js'
import { onMounted, computed } from 'vue'

const detailStore = useDetailStore()

const detailList = computed(() => detailStore.detailList)

onMounted(async () => {
  await detailStore.getDetailList()
})

console.log(detailList);
</script>
  
<style lang="stylus" scoped>
  @import '../common/style/mixin.styl';
  .product-info
    padding 0 .26667rem
    .product-title
      font-size 0.48rem
      text-align-last left
      color #333
    .product-price
        fj()
        span:nth-child(1)
          color #f63515
          font-size .58667rem
        span:nth-child(2)
          color #999
          font-size .426667rem
  .product-intro
    width 100%
    padding-bottom 1.3333em
    ul
      fj()
      width 100%
      margin 0.2667rem 0
      li
        flex 1
        padding 0.1333rem 0
        text-align center
        font-size .4rem
        border-right 1px solid #999
        &:last-child
          border-right none
    .product-content
      padding 0 .266667rem
      img
        width 100%
</style>