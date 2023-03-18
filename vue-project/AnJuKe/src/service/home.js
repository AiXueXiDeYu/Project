import axios from "./config.js"

export const getSwiperList = () => {
   return axios.get('/swiperList')
}

export const getCategoryList = () => {
   return axios.get('/categoryList')
}

export const getHotHouses = () => {
   return axios.get('/hotHouses')
}

export const getNewHouses = () => {
   return axios.get('/newHouses')
}

export const getRentalHouses = () => {
   return axios.get('/rentalHouses')
}
