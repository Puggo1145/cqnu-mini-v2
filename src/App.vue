<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app';

import Initiator from './utils/initiator';
import { useStatusBarHeight } from './stores/statusBarHeight';

// 需要初始化的 store
import useUserInfo from './stores/user-info';
import { useSchedule } from './stores/useSchedule';


onLaunch(async () => {
    // 自适应状态栏高度
    const statusBarHeight = uni.getMenuButtonBoundingClientRect().top;
    useStatusBarHeight().set(statusBarHeight - 15);

    // 初始化全局状态
    useUserInfo();
    // 从缓存读取课表
    const lessons = await uni.getStorageSync("schedule");
    if (lessons) useSchedule().lessons = lessons;

    // 初始化
    const initiator = new Initiator();
    initiator.validateSignInStatus();
    initiator.addInterceptPages()
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