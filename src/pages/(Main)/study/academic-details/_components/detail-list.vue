<script setup lang="ts">
import { computed, ref } from 'vue';

interface CourseDetails {
    name: string;
    nature: string;
    type: string;
    status: string;
    credit: string;
    score?: string;
    GPA?: string;
}

const props = defineProps<{
    courseDetails: CourseDetails[]
}>();

// 添加筛选开关状态
const showOnlyUnfinished = ref(false);

// 根据筛选条件过滤课程
const filteredCourses = computed(() => {
    if (!showOnlyUnfinished.value) return props.courseDetails;
    return props.courseDetails.filter(course => course.status !== "已修");
});

const totalCredit = computed(() => {
    return filteredCourses.value.reduce((acc, cur) => {
        return acc + Number(cur.credit);
    }, 0);
});

const passedCredit = computed(() => {
    return filteredCourses.value.reduce((acc, cur) => {
        return cur.status === "已修" ? acc + Number(cur.credit) : acc;
    }, 0);
});
</script>

<template>
    <view class="w-full flex flex-col py-4">
        <!-- 学分统计和筛选器 -->
        <view class="flex items-center justify-between mb-4 px-2">
            <!-- 学分统计 -->
            <view class="flex items-center gap-x-4">
                <view class="flex items-center">
                    <view class="size-2 rounded-full bg-primary mr-2" />
                    <text class="text-sm">
                        已修 {{ passedCredit }}
                    </text>
                </view>
                <view class="flex items-center">
                    <view class="size-2 rounded-full bg-secondary-foreground mr-2" />
                    <text class="text-sm text-secondary-foreground">
                        总学分 {{ totalCredit }}
                    </text>
                </view>
            </view>

            <!-- 筛选开关 -->
            <view class="flex items-center gap-x-2">
                <text class="text-sm text-secondary-foreground">
                    仅看未修
                </text>
                <up-switch
                    v-model="showOnlyUnfinished"
                    size="22"
                    activeColor="#5670FD"
                />
            </view>
        </view>

        <!-- 课程列表 -->
        <view class="flex flex-col gap-y-3 px-2">
            <view
                v-for="course in filteredCourses"
                :key="course.name"
                class="w-full p-4 bg-secondary rounded-xl flex justify-between items-center"
            >
                <!-- 左侧信息 -->
                <view class="flex-1 flex flex-col gap-y-2">
                    <text class="text-base font-bold line-clamp-1">
                        {{ course.name }}
                    </text>
                    <view class="flex flex-wrap gap-2">
                        <view 
                            v-for="tag in [course.nature, course.type]" 
                            :key="tag"
                            class="px-2 py-0.5 bg-white/50 rounded-full"
                        >
                            <text class="text-xs text-secondary-foreground">
                                {{ tag }}
                            </text>
                        </view>
                        <view class="px-2 py-0.5 bg-primary/10 rounded-full">
                            <text class="text-xs text-primary">
                                {{ course.credit }} 学分
                            </text>
                        </view>
                    </view>
                </view>

                <!-- 右侧状态 -->
                <view class="flex flex-col items-end gap-y-1 ml-4">
                    <text 
                        v-if="course.score && course.GPA"
                        class="text-lg font-bold"
                    >
                        {{ course.score }}
                        <text class="text-sm text-secondary-foreground ml-1">
                            / {{ course.GPA }}
                        </text>
                    </text>
                    <view 
                        class="px-2 py-0.5 rounded-full"
                        :class="course.status === '已修' ? 'bg-primary/10' : 'bg-secondary/80'"
                    >
                        <text 
                            class="text-xs"
                            :class="course.status === '已修' ? 'text-primary' : 'text-secondary-foreground'"
                        >
                            {{ course.status }}
                        </text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
