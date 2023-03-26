<template>
    <div>
        <text class="title">猜你想搜</text>
        <div class="container">
            <div class="item" v-for="(item, index) in items" :key="index">
                {{ item }}
            </div>
        </div>
    </div>
</template>
  
<script setup>
const items = ["国企开发", "商圈热盘", "近银行", "大楼盘", "绿化好", "园林景观", "湖景地产"]
</script>
  
<style lang="stylus" scoped>
  .title
    line-height 3
    margin .533333rem
    font-size .426667rem
    font-weight bold
    color black
  .container
    width 90%
    display flex
    flex-wrap wrap
    margin-left .293333rem
    .item
      width 1.6rem 
      line-height 2.5
      text-align center
      border-radius .2rem
      margin .16rem 
      background #f6f6f6   
      color #4c64c6
  </style>