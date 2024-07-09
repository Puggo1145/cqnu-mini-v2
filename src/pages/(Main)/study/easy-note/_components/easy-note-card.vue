<script setup lang="ts">
import { ref, computed } from 'vue';
// constants
import {
    easyNoteTagMapper,
    easyNoteTagColorMapper,
    easyNoteColorMapper
} from '@/constants/easy-note/easy-note-card';

enum EasyNoteTags {
    "重要",
    "作业",
    "考试"
}
export interface EasyNoteCard {
    id: number;
    title: string;
    content: string;
    images: (string | null)[];
    deadline: string | Date;
    relatedCourse: string;
    tags: EasyNoteTags[];
    from: string; // 来自
    seenNumber: number; // 被多少人查看 
    supportedNumber: number; // 有多少人击掌
}
const easyNoteCardProps = defineProps<EasyNoteCard>();


// 根据 tag 处理 note 的样式表现
const isNoteImportant = computed(() => easyNoteCardProps.tags.includes(0));
const noteColor = computed(() => {
    if (isNoteImportant.value) {
        return easyNoteColorMapper.important
    } else {
        return easyNoteColorMapper.normal
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
        :style="{ backgroundColor: noteColor }"
        @click="onCardClick"
    >
        <view class="flex items-center justify-between">
            <view class="flex flex-col">
                <text class="text-md font-bold">
                    {{ easyNoteCardProps.title }}
                </text>
                <view class="text-sm flex items-center gap-2 text-black text-opacity-35">
                    <text>{{ easyNoteCardProps.relatedCourse }}</text>
                    <text>{{ easyNoteCardProps.deadline }}</text>
                </view>
                <text class="text-sm text-black text-opacity-35">
                    来自 {{ easyNoteCardProps.from }}
                </text>
            </view>
            <view class="flex flex-col justify-between items-end gap-y-2">
                <!-- 查看人数 -->
                <text class="text-sm text-black text-opacity-35">
                    有 {{ easyNoteCardProps.seenNumber }} 人查看
                </text>
                <!-- 外显 tag -->
                <view class="flex-1">
                    <view
                        class="px-3 py-1 rounded-full text-white font-bold text-sm"
                        :style="{ backgroundColor: easyNoteTagColorMapper[tags[0]] }"
                    >
                        {{ easyNoteTagMapper[tags[0]] }}
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
    </view>
</template>
