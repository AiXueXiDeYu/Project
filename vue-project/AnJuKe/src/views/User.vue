<template>
  <div v-if="!loginStore.isLogin">
  <IsLogin />
  </div>
  <div v-else>
   user
  </div>
</template>

<script setup>
import { useLoginStore } from '@/store/login.js'
import IsLogin from '~/IsLogin.vue';

const loginStore = useLoginStore()

</script>

<style lang="stylus" scoped>

</style>