<template>
  <div>
    <Dheader />
    <Dmain />
    <DactionBar />
    <div class="container"></div>
  </div>
</template>
 
<script setup>
import Dheader from '~/Dheader.vue';
import Dmain from '~/Dmain.vue';
import DactionBar from '~/DactionBar.vue';
import { onMounted } from 'vue';
import { showLoadingToast, closeToast } from 'vant';

onMounted(() => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true
  })
  closeToast()
})

</script>
 
<style lang="stylus" scoped>
 .container
   width 100vw
   height 1.6rem
 </style>