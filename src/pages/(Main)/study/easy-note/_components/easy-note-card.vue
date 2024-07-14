<script setup lang="ts">
import { ref, computed } from 'vue';
// constants
import {
    easyNoteTagColorMapper,
    easyNoteColorMapper
} from '@/constants/easy-note/easy-note-card';
// static
import icons from '@/constants/icons';


type EasyNoteTagsName = "重要" | "作业" | "考试"
type EasyNoteTags =  {
    id: number;
    tagName: EasyNoteTagsName;
    noteId: number;
    isDelete: 0 | 1;
    createdTime: string;
    updatedTime: string;
}
export interface EasyNoteCard {
    id: number;
    title: string;
    content: string;
    imagesUrl: (string | null)[];
    deadline: string | Date;
    courseName: string;
    tagList: EasyNoteTags[];
    openid: string; // 来自（创建者）id
    username: string; // 来自（创建者）昵称
    seeNumber: number; // 被多少人查看 
    supportNumber: number; // 有多少人击掌
}
const easyNoteCardProps = defineProps<EasyNoteCard>();


// 根据 tag 处理 note 的样式表现
const isNoteImportant = computed(() => {
    if (easyNoteCardProps.tagList.length === 0) {
        return false
    } else if (easyNoteCardProps.tagList.some(tag => tag.tagName === "重要")) {
        return true;
    };
});
const noteColor = computed(() => {
    if (isNoteImportant.value) {
        return {
            bg: easyNoteColorMapper.important,
            tag: easyNoteTagColorMapper["重要"]
        }
    } else {
        return {
            bg: easyNoteColorMapper.normal,
            tag: easyNoteCardProps.tagList.length > 0 
            ? easyNoteTagColorMapper[easyNoteCardProps.tagList[0].tagName]
            : easyNoteTagColorMapper.default
        }
    }
});


// 处理卡片打开和关闭
const isCardOpen = ref(false);
function onCardClick() {
    isCardOpen.value = !isCardOpen.value;
}
</script>

<template>
    <view
        class="w-full rounded-2xl flex flex-col justify-between p-4"
        :style="{ backgroundColor: noteColor.bg }"
        @click="onCardClick"
    >
        <view class="flex items-center justify-between">
            <view class="flex flex-col">
                <text class="text-md font-bold">
                    {{ easyNoteCardProps.title }}
                </text>
                <view 
                    class="text-sm flex flex-col text-black text-opacity-35"
                >
                    <text>{{ easyNoteCardProps.deadline }}</text>
                    <text>{{ easyNoteCardProps.courseName }}</text>
                </view>
                <text class="text-sm text-black text-opacity-35">
                    来自 {{ easyNoteCardProps.username }}
                </text>
            </view>
            <view class="flex flex-col justify-between items-end gap-y-2">
                <!-- 查看人数 -->
                <text class="text-sm text-black text-opacity-35">
                    有 {{ easyNoteCardProps.seeNumber }} 人查看
                </text>
                <!-- 外显 tag -->
                <view 
                    v-if="easyNoteCardProps.tagList.length !== 0" 
                    class="flex-1"
                >
                    <view
                        class="px-3 py-1 rounded-full text-white font-bold text-sm transition-all duration-300"
                        :class="isCardOpen ? 'scale-0' : 'scale-100'"
                        :style="{ backgroundColor: noteColor.tag }"
                    >
                        {{ isNoteImportant ? "重要" : tagList[0].tagName }}
                    </view>
                </view>
            </view>
        </view>
        <!-- 分割线 -->
        <view class="w-full bg-black/10 transition-all duration-300" :class="isCardOpen ? 'my-4 h-[1px]' : 'my-0 h-0'" />
        <!-- content -->
        <scroll-view 
            scroll-y
            class="overflow-hidden transition-all duration-300" 
            :class="isCardOpen ? 'h-[100px]' : 'h-0'
        ">
            <view class="pb-4">
                {{ easyNoteCardProps.content }}
            </view>
        </scroll-view>
        <!-- 展开卡片的 footer -->
        <view
            v-if="isCardOpen"
            class="flex items-end justify-between"
        >
            <view class="flex items-center gap-x-2">
                <view
                    v-for="tag in easyNoteCardProps.tagList"
                    :key="tag.id"
                    class="px-3 py-1 rounded-full text-white font-bold text-sm"
                    :style="{ backgroundColor: easyNoteTagColorMapper[tag.tagName] }"
                >
                    {{ tag.tagName }}
                </view>
            </view>
            <!-- 击掌数量 -->
            <view class="flex flex-col items-center">
                <text class="text-sm text-fit-background-lighter">
                    {{ easyNoteCardProps.supportNumber }}
                </text>
                <image :src="icons.easyNote.haveFive" class="size-9" />
            </view>
        </view>
    </view>
</template>
