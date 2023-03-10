import Mock from 'mockjs'
import swiperList from './data/swiperList'
import houseList from './data/houseList'
import detail from './data/detail'
import categoryList from './data/categoryList'

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

Mock.mock(/\/houseList/, 'get', () => {
   return {
      code: 0,
      result: houseList
   }
})

// 假冒的服务器
Mock.mock(/\/detail/, 'get', () => {
   return {
      code: 0, // 没有错误发生
      // code: 1,
      // msg: '服务器出错了',
      result: detail
   }
})