<script setup lang="ts">
import { onMounted, ref } from 'vue';
// components
import cusButton from '@/components/cus-button.vue';
import noNote from './no-note.vue';
import easyNoteCard from '@/pages/(Main)/study/easy-note/_components/easy-note-card.vue';
import loading from '@/components/loading.vue';
import cusError from '@/components/cus-error.vue';
// static
import icons from '@/constants/icons';
// store
import { useClassEasyNoteStore } from '@/stores/easy-note/class-easy-note';


const store = useClassEasyNoteStore();
const current = ref(1);
const pageSize = ref(5);
onMounted(async () => {
    await store.fetchNotes({
        current: current.value,
        pageSize: pageSize.value,
        tagName: "",
        timespan: "",
    });
})


function goToEasyNote() {
    uni.navigateTo({
        url: '/pages/(Main)/study/easy-note/page',
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
            <view v-if="store.notes === undefined && !store.error" class="mt-4">
                <loading v-if="store.notes === undefined" />
            </view>
            <no-note v-else-if="store.notes && store.notes.length === 0" />
            <cus-error v-else-if="store.error" />
            <view v-else class="flex flex-col gap-3">
                <easy-note-card 
                    v-for="note in store.notes"
                    :key="note.id"

                    :id="note.id"
                    :title="note.title"
                    :content="note.content"
                    :images-url="note.imagesUrl"
                    :deadline="note.deadline"
                    :course-name="note.courseName"
                    :tag-list="note.tagList"
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