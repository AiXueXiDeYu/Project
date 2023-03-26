<template>
  <div class="d-action-bar">
    <van-action-bar-icon icon="like-o" text="关注"  @click="like"/>
    <van-action-bar-icon 
      icon="completed" 
      text="预约看房" 
    />
    <div class="button">
      <router-link to="/message">
        <div class="wl" >
        <text>
          <h3>微聊</h3>
          <h4>快速在线咨询</h4>
        </text>
      </div>
      </router-link>
      <div class="zd">
        <text>
          <h3>致电售楼粗处</h3>
          <h4>保护你的真实号码</h4>
        </text>
      </div>
    </div>
  </div>
  <div class="container"></div>
</template>

<script setup>

</script>

<style lang="stylus" scoped>
@import '../common/style/mixin.styl';

.d-action-bar
  wh(calc(100vw - .533333rem), 1.6rem)
  position fixed
  bottom 0
  left 0
  background-color white
  padding 0 .266667rem
  display flex
  z-index 999
  .button
    width 80%
    display flex
    justify-content space-between
    .wl
      display flex
      flex-direction column
      background-color #fd655a
      text-align center
      padding 5px
      margin 5px
      margin-left 20px
      h3
        font-size 18px
        color white
      h4
        font-size 14px
        color white
        margin 0 5px
    .zd
      display flex
      flex-direction column
      background-color #14cb8b
      text-align center
      padding 5px
      margin 5px
      h3
        font-size 18px
        color white
      h4
        font-size 14px
        color white 
        margin 0 5px
.container
  wh(100%, 1.6rem)
</style>