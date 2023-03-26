import { defineStore } from 'pinia'
import { getguWen } from '@/service/message.js'
export const useMessageStore = defineStore('message', {
    state: () => ({
        guWen:[],
        isWL : true,
    }),
    actions: {
        async getguWen() {
            const { result } = await getguWen()
            this.guWen = result
         }
    }
})