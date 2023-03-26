import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
    state: () => ({
        isLogin : false,
    }),

    actions: {
        SET_LOGIN (val) {
            this.isLogin = val
        } 
    }
})