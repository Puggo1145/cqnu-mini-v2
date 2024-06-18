<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    variant?: "primary" | "secondary" | "muted" | "outline" | "loading";
    class?: string;
}
const props = defineProps<Props>();

const variants = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    muted: "bg-muted text-secondary-foreground",
    outline: "border border-primary border-solid text-primary bg-white",
    loading: "bg-primary text-white",
};
const buttonStyle = computed(() => {
    return props.class + " " + variants[props.variant || "primary"];
});

const emit = defineEmits(['click']);
</script>

<template>
    <button
        :class="buttonStyle" class="h-[52px] rounded-2xl text-md font-bold leading-[52px]"
        @click="emit('click')"    
    >
        <slot />
    </button>
</template>