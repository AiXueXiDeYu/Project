import { defineStore } from 'pinia'
import { getDetailList, getDetailSwiper } from '@/service/detail.js'

export const useDetailStore = defineStore('detail', {
    state: () => ({
        detailList: [],
        detailSwiper: []
    }),
    actions: {
        async getDetailList() {
            const { result } = await getDetailList()
            // console.log(res);
            this.detailList = result
         },
         async getDetailSwiper() {
            const { result } = await getDetailSwiper()
            // console.log(res);
            this.detailSwiper = result
         }
    }
})