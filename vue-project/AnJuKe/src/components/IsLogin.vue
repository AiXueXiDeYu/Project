<template>
    <div class="container">
      <img src="https://pic4.ajkimg.com/display/xinfang/62df2feb18bdd832b2958e67d151a7aa/600x450x98c.jpg" alt="">
      <div class="content">
        <h1>登录<span>安居客</span>账号</h1>
        <h2>客上天然居，居然天上客，安居客</h2>
        <router-link to="/login">
          <button @click="login">
            <text>注册/登录</text>
          </button>
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  
  </script>
  
  <style lang="stylus" scoped>
  .container
    width 100wh
    height calc(100vh - 1.413333rem)
    // padding 0 1.333333rem
    background-color white
    img
      width 100vw
      margin-top 1.333333rem /* 50/37.5 */
    .content
      padding-top 20vh
      h1
        font-size .533333rem
        font-weight bold
        color black
        text-align center
        margin-bottom .373333rem
        span
          color #21cd8e
      h2
        text-align center
        font-size .353333rem
        color black
      button
        width 4.8rem 
        height 1.333333rem 
        display block
        margin .373333rem auto
        border-radius 1.066667rem
        text
          color black
          font-size .426667rem 
          font-weight bold
  </style>