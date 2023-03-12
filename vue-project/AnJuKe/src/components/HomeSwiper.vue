<template>
   <van-swipe class="my-swiper" :autoplay="3000" indicator-color="#1baeae">
      <van-swipe-item
      v-for="item in props.swiperList" 
      :key="item.carouselUrl"
      v-lazy="item"
      >
      <img :src="item.carouselUrl" alt="" />
      </van-swipe-item>
   </van-swipe>
</template>

<script setup>
 const props = defineProps(['swiperList'])
</script>

<style lang="stylus" scoped>
 .my-swiper
   img
       width 100%
</style>