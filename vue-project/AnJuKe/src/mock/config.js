import Mock from 'mockjs'
import swiperList from './data/swiperList'
import detailList from './data/detailList'
import detailSwiper from './data/detailSwiper'
import categoryList from './data/categoryList'
import hotHouses from './data/hotHouses'
import newHouses from './data/newHouses'
import rentalHouses from './data/rentalHouses'
import findHouses from './data/findHouses'
import guWen from './data/guWen'

const usersMap = new Map()// 存储全量用户数据
const regName = new Set() // 存值用户注册账号

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

Mock.mock(/\/findHouses/, 'get', () => {
   return {
      code: 0,
      result: findHouses
   }
})

Mock.mock(/\/guWen/, 'get', () => {
   return {
      code: 0,
      result: guWen
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

// 模拟登录注册
Mock.mock(/\/login/, 'post', (options) => {
   const { body } = options
   const { username, password, regname, regpassword, type } = JSON.parse(body)
   const result = regName.has(username) // 用户名是否注册
   const regPassword = usersMap.get(username) // 查询密码
   if (type === 'login') { // 登录请求
     if (result && password === regPassword) { // 成功登录
       return {
         code: 0,
         status: 200,
         token: 'xxvcvdvcvcvdfdfddddddd',
         msg: '登录成功'
       }
     } else if(result) { // 密码错误
       return {
         code: 1,
         status: 400,
         msg: '密码有误，请重新输入'
       }
     } else { // 账号错误
       return {
         code: 1,
         status: 400,
         msg: '用户名未注册'
       }
     }
   } else if (type === 'register') { // 注册请求
     if (usersMap.has(regname)) { // 用户名已注册
       return true
     } else {
       usersMap.set(regname, regpassword); // 用户名未注册
       regName.add(regname)
       return false
     }
   }
 })