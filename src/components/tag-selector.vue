<script setup lang="ts">
import { computed, withDefaults } from 'vue';

export type Tag =  {
    name: string;
    color: string;
}
interface TagSelectorProps {
    tags: Tag[];
    selectedTags?: Tag[];
    onTagChange?: () => Tag[];
}
const props = withDefaults(defineProps<TagSelectorProps>(), {
    selectedTags: () => [],
});


const selectedTags = computed(() => props.selectedTags);


const emit = defineEmits(['change']);
function selectTag(tag: Tag) {
    const updatedTags = props.selectedTags.some(stag => stag.name === tag.name)
        ? props.selectedTags.filter(stag => stag.name !== tag.name)
        : [...props.selectedTags, tag];
    
    emit('change', updatedTags);
}
</script>

<template>
    <view class="w-full flex items-center gap-x-2">
        <view
            v-for="tag in props.tags"
            :key="tag.name"
            class="flex items-center justify-center rounded-full px-4 py-2"
            :style="{
                backgroundColor:
                selectedTags.some(stag => stag.name === tag.name)
                ? tag.color
                : '#e0e0e0',
            }"
            @click="selectTag(tag)"
        >
            <text
                class="font-bold text-sm"
                :style="{
                    color:
                    selectedTags.some(stag => stag.name === tag.name)
                    ? '#ffffff'
                    : '#899199'
                }"
            >
                {{ tag.name }}
            </text>
        </view>
    </view>
</template>
