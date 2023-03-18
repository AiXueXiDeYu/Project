import Mock from 'mockjs'
import swiperList from './data/swiperList'
import detailList from './data/detailList'
import detailSwiper from './data/detailSwiper'
import categoryList from './data/categoryList'
import hotHouses from './data/hotHouses'
import newHouses from './data/newHouses'
import rentalHouses from './data/rentalHouses'

// 假接口要满足什么？ 数据 url
Mock.setup({
   timeout: '50-1000' // 随机延时时间， 模拟请求耗时
})
// 轮播图 正则  url 
// 拦截APP中的xhr 请求 匹配路径
Mock.mock(/\/swiperList/, 'get', () => {
   return {
      code: 0,
      result: swiperList
   }
})

Mock.mock(/\/categoryList/, 'get', () => {
   return {
      code: 0,
      result: categoryList
   }
})

Mock.mock(/\/hotHouses/, 'get', () => {
   return {
      code: 0,
      result: hotHouses
   }
})

Mock.mock(/\/newHouses/, 'get', () => {
   return {
      code: 0,
      result: newHouses
   }
})

Mock.mock(/\/rentalHouses/, 'get', () => {
   return {
      code: 0,
      result: rentalHouses
   }
})

Mock.mock(/\/detailSwiper/, 'get', () => {
   return {
      code: 0,
      result: detailSwiper
   }
})

// 假冒的服务器
Mock.mock(/\/detailList/, 'get', () => {
   return {
      code: 0, // 没有错误发生
      // code: 1,
      // msg: '服务器出错了',
      result: detailList
   }
})