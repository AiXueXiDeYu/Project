<template>
    <div class="s-header">
        <van-icon name="arrow-left" class="arrow" @click="back" />
        <van-search shape="round" v-model="value" show-action clearable placeholder="南昌融创·文旅城">
            <template #action>
                <div @click="onClickButton" class="button">搜索</div>
            </template>
        </van-search>
    </div>
    <div class="logs" v-if="showLogs">
        <div class="lg-header">
            <text class="title">搜索历史</text>
            <van-icon name="delete-o" class="icon" @click="clear" />
        </div>
        <div class="lg-main">
            <div class="lg-item" v-for="(item, index) in items" :key="index">
                <div class="lg-container">{{ item }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const back = () => {
  router.go(-1); // 返回上一页
}
</script>

<style lang="stylus" scoped>
@import '../common/style/mixin.styl';
.s-header
  display flex
  border-bottom 1px solid rgb(245, 245, 245)
  .arrow
    margin auto .266667rem 
    color rgb(17, 17, 17)
    font-size .426667rem
  .van-search
    width 9.333333rem
  .button
    width 1.573333rem
    border-radius .453333rem 
    text-align center
    background #f7f8fa
    color black
    font-weight 600
.lg-header
  padding .533333rem
  .title
    font-size .426667rem
    font-weight bold
    color black
  .icon
    font-size .48rem
    font-weight bold
    float right
.lg-main
  width 90%
  display flex
  flex-wrap wrap
  margin-left .293333rem
  .lg-item
    line-height 2.5
    text-align center
    border-radius .533333rem
    margin .16rem 
    background rgb(245, 245, 245)
    .lg-container
      padding 0 .266667rem
</style>