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
         component: () => import('@/views/Login.vue')
      },
      {
         path: '/detail/:id',
         name: 'detail',
         meta:{
             index: 3
         },
         component: () => import('@/views/Detail.vue')
      },
      {
         path: '/search',
         name: 'search',
         meta:{
             index: 2
         },
         component: () => import('@/views/Search.vue')
      },

   ]

})
export default router

