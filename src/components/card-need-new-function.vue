<script setup>
// static
import images from '@/constants/images';


function gotoFeedback() {
  uni.navigateTo({
    url: '/pages/(Main)/me/feedback/page?type=0',
  });
}
</script>

<template>
  <view 
    class="overflow-hidden relative w-full h-[124px] bg-white rounded-2xl px-4 py-5 flex flex-col"
    @click="gotoFeedback"  
  >
    <text class="text-2xl font-bold text-modern">我要功能！</text>
    <text class="text-sm text-modern-secondary">向开发团队提出功能建议</text>
    <image :src="images.board" class="w-[196px] absolute right-0 -bottom-[60px]" />
  </view>
</template>
