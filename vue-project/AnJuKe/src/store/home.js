import { defineStore } from 'pinia'
// 每个路由级别组件都有独立的store 模块
import { getSwiperList, getHotHouses, getCategoryList, getRentalHouses, getNewHouses } from '@/service/home.js'


// 每个子仓库都是一个函数， use 开头，store 结尾， hooks
// 界面工程师 简单的写页面
export const useHomeStore = defineStore('home', {
   state: () => ({
      swiperList: [],
      categoryList: [],
      hotHouses: [],
      newHouses: [],
      rentalHouses: [],
      leftHouses: [],
      rightHouses: [],
      loading: true
   }),
   actions: {
      // 修改 也在store 里面 数据管理的闭环？
      async getSwiperList() {
         const { result } = await getSwiperList()
         // console.log(res);
         this.swiperList = result
      },
      async getCategoryList() {
         const { result } = await getCategoryList()
         // console.log(res);
         this.categoryList = result
      },
      async getHotHouses() {
         const { result } = await getHotHouses()
         // console.log(res);
         this.hotHouses = result
      },
      async getNewHouses() {
         const { result } = await getNewHouses()
         // console.log(res);
         this.newHouses = result
      },
      async getRentalHouses() {
         const { result } = await getRentalHouses()
         // console.log(res);
         this.rentalHouses = result
      },
      // async getHotHousesList() {
      //    // 两列式瀑布流布局
      //    let leftTempGoods = [],
      //       rightTempGoods = [];
      //    const heights = [0, 0];
      //    const getMinHeight = () => { // 拿到高度最短的一行
      //       let minHeight = Math.min(...heights);
      //       return heights.indexOf(minHeight)
      //    };
      //    for (let i = 0; i < this.hotHouses.length; i++) {
      //       let minHeightIndex = getMinHeight()
      //       if (minHeightIndex === 0) {
      //          leftTempGoods.push(this.hotHouses[i])
      //       } else {
      //          rightTempGoods.push(this.hotHouses[i])
      //       }
      //       heights[minHeightIndex] += this.hotHouses[i].height // 总是在最短的一行添加商品
      //    }
      // }
   }
})