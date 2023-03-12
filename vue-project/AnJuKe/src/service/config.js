import axios from 'axios'
axios.interceptors.response.use((res) => {
    // console.log(res)
    return res.data
})

export default axios