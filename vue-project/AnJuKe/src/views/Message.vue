<template>
   <div class="header">
       <div class="text">
           <div class="weiliao" :class="index==active ? 'active': ''" @click="store.isWL = !store.isWL;a(index)" v-for="(item, index) in list" :key="index">
               {{ item.text }}
           </div>
       </div>
       <van-icon name="delete-o" size=".533333rem" class="icon" style="margin-right: .533333rem;"/>
       <van-icon name="add-o" size=".533333rem" class="icon"/>
   </div>
   <div class="main">
        <div class="wl" v-if="store.isWL">
            <div class="header">
                <text>暂无聊天信息，为你推荐以下内容</text>
            </div>
            <div class="body">
                <text>优秀置业顾问</text>
               <div class="item" v-for="item in guWen" :key="item.id">
                  <div class="header">
                     <img :src="item.img" alt="">
					 <div class="info">
						<div class="name">{{ item.name }}</div>
                     	<div class="lv">{{ item.lv }}</div>
					 </div>
                     <div class="button">微聊</div>
                  </div>
				<div class="body">
					<div class="top">
						<div class="address">{{ item.address }}</div>
						<div class="type">{{ item.type }}</div>
						<div class="status">{{ item.status }}</div>
					</div>
					<div class="bottom">
						<div class="price">{{ item.price }}</div>
						<div class="detail">{{ item.detail }}</div>
					</div>
                </div>
               </div>
			   <div class="content"></div>
            </div>
        </div>
        <div class="tz" v-else>
			<img src="https://i.328888.xyz/2023/03/25/iALFed.jpeg" alt="">
            <div class="tongzi">
                <h2>
                    <text>暂无通知</text>
                </h2>
                <h4>平台将为你推送通知动态</h4>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed,onMounted } from 'vue'
import { useMessageStore } from '@/store/message.js'

const list = [
   {text: '微聊'},
   {text: '通知'}
]
const active = ref(0)
const store = useMessageStore()
const guWen = computed(() => store.guWen)

onMounted( async () => {
   await store.getguWen()
})

const a =  (index) => {
   active.value = index
}

</script>

<style lang="stylus" scoped>
.header
	display flex
	.icon
		margin 20px
	.text
		display flex
		flex 1
		justify-content space-around
		margin 20px
		.weiliao
			font-size 18px
			font-weight 800
		.active
			color #26ca95
.main
	.tz
		.tongzi
			text-align center
			h2 
				font-size 18px
			h4
				font-size 14px
				color #cfcfcf
		img
			width 100%
			
	.wl
		.header
			width 100%
			height 160px
			text
				font-size 18px
				color #cfcfcf
				margin auto
		.body
			text
				font-size 20px
				font-weight 800
				margin-left 20px
			.content
				height 50px
			.item
				display flex
				flex-direction column
				height 150px
				margin 10px
				.header
					height 80px
					img
						height 60px
						width 60px
						border-radius 50%
						margin-top 15px
					.info
						display flex
						flex-direction column
						margin 15px
						.name
							font-size 18px
							font-weight 800
						.lv
							font-size 14px
							margin 10px 0
					.button
						border 1px solid green
						font-size 16px
						width 60px
						height 30px
						text-align center
						cursor: pointer;
						position: absolute;
						top: 20px;
						right: 10px;
				.body
					display flex
					flex-direction column
					margin-left 70px
					background-color #fafafa
					padding 10px
					.top
						display flex
						.address
							font-size 18px
							font-weight 540
							margin-right 10px
						.type
							font-size 16px
							color #92b8de
							margin-right 10px
						.status
							font-size 16px
							color #86c295
					.bottom
						display flex
						.price
							color red
							font-size 16px
							font-weight 700
						.detail
							font-size 16px
							margin-left 10px
</style>