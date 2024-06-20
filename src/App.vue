<script setup lang="ts">
import { useStatusBarHeight } from './stores/statusBarHeight';

// 自适应状态栏高度
const statusBarHeight = uni.getMenuButtonBoundingClientRect().top;
useStatusBarHeight().set(statusBarHeight - 15);
</script>

<style>
@import "@/normalize.css";
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    :root {
        --background: 20 30% 98%;
        --foreground: 330 33% 99%;
        --secondary: 227 47% 94%;
        --secondary-foreground: 210 7% 57%;
        --primary: 225 76% 55%;
        --muted: 0 0% 85%;
        --destructive: 356 61% 40%;
    }
}
</style>
