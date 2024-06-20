<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    variant?: "primary" | "secondary" | "muted" | "outline" | "loading" | "ghost";
    className?: string;
    disabled?: boolean;
}
const props = defineProps<Props>();

const variants = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    muted: "!bg-muted text-secondary-foreground",
    outline: "border border-primary border-solid text-primary bg-white",
    loading: "bg-primary text-white",
    ghost: '!h-[32px] !leading-[32px] text-primary bg-transparent border-none'
};
const buttonStyle = computed(() => {
    return props.className + " " + variants[props.variant || "primary"];
});

const emit = defineEmits(['click']);
</script>

<template>
    <button
        :class="buttonStyle" 
        class="h-[52px] rounded-2xl text-md font-bold leading-[52px] transition-all"
        hover-class="button-touch"
        @click="emit('click')"    
        :disabled="props.disabled"
    >
        <slot />
    </button>
</template>

<style scoped>
.button-touch {
    filter: brightness(0.8);
}
</style>