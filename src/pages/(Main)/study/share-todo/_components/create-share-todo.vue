<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import cusInput from '@/components/cus-input.vue';
import cusSelect from '@/components/cus-select.vue'
import cusButton from '@/components/cus-button.vue';
// mock
import { tags } from '@/mock/share-todo';
// vue
import { onMounted, ref } from 'vue';
// icons
import icons from '@/constants/icons'
// utils
import { getDate, getCurrentTime } from '@/utils/utils'

interface todoForm {
    content: string;
    reminderDate: string;
    remindertime: string;
    recur: string;
    tag: string[];
}

onMounted(() => {
    todoForm.value = todoList.value[currentRecourceIndex.value];
})

// todo表单信息
let todoForm = ref<todoForm>(
    {
        content: '',
        reminderDate: getDate(),
        remindertime: getCurrentTime(),
        recur: '',
        tag: [],
    }
)
// todo列表
let todoList = ref<todoForm[]>([
    {
        content: '吃饭',
        reminderDate: '2024-07-01',
        remindertime: '10:14',
        recur: '',
        tag: ['重要'],
    },{
        content: '睡觉',
        reminderDate: '2024-07-17',
        remindertime: '12:10',
        recur: '',
        tag: ['日常'],
    }
]);


// 重复 select相关
const recurList = ['每日', '每周'];
let selectRecurIndex = ref<number>(0);

// 标签 tags相关
const handleAddTag = (item: string) => {
    if ( todoForm.value.tag.includes(item) ) {
        todoForm.value.tag = todoForm.value.tag.filter(tag => tag !== item);
    }else {
        todoForm.value.tag.push(item);
    }
    
}


// change事件修改
const onDateChange = (e: any) => {
    todoForm.value.reminderDate = e.value;
    console.log(todoForm.value);
}

const onTimeChange = (e: any) => {
    todoForm.value.remindertime = e.value
}

const setTodoContent = (e: any) => {
    todoForm.value.content = e.value;    
}

const onRecurChange = (e: any) => {
    console.log(e.value);
    selectRecurIndex.value = e.value;
    todoForm.value.recur = recurList[e.value];
}


// 切换数据源相关
let currentRecourceIndex = ref(0);
const handleSwiperChange = (e:any) => {
    currentRecourceIndex.value = e.detail.current;
    todoForm.value = todoList.value[currentRecourceIndex.value];
    console.log(todoForm.value);
}
// 继续添加
const handleAddOne = () => {
    resetTodoForm();
    console.log(todoForm.value);
    todoList.value.unshift(todoForm.value)
}
const resetTodoForm = () => {
    todoForm.value = {
        content: '',
        reminderDate: getDate(),
        remindertime: getCurrentTime(),
        recur: '',
        tag: [],
    }
}
// 下一步
const handleToPost = () => {
    uni.navigateTo({
        url: `/pages/(Main)/study/share-todo/_components/post-share-todo?todoList=${JSON.stringify(todoList.value)}`,
    })
}

</script>

<template>
    <cus-page header-type="nav" padding-x="16">

        <swiper class="swiper" :current="currentRecourceIndex" @change="handleSwiperChange($event)" :vertical="true">
            <swiper-item 
                v-for="(item, index) in todoList" 
                :key="index" 
                class=" swiper_item border  "
                :class="{swiper_item_first: currentRecourceIndex === index}" 
                :style="{ marginTop: currentRecourceIndex * 20 + 'px' }"
                >
                <view :class=" currentRecourceIndex === index ? 'w-full rounded-[20px] bg-[#F8F1E8] gap-2 px-5 pt-3 pb-3' : 'ml-5 w-1/2 rounded-[10px] bg-[#F8E8E8] px-3 pt-1 pb-1' " class="header flex flex-col">
                    <view v-if="!item.content" class="  w-full rounded-lg bg-[#808080]/10 h-5"></view>
                    <text :class=" currentRecourceIndex === index ? 'font-bold text-[18px] h-5' : 'font-bold text-[12px] h-5' " v-else>{{ item.content }}</text>
                    <text :class=" currentRecourceIndex === index ? 'text-[#808080] text-[14px] font-[300]' : 'text-[#808080] text-[8px] font-[300]' ">{{ item.reminderDate + '-' + item.remindertime }}</text>
                </view>
            </swiper-item>
            
        </swiper>

       

        <view class=" flex flex-col gap-2">
            <text class=" text-black font-bold text-[28px] mt-3">制定你的第一份Todo</text>
            <text class=" text-black text-[12px] -mt-2 font-[300]">迈向目标的第一步，从认真制定一份计划开始</text>
        </view>

        <scroll-view 
            class="mt-3 overflow-hidden flex-1 flex flex-col"
            scroll-y
        >
            <cus-input @input="setTodoContent" :value="todoForm.content" field-name="计划内容" />

            <view class="w-full flex justify-between items-center">
                <view class="mt-3 flex flex-col gap-1 w-[48%]">
                    <text class="text-sm font-semibold text-secondary-foreground pl-2">
                        提醒日期
                    </text>
                    <cus-select
                        mode="date"
                        :value="todoForm.reminderDate"
                        @change="onDateChange"
                    />
                </view>

                <view class="mt-3 flex flex-col gap-1 w-[48%]">
                    <text class="text-sm font-semibold text-secondary-foreground pl-2">
                        提醒时间
                    </text>
                    <cus-select
                        mode="time"
                        :value="todoForm.remindertime"
                        @change="onTimeChange"
                    />
                </view>
            </view>

            <view class="mt-3 flex flex-col gap-1">
                <text class="text-sm font-semibold text-secondary-foreground pl-2">
                    重复
                </text>

                <cus-select
                    mode="selector"
                    :value="selectRecurIndex"
                    :range="recurList"
                    @change="onRecurChange"
                />
            </view>

            <view class="mt-3 flex flex-col gap-1">
                <text class="text-sm font-semibold text-secondary-foreground pl-2">
                    标签（点击选择）
                </text>

                <view class=" flex justify-start gap-2 items-center h-[50px]">
                    <view @click="handleAddTag(item)" :style="{ backgroundColor: todoForm.tag.includes(item) ? '#f05858' : '' }" :class=" { 'text-white' : todoForm.tag.includes(item) } " v-for="item in tags" :key="item" class=" font-bold text-[12px] bg-[#e0e0e0] text-[#899199] py-1 px-3 rounded-full">
                        {{ item }}
                    </view>

                    <view class=" flex justify-center items-center w-[30px] h-[30px]">
                        <image class=" w-[24px]" :src="icons.study.add"/>
                    </view>
                </view>
            </view>
        </scroll-view>

        <view class=" flex flex-col gap-2 mt-auto mb-10">
            <cus-button @click="handleAddOne">
                继续添加
            </cus-button>

            <cus-button @click="handleToPost" variant="outline">
                下一步
            </cus-button>
        </view>

    </cus-page>
</template>

<style scoped>
.swiper{
    height: 100px;
}
.swiper_item{
    height: 80px!important;
    position: relative;
}
.swiper_item_first{
    height: 80px!important;
    position: relative;
    transition: all 1.5s;
}
</style>