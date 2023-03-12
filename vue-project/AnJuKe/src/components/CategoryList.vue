<template>
      <van-swipe class="my-swiper" :autoplay="3000" indicator-color="#1baeae" :show-indicators="false" :loop="false">
      <van-swipe-item
      v-for="item in props.categoryList" 
      :key="item.categoryListUrl"
      v-lazy="item"
      show-indicators="false"
      >
      <img :src="item.categoryListUrl" alt="" />
      </van-swipe-item>
   </van-swipe>
</template>

<script setup>
 const props = defineProps(['categoryList'])
</script>

<style lang="stylus" scoped>
 .my-swiper
   img
       width 100%
</style>