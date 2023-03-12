<template>
       <div class="goods-item">
        <img v-lazy="$filters.prefix(props.goods.imgSrc)" alt="">
        <div class="goods-desc">
            <div class="title">{{props.goods.name}}</div>
            <div class="size">{{ props.goods.size }}</div>
            <div class="price">{{props.goods.price}}</div>
            <div class="introduce">
               <div class="p1">
                  {{ props.goods.introduce.p1 }}
               </div>
               <div class="p1">
                  {{ props.goods.introduce.p2 }}
               </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
   goods: {
        type: Object,
        value: {}
    }
 })
//  console.log(props.goods);
</script>

<style lang="stylus" scoped>
.goods-item
    width 50%
    border-bottom 1px solid #e9e9e9
    padding .266667rem
    img
        display block
        width 3.2rem
        margin 0 auto
    .goods-desc
        text-align center
        font-size .37333rem
        padding .266667rem 0
        .title
            color #222333
        .price
            color $primary
    &:nth-child(2n+1)
        border-right 1px solid #e9e9e9
</style>