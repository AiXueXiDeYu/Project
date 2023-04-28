<template>
	<div class="body" v-for="item in detailList" :key="id">
		<div class="product-info">
			<div class="name">
				{{ item.huoseName }}
				<router-link class="vr" to="/vr">
					VR看房
				</router-link>
				<div class="status">
					<div class="p">
						{{ item.p1 }}
					</div>
					<div class="p">
						{{ item.p2 }}
					</div>
					<div class="p">
						{{ item.p3 }}
					</div>
					<div class="p">
						{{ item.p4 }}
					</div>
				</div>
			</div>
			<div class="houseprice">
				<div class="price">
					{{ item.housePrice }}
				</div>
				<div class="size">
					{{ item.houseSize }}
				</div>
				<div class="all">
					{{ item.houseAll }}
				</div>
			</div>
			<div class="address">
				地址：{{ item.houseAddress }}
			</div>
		</div>
		<div class="product-intro">
			<text>更多信息</text>
			<div class="product-content" v-html="item.houseDetailContent"></div>
		</div>
	</div>
</template>
  
<script setup>
import { useDetailStore } from '@/store/detail.js'
import { onMounted, computed } from 'vue'

const detailStore = useDetailStore()

const detailList = computed(() => detailStore.detailList)

onMounted(async () => {
	await detailStore.getDetailList()
})

console.log(detailList);
</script>
  
<style lang="css" scoped>
.body {
	margin: 10px;
}
.product-info {
	display: flex;
	flex-direction: column 
}
.name{
	font-size: 20px;
	font-weight: 700;
}
.status {
	display: flex; 
	justify-content: flex-start;
	margin: 10px 0;
}
.vr {
	margin-left: 30%;
	font-size: 22px;
	font-weight: 700;
}
.houseprice {
	display: flex; 
	justify-content: space-between;
	margin: 10px 0;
}
.price {
	font-size: 16px;
	font-weight: 800;
	color: red;
}
.size {
	font-size: 16px;
	font-weight: 800;
}
.all {
	font-size: 16px;
	font-weight: 800;
}
.address {
	font-size: 16px;
	font-weight: 800;
}
.p {
	background-color: #f6f6f6;
	margin: .133333rem  .23333rem 0 0/* 5/37.5 */;
	font-size:.266667rem /* 10/37.5 */;
	color: #4c64c6;
}
.product-intro {
	text-align: center;
	margin: 20px 0;
}
.product-intro text{
	font-size: 20px;
	font-weight: 800;
	margin: 10px;
}
.product-content img{
	width: 100%;
}
</style>