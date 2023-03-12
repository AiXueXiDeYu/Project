import { defineStore } from 'pinia'
// 每个路由级别组件都有独立的store 模块
import { getSwiperList, getHouseList, getCategoryList} from '@/service/home.js'


// 每个子仓库都是一个函数， use 开头，store 结尾， hooks
// 界面工程师 简单的写页面
export const useHomeStore = defineStore('home', {
   state: () => ({
         swiperList:[],
         houseList:[],
         categoryList:[],
         leftHouse: [],
         rightHouse: [],
         loading: true
   }),
   actions: {
      // 修改 也在store 里面 数据管理的闭环？
      async getSwiperList() {
         const {result} = await getSwiperList()
         // console.log(res);
         this.swiperList = result
      },
      async getHouseList() {
         const {result} = await getHouseList()
         // console.log(res);
         this.houseList = result
      },
      async getCategoryList() {
         const {result} = await getCategoryList()
         // console.log(res);
         this.categoryList = result
      },
      // async getLoading() {
      //    const {result} = await getLoading()
      //    // console.log(res);
      //    this.loading = result
      // },
   }
})