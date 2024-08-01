<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app';

import Initiator from './utils/initiator';
import { useStatusBarHeight } from './stores/statusBarHeight';

onLaunch(() => {
    // 自适应状态栏高度
    const statusBarHeight = uni.getMenuButtonBoundingClientRect().top;
    useStatusBarHeight().set(statusBarHeight - 15);

    // 初始化
    const initiator = new Initiator();
    // initiator.validateSignInStatus();
});


</script>

<style lang="scss">
@import "uview-plus/index.scss";
</style>

<style>
@import "@/normalize.css";
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    :root {
        --background: 20 30% 98%;
        --foreground: 330 33% 99%;
        --secondary: 231 10% 94%;
        --secondary-foreground: 0 0% 50%;
        --primary: 225 76% 55%;
        --primary-foreground: 330 33% 99%;
        --muted: 0 0% 85%;
        --destructive: 356 61% 40%;
    }
}
</style>