import axios from './config.js'  // axios 标准

export const getguWen = () => {
    return axios.get('/guWen') 
}



