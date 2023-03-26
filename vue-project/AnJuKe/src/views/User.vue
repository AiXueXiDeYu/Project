<template>
  <div v-if="!loginStore.isLogin">
  <IsLogin />
  </div>
  <div v-else>
  <Uheader></Uheader>
  <Umain></Umain>
  </div>
</template>

<script setup>
import { useLoginStore } from '@/store/login.js'
import Uheader from '~/Uheader.vue'
import Umain from '~/Umain.vue'
import IsLogin from '~/IsLogin.vue';

const loginStore = useLoginStore()

</script>

<style lang="stylus" scoped>

</style>