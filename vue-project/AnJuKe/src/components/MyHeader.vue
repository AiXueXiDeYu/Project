<template>
    <header class="home-header wrap">
        <div class="header-search">
            <span class="app-name">安居客</span>
            <i class="nbicon nbSearch"></i>
            <router-link class="search-title" to="/product-list?from=home">
                山河无恙，人间皆安
            </router-link>
        </div>
        <div class="header-address">
            <van-config-provider :theme-vars="themeVars">
                <van-field v-model="fieldValue" readonly is-link arrow-direction="down" @click="showPicker = true" />
                <van-popup v-model:show="showPicker" round position="bottom"  :style="{ height: '30%' }">
                    <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
                </van-popup>
            </van-config-provider>
        </div>
        <router-link class="login" to="/login">登录</router-link>
    </header>
</template>

<script setup>
import { ref, reactive } from 'vue'
const fieldValue = ref('南昌');
const showPicker = ref(false);

const onConfirm = ({ selectedOptions }) => {
    showPicker.value = false;
    fieldValue.value = selectedOptions[2].text;
};
// 自定义主题样式
const themeVars = reactive({
  cellLineHeight: "20px",
  cellVerticalPadding: "0",
  cellHorizontalPadding: '0',
  cellTextColor: "rgb(17, 17, 17)",
  cellFontSize: "15px",
  cellRightIconColor: "rgb(17, 17, 17)",
  StickyTop: "5px"
})

const columns = [
{
      text: '浙江',
      value: 'Zhejiang',
      children: [
        {
          text: '杭州',
          value: 'Hangzhou',
          children: [
            { text: '西湖区', value: 'Xihu' },
            { text: '余杭区', value: 'Yuhang' },
          ]
        },
        {
          text: '温州',
          value: 'Wenzhou',
          children: [
            { text: '鹿城区', value: 'Lucheng' },
            { text: '瓯海区', value: 'Ouhai' },
          ]
        }
      ]
    },
    {
      text: '福建',
      value: 'Fujian',
      children: [
        {
          text: '福州',
          value: 'Fuzhou',
          children: [
            { text: '鼓楼区', value: 'Gulou' },
            { text: '台江区', value: 'Taijiang' },
          ],
        },
        {
          text: '厦门',
          value: 'Xiamen',
          children: [
            { text: '思明区', value: 'Siming' },
            { text: '海沧区', value: 'Haicang' },
          ]
        }
      ]
    },
    {
    text: '江西',
    value: 'jinagxi',
    children: [
      {
        text: '南昌',
        value: 'nanchang',
        children: [
          { text: '青山湖区', value: 'qsh' },
          { text: '红谷滩区', value: 'hgt' },
        ]
      },
      {
        text: '宜春',
        value: 'yichun',
        children: [
          { text: '袁州区', value: 'yz' },
          { text: '高安', value: 'ga' },
        ]
      }
    ]
  }
]
</script>

<style lang="stylus" scoped>
@import '../common/style/mixin'
.home-header
    position fixed
    top 0
    left 0    
    line-height 1.33333rem
    padding 0 .4rem
    font-size 0.4rem
    color #fff
    z-index 10000
    wh(100%, 1.33333rem)
    fj()
    .nbmenu2
        color $primary
    &.active
        background $primary
        .nbmenu2
            color #fff
        .login
            color #fff
    .header-search 
        display flex
        width 64%
        box-sizing content-box
        height 0.53333rem
        line-height 0.53333rem
        margin 0.26667rem 0
        padding 0.1333rem 0
        color #232326
        border-radius .53333rem
        background rgba(255, 255, 255, .7)
        .app-name
            padding 0 0.26667rem
            color $primary
            font-size 0.53333rem
            font-weight bold
            border-right .026667rem solid #666
        .icon-search
            padding 0 .26667rem
            font-size .45333rem
        .search-title
            font-size .32rem
            color #666
            line-height 0.56rem
    .login
        color $primary
        line-height 1.38667rem
    .header-address
        // background-color green
        color $primary
        line-height 1.38667rem
        font-weight bold
        width 1.6rem /* 60/37.5 */
        pointer-events visibleFill
.van-cell:after 
  border-bottom 0
.van-icon
  font-weight bold
</style>