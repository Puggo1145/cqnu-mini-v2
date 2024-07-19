<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import cusButton from '@/components/cus-button.vue';

import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
// utils
import { getDate, getCurrentTime } from '@/utils/utils'

interface todoForm {
    content: string;
    reminderDate: string;
    remindertime: string;
    recur: string;
    tag: string[];
}

let todoList = ref<todoForm[]>([]);

// 接收参数
onLoad(options => {
    let tempTodoList = JSON.parse(options.todoList)
    console.log(tempTodoList);
    todoList.value = [...tempTodoList];
    console.log(todoList.value);
});


</script>

<template>
    <cus-page class="" header-type="nav" padding-x="16">
        <view style="margin: 20px auto;" class=" flex flex-col gap-4 todo-list bg-white rounded-lg w-[95%] py-5 px-3">
            <text class=" text-[#434041] font-bold text-[24px]">我的第一份Todo</text>

            <scroll-view scroll-y class=" flex flex-col gap-5 pt-3">
                <view v-for="(item, index ) in todoList" :key="index" class=" mb-5 w-full rounded-[20px] bg-[#F8F1E8] flex flex-col gap-2 px-5 pt-3 pb-3">
                    <text class=" font-bold text-[18px] h-5">{{ item.content }}</text>
                    <text class=" text-[#808080] text-[14px] font-[300]">{{ item.reminderDate + ' - ' + item.remindertime }}</text>
                </view>
            </scroll-view>
        </view>

        <view class=" flex flex-col gap-2 py-5 px-3 mt-[20%]">
            <text class=" text-[32px] font-bold ">决定好了吗！</text>
            <text class=" text-[14px]">从这里迈出第一步，或者返回继续修改</text>
        </view>

        <cus-button variant="primary">
            决定好了
        </cus-button>
        
    </cus-page>
</template>