<template>
    <div class="m1">
        <div class="item" v-for="(item, index) in list" :key="index" >
            <div class="number">
                {{ item.number }} 
            </div>
            <div class="text">
                {{ item.text }}
            </div>
        </div>
    </div>
    <div class="m2">
        <text>房产工具</text>
        <div class="body">
            <div class="item2" v-for="(item, index) in list2" :key="index" >
                <div class="img">
                    <img :src=item.src >
                </div>
                <div class="text">
                    {{ item.text }}
                </div> 
            </div>
        </div>
    </div>
    <van-cell class="cell" title="问卷调查" is-link center />
    <van-cell class="cell" title="举报中心" is-link center />
    <van-cell class="cell" title="在线客服" is-link center />
</template>

<script setup>
import i1 from '@/assets/images/kf.png'
import i2 from '@/assets/images/jr.png'
import i3 from '@/assets/images/fj.png'
import i4 from '@/assets/images/js.png'
import i5 from '@/assets/images/zg.png'
import i6 from '@/assets/images/bd.png'
import i7 from '@/assets/images/dp.png'
import i8 from '@/assets/images/wd.png'
import i9 from '@/assets/images/tz.png'

const list = [
    {number: '6', text: '浏览记录'},
    {number: '4', text: '收藏关注'},
    {number: '3', text: '联系人'},
    {number: '0', text: '钱包优惠'},
]
const list2 = [
    {src: i1, text: '看房管理'},
    {src: i2, text: '金融服务'},
    {src: i3, text: '查房价'},
    {src: i4, text: '房贷计算'},
    {src: i5, text: '购房资格'},
    {src: i6, text: '安居宝典'},
    {src: i7, text: '我的点评'},
    {src: i8, text: '我的问答'},
    {src: i9, text: '我的帖子'},
]
</script>

<style lang="stylus" scoped>
.m1 
    display flex
    justify-content space-around
    .item
        display flex
        flex-direction column
        .number
            margin auto
            font-size 30px
            font-weight 700
        .text
            font-size 16px
.m2 
    display flex
    margin 10px
    flex-direction column
    text
        font-size 20px
        font-weight 700
    .body
        display flex
        justify-content flex-start
        flex-wrap wrap
        .item2
            display flex
            flex-direction column
            width 20%
            height 20%
            margin 8px
            .img
                margin auto
                img
                    width 40px
                    height 40px
            .text
                font-size 16px
                margin auto
.cell
    height 1.6rem
    --van-cell-font-size 16px
</style>