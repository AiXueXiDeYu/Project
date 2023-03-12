<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item :to="(item.name)" v-for="(item, index) in tabbars" :key="'tabbar' + index">
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.active : item.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue'

const active = ref(0);
const tabbars = [{
  name: '/home',
  title:'首页',
  inactive: 'https://i.328888.xyz/2023/03/12/v4WB3.png',
  active: 'https://i.328888.xyz/2023/03/12/v4kJy.png',
},
{
  name:'/message',
  title:'消息',
  inactive: 'https://i.328888.xyz/2023/03/12/v4w5Z.png',
  active: 'https://i.328888.xyz/2023/03/12/v4HZF.png'
},
{
  name:'/recommend',
  title:'看点',
  inactive: 'https://i.328888.xyz/2023/03/12/v4tkv.png',
  active: 'https://i.328888.xyz/2023/03/12/v4UaU.png'
},
{
  name:'/user',
  title:'我的',
  inactive: 'https://i.328888.xyz/2023/03/12/v4CA5.png',
  active: 'https://i.328888.xyz/2023/03/12/v4lr8.png'
}
]

const router = useRouter()

router.beforeEach((to, from) => {
  // console.log(from, to, '//// /');
  if (to.meta.index > from.meta.index) {
    // 从主页面 去到子页面
    state.transitionName = 'slide-left'
  } else if (to.meta.index < from.meta.index) {
    // 子页面回到主页面
    state.transitionName = 'slide-right'
  } else {
    // 平级
    state.transitionName = ''
  }
})
const state = reactive({
  transitionName: 'slide-left'
})
</script>

<style >
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  height: 100%;
  /* 提前告知浏览器，即将会有transform 渐变 */
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  backface-visibility: hidden;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

;

.slide-left-enter-from {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>