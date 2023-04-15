<template>
    <div class="header">
        <div class="text">
            <div class="weiliao" :class="index==active ? 'active': ''" @click="store.isWL = !store.isWL;a(index)" v-for="(item, index) in list" :key="index">
                {{ item.text }}
            </div>
        </div>
        <van-icon name="delete-o" size=".533333rem" class="icon" style="margin-right: .533333rem;"/>
        <van-icon name="add-o" size=".533333rem" class="icon"/>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMessageStore } from '@/store/message.js'

const list = [
    {text: '微聊'},
    {text: '通知'}
]
const active = ref(0)
const store = useMessageStore

const a =  (index) => {
    active.value = index
}

</script>

<style lang="stylus" scoped>
.header
    display flex
    .icon
        margin 20px
    .text
        display flex
        flex 1
        justify-content space-around
        margin 20px
        .weiliao
            font-size 18px
            font-weight 800
        .active
            color #26ca95
</style>