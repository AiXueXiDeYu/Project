import axios from './config.js'  // axios 标准

export const getFindHouses = () => {
    return axios.get('/findHouses')
}

