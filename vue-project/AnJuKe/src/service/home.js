import axios from "./config.js"

export const getSwiperList = () => {
   return axios.get('/swiperList')
}

export const getHouseList = () => {
   return axios.get('/houseList')
}

export const getCategoryList = () => {
   return axios.get('/categoryList')
}
