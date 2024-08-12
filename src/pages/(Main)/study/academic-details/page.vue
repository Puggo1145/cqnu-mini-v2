<script setup lang="ts">
import { ref, onMounted } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import detailist from './_components/detail-list.vue';
// linkOfficial
import { getAcademicDetails } from '@/utils/link-official';


const obligatoryCourses = ref();
const electiveCourses = ref();
const generalElectives = ref();
const others = ref();
onMounted(async () => {
    const obligatories = await getAcademicDetails("obligatories");
    obligatoryCourses.value = obligatories;

    const electives = await getAcademicDetails("electives");
    electiveCourses.value = electives;

    const generalElective = await getAcademicDetails("generalElectives");
    generalElectives.value = generalElective;

    const other = await getAcademicDetails("others");
    others.value = other;
});

</script>

<template>
    <cus-page header-type="nav" paddingx="16">
        <scroll-view
            scroll-y
            class="overflow-hidden px-4 flex-1"
        >
            <!-- 必修 -->
            <detailist
                v-if="obligatoryCourses"
                title="必修课程"
                :courseDetails="obligatoryCourses"
            />
            <!-- 选修 -->
            <detailist
                v-if="electiveCourses"
                title="选修课程"
                :courseDetails="electiveCourses"
            />
            <!-- 通识选修 -->
            <detailist
                v-if="generalElectives"
                title="通识选修"
                :courseDetails="generalElectives"
            />
            <!-- 其他 -->
            <detailist
                v-if="others"
                title="其他"
                :courseDetails="others"
            />
        </scroll-view>
    </cus-page>
</template>
