import { defineStore } from 'pinia'
import { getFindHouses } from '@/service/search.js'

export const useSearchStore = defineStore('search', {
    state: () => ({
        findHouses: []
    }),
    actions: {
        async getFindHouses() {
            const { result } = await getFindHouses()
            // console.log(res);
            this.findHouses = result
         },
    }
})