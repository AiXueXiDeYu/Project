<template>
    <div class="header">
        <div class="button" @click="back">
            <van-icon name="cross" class="back" />
        </div>
        <div class="main">
            <h1>欢迎来到<text style="color: #21cd8e;">安居客</text></h1>
            <h2>实现每一个人对家的梦</h2>
        </div>
    </div>
</template>

<script setup>
const back = () => {
    history.back()
}
</script>

<style lang="stylus" scoped>
.header
  width 100vw
  height 5.333333rem /* 200/37.5 */
  padding-top 20px
  background #fff
  .button
    margin-left 20px
    width .8rem
    height .8rem
    position relative
    .back
      position absolute
      top .133333rem /* 5/37.5 */
      left .106667rem /* 4/37.5 */
      font-size .533333rem /* 20/37.5 */
      color black
  .main
    height 3.2rem
    margin .8rem 0 0 .533333rem /* 20/37.5 */
    h1
      font-size .8rem /* 30/37.5 */
      font-weight bold
</style>