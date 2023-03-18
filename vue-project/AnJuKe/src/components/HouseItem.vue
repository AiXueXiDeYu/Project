<template>
       <div class="houses-item">
        <img :src="houses.imgSrc" alt="">
        <div class="houses-desc">
            <div class="title">{{houses.name}}</div>
            <div class="size">建面 {{ houses.size }}</div>
            <div class="price">{{houses.price}}</div>
            <div class="introduce">
               <div class="p1">
                  {{ houses.p1 }}
               </div>
               <div class="p1">
                  {{ houses.p2 }}
               </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
   houses: {
        type: Object,
        value: {}
    }
 })
 

</script>

<style lang="stylus" scoped>
.houses-item
    width 50%
    border-bottom 1px solid #e9e9e9
    padding .266667rem
    img
        display block
        width 100%
        // margin 0 auto
    .houses-desc
        // text-align center
        font-size .37333rem
        padding .266667rem 0
        .title
            color #222333
            font-size .426667rem /* 16/37.5 */
            font-weight 900
        .price
            color red
            font-size .426667rem /* 16/37.5 */
            font-weight 700
        .size
            font-size .32rem /* 12/37.5 */
        .introduce
            display flex
            flex-direction row
            .p1
                background-color #f6f6f6
                margin .133333rem  .23333rem 0 0/* 5/37.5 */
                font-size .266667rem /* 10/37.5 */
                color #4c64c6
    &:nth-child(2n+1)
        border-right 1px solid #e9e9e9
</style>