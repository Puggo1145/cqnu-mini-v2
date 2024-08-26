<script setup lang="ts">
import { ref, onMounted } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import detailList from './_components/detail-list.vue';
// linkOfficial
import { getAcademicDetails } from '@/utils/link-official';


const obligatoryCourses = ref();
const electiveCourses = ref();
const generalElectives = ref();
const others = ref();
onMounted(async () => {
    uni.showLoading({ title: "加载中" });

    const obligatories = await getAcademicDetails("obligatories");
    obligatoryCourses.value = obligatories;

    const electives = await getAcademicDetails("electives");
    electiveCourses.value = electives;

    const generalElective = await getAcademicDetails("generalElectives");
    generalElectives.value = generalElective;

    const other = await getAcademicDetails("others");
    others.value = other;

    uni.hideLoading();
});

</script>

<template>
    <cus-page header-type="nav" paddingx="16">
        <scroll-view
            scroll-y
            class="overflow-hidden px-4 flex-1"
        >
            <!-- 必修 -->
            <detail-list
                v-if="obligatoryCourses && obligatoryCourses.length > 0"
                title="必修课程"
                :courseDetails="obligatoryCourses"
            />
            <!-- 选修 -->
            <detail-list
                v-if="electiveCourses && electiveCourses.length > 0"
                title="选修课程"
                :courseDetails="electiveCourses"
            />
            <!-- 通识选修 -->
            <detail-list
                v-if="generalElectives && generalElectives.length > 0"
                title="通识选修"
                :courseDetails="generalElectives"
            />
            <!-- 其他 -->
            <detail-list
                v-if="others && others.length > 0"
                title="其他"
                :courseDetails="others"
            />
        </scroll-view>
        <!-- 占位 -->
        <view class="h-4" />
    </cus-page>
</template>
