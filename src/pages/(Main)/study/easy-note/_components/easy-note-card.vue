<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
// api
import { supportNote, deleteNote } from '@/api/easy-note';
// stores
import useUserInfo from '@/stores/user-info';
import { useEasyNoteStore } from '@/stores/easy-note/easy-note';
import { useClassEasyNoteStore } from '@/stores/easy-note/class-easy-note';
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
    tagList: EasyNoteTags[] | null;
    openid: string; // 来自（创建者）id
    username: string; // 来自（创建者）昵称
    seeNumber: number; // 被多少人查看 
    supportNumber: number; // 有多少人击掌
}
const { card } = defineProps<{ card: EasyNoteCard }>()
const supportNumber = ref(card.supportNumber);


// stores
const userInfoStore = useUserInfo();
const easyNoteStore = useEasyNoteStore();
const classEasyNoteStore = useClassEasyNoteStore();


// 根据 tag 处理 note 的样式表现
const isNoteImportant = computed(() => {
    if (!card.tagList || card.tagList.length === 0) {
        return false
    } else if (card.tagList.some(tag => tag.tagName === "重要")) {
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
            tag: card.tagList && card.tagList.length > 0 
            ? easyNoteTagColorMapper[card.tagList[0].tagName]
            : easyNoteTagColorMapper.default
        }
    }
});


// 处理卡片打开和关闭
const isCardOpen = ref(false);
function onCardClick() {
    isCardOpen.value = !isCardOpen.value;
}


// 击掌点赞
const isNoteSupported = ref(false);
async function supportEasyNote() {
    console.log(isNoteSupported.value);

    const isSuccess = await supportNote(
        card.id,
        userInfoStore.openid!,
        isNoteSupported.value ? 0 : 1
    );

    if (isSuccess) {
        supportNumber.value = isNoteSupported.value ? supportNumber.value - 1 : supportNumber.value + 1;
        isNoteSupported.value = !isNoteSupported.value;
    } else {
        uni.showToast({
            title: "击掌失败",
            icon: "error"
        });
    }
}


// 小记更多操作 - [ 1. 删除 ]
const moreOption = reactive([
    {
        text: "删除",
        style: {
            backgroundColor: '#df625e',
        },
        onClick: () => deleteEasyNote
    }
]);
async function deleteEasyNote() {
    const isSuccess = await deleteNote(card.id);
    if (isSuccess) {
        uni.showToast({
            title: "删除成功",
            icon: "success"
        });

        // 查找列表中该 id 的小记并删除
        easyNoteStore.deleteNote(card.id);
        classEasyNoteStore.deleteNote(card.id);
    };
}
</script>

<template>
    <up-swipe-action>
        <!-- 添加更多功能后修改 click 的触发逻辑 -->
        <up-swipe-action-item
            :options="moreOption"
            @click="deleteEasyNote"
        >
            <view
                class="w-full rounded-2xl flex flex-col justify-between p-4"
                :style="{ backgroundColor: noteColor.bg }"
            >
                <view 
                    class="flex items-center justify-between"
                    @click="onCardClick"
                >
                    <view class="flex flex-col">
                        <text class="text-md font-bold">
                            {{ card.title }}
                        </text>
                        <view
                            class="mt-1 text-sm flex flex-col text-black text-opacity-35"
                        >
                            <text>{{ card.courseName }}</text>
                            <text>{{ card.deadline }}</text>
                        </view>
                        <text class="text-sm text-black text-opacity-35">
                            来自 {{ card.username }}
                        </text>
                    </view>
                    <view class="flex flex-col justify-between items-end gap-y-2">
                        <!-- 查看人数 -->
                        <text class="text-sm text-black text-opacity-35">
                            有 {{ card.seeNumber }} 人查看
                        </text>
                        <!-- 外显 tag -->
                        <view 
                            v-if="card.tagList && card.tagList.length !== 0" 
                            class="flex-1"
                        >
                            <view
                                class="px-3 py-1 rounded-full text-white font-bold text-sm transition-all duration-300"
                                :class="isCardOpen ? 'scale-0' : 'scale-100'"
                                :style="{ backgroundColor: noteColor.tag }"
                            >
                                {{ isNoteImportant ? "重要" : card.tagList[0].tagName }}
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
                    :class="isCardOpen ? 'h-[100px]' : 'h-0'"
                    @click="onCardClick"
                >
                    <view class="pb-4">
                        {{ card.content }}
                    </view>
                </scroll-view>

                <!-- 展开卡片的 footer -->
                <view
                    v-if="isCardOpen"
                    class="flex items-center justify-between"
                >
                    <!-- tag -->
                    <view class="flex items-center gap-x-2">
                        <view
                            v-for="tag in card.tagList"
                            :key="tag.id"
                            class="px-3 py-1 rounded-full text-white font-bold text-sm"
                            :style="{ backgroundColor: easyNoteTagColorMapper[tag.tagName] }"
                        >
                            {{ tag.tagName }}
                        </view>
                    </view>
                    <!-- 击掌 -->
                    <view 
                        class="relative w-8 h-8"
                        @click="supportEasyNote"
                    >
                        <text class="absolute -top-6 left-1/2 -translate-x-1/2 text-sm text-fit-background-lighter">
                            {{ supportNumber }}
                        </text>
                        <image
                            v-if="!isNoteSupported"
                            :src="icons.easyNote.clap"
                            class="size-full"
                        />
                        <image
                            v-else
                            :src="icons.easyNote.claped"
                            class="size-full"
                        />
                    </view>
                </view>
            </view>
        </up-swipe-action-item>
    </up-swipe-action>

</template>
