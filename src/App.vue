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

    // 显示维护提示
    uni.showModal({
        title: '小程序维护中',
        content: '智慧重师正在进行假期维护，预计将于 2 月 22 日恢复。本次维护将对小程序进行轻量化改造，取消用户认证，将所有个人信息保存在本地以保证用户隐私安全。小程序未来将专注于基于校园门户的信息和移动体验优化',
        showCancel: false
    });

    // TODO: 临时维护完成后取消注释
    // // 初始化全局状态
    // useUserInfo();
    // // 从缓存读取课表
    // const lessons = await uni.getStorageSync("schedule");
    // if (lessons) useSchedule().lessons = lessons;

    // // 初始化
    // const initiator = new Initiator();
    // initiator.validateSignInStatus();
    // initiator.addInterceptPages()
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