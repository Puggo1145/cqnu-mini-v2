<script setup lang="ts">
import { ref } from 'vue';
// components
import cusButton from '@/components/cus-button.vue';
import noNote from './no-note.vue';
import easyNoteCard from '@/pages/(Main)/study/easy-note/_components/easy-note-card.vue';
// static
import icons from '@/constants/icons';
// mock
import { mockNotes } from '@/mock/easy-note';

const notes = ref(mockNotes);

function goToEasyNote() {
    uni.navigateTo({
        url: '/pages/(Main)/study/easy-note/page'
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
                <easyNoteCard 
                    v-for="note in notes"
                    :key="note.id"
                    v-bind="note"
                />
                <cus-button 
                    variant="ghost"
                    class="w-full h-[96px] bg-secondary rounded-2xl flex justify-center items-center"
                >
                    <image :src="icons.plus" class="size-9"/>
                </cus-button>
            </view>
        </view>
    </view>
</template>