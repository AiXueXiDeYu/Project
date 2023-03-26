<template>
    <div class="header">
        <img src="https://pic6.ajkimg.com/news/31de4d82b3bf178c703eeaf94a9c81ed?imageMogr2/format/png/thumbnail/140x140">
        <h2>安居客用户</h2>
        <van-icon class="icon" name="scan" size=".533333rem" style="margin-right: .533333rem;" />
        <van-icon class="icon" name="setting-o" size=".533333rem" @click="showPopup" />
        <van-popup v-model:show="show" round style="padding: 20px 60px;" @click="quitLogin">退出登录</van-popup>
    </div>
    <div class="vip">
        <div class="grade">
            <div class="recommend">
                <h3>升级安居客会员</h3>
                <h3>享受优惠福利、专属体验。</h3>
            </div>
            <button>查看权益</button>
        </div>
    </div>
</template>

<script setup>
import { useLoginStore } from '@/store/login.js';
import { ref } from 'vue';
import { deleteLocal, TOKEN } from '@/common/js/utils';
const store = useLoginStore();
const show = ref(false);
const showPopup = () => {
    show.value = true;
};
// 退出登录 并删除token
const quitLogin = () => {
    store.SET_LOGIN(false)
    deleteLocal(TOKEN)
}
</script>

<style lang="stylus" scoped>
.header
    padding .533333rem .266667rem
    background-color #21c892
    display flex
    img
        width 1.333333rem 
        height 1.333333rem 
        border-radius 50%
        margin-top 40px
    h2
        font-size 20px
        color white
        font-weight 600
        margin 40px 130px 0 30px
        padding-top 20px
    .icon
        color white
        font-weight bold
.vip
    background-color #21c892
    padding 1px 20px
    .grade
        width 90%
        margin 20px auto
        display flex
        background-color #dffbee
        // opacity 0.3
        h3
            color black
            margin 10px
            white-space nowrap
        button 
            color black
            background #dffbee
            height .8rem
            width 2.133333rem
            margin auto 30px
            border-radius 15px
            white-space nowrap

</style>