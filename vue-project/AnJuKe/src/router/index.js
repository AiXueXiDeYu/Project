import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
   history: createWebHashHistory(),
   routes: [
      {
         path:'/',
         redirect: 'home'
      },
      {
         path: '/home',
         name: 'home',
         meta:{
            index: 1
         },
         component: Home
      },
      {
         path: '/message',
         name: 'message',
         meta:{
             index: 1
         },
         component: () => import('@/views/Message.vue')
      },
      {
         path: '/recommend',
         name: 'recommend',
         meta:{
             index: 1
         },
         component: () => import('@/views/Recommend.vue')
      },
      {
         path: '/user',
         name: 'user',
         meta:{
             index: 1
         },
         component: () => import('@/views/User.vue')
      },
      {
         path: '/login',
         name: 'login',
         meta:{
             index: 1
         },
         component: () => import('@/views/Login.vue')
      },
      {
         path: '/detail',
         name: 'detail',
         meta:{
             index: 3
         },
         component: () => import('@/views/User.vue')
      },
   ]

})
export default router

