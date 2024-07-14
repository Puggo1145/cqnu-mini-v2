<script setup lang="ts">
import { onMounted, ref } from 'vue';
// components
import cusButton from '@/components/cus-button.vue';
import noNote from './no-note.vue';
import easyNoteCard from '@/pages/(Main)/study/easy-note/_components/easy-note-card.vue';
// static
import icons from '@/constants/icons';
// api
import { getNoteList } from '@/api/easy-note';
// types
import type { EasyNoteCard } from '@/pages/(Main)/study/easy-note/_components/easy-note-card.vue';


const notes = ref<EasyNoteCard[]>([]);
const current = ref(1);
const pageSize = ref(5);
onMounted(async () => {
    const data = await getNoteList(
        current.value, 
        pageSize.value,
        "",
        ""
    );
    
    notes.value = data.records;
})


function goToEasyNote() {
    uni.navigateTo({
        url: '/pages/(Main)/study/easy-note/page'
    });
}
function goToCreateEasyNote() {
    uni.navigateTo({
        url: '/pages/(Main)/study/easy-note/_components/create-easy-note'
    });
}
</script>

<template>
    <view class="mt-8">
        <view class="flex items-center justify-between">
            <text class="text-2xl font-bold">
                课堂小记
            </text>
            <cusButton 
                variant="ghost" 
                class-name="text-secondary-foreground font-normal"
                @click="goToEasyNote"
            >
                更多小记
                <image :src="icons.rightSecondary" class="w-5 h-5" />
            </cusButton>
        </view>
        <view class="pt-3">
            <no-note v-if="notes.length === 0" />
            <view v-else class="flex flex-col gap-3">
                <easy-note-card 
                    v-for="note in notes"
                    :key="note.id"

                    :id="note.id"
                    :title="note.title"
                    :content="note.content"
                    :images-url="note.imagesUrl"
                    :deadline="note.deadline"
                    :course-name="note.courseName"
                    :tags="note.tags"
                    :openid="note.openid"
                    :username="note.username"
                    :seeNumber="note.seeNumber"
                    :supportNumber="note.supportNumber"
                />
                <view 
                    class="w-full h-[96px] bg-secondary rounded-2xl flex justify-center items-center"
                    @click="goToCreateEasyNote"
                >
                    <image :src="icons.plus" class="size-9"/>
                </view>
            </view>
        </view>
    </view>
</template>