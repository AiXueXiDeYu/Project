import axios from './config.js'  // axios 标准

export function getDetail(id) {
    return axios.get(`detail/${id}`) // promise
}

export const getDetailList = () => {
    return axios.get('/detailList')
}

export const getDetailSwiper = () => {
    return axios.get('/detailSwiper')
}

