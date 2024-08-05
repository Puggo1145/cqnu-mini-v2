<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import scheduleTable from './_components/schedule-table.vue'
import scheduleHeader from './_components/schedule-header.vue';
import noSchedule from './_components/no-schedule.vue';
// store
import { useSchedule } from '@/stores/useSchedule';


const schedule = useSchedule();


const startDate = new Date('2024-09-01');  // 开学日期
const isTermStarted = ref(true);  // 是否开学

const totalWeeks = ref(20);  // 总周数
const currentWeek = ref(1);  // 当前周次
function calculateCurrentWeek(): number {
	const now = new Date();
	if (now < startDate) {
		isTermStarted.value = false;
		return 1;  // 如果还未开学，返回第一周
	}

	const diffTime = Math.abs(now.getTime() - startDate.getTime());
	const weeksPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7)) + 1;

	return Math.min(weeksPassed, totalWeeks.value);  // 确保不超过总周数
};


const currentSwiperIndex = ref(0);  // 当前 swiper 索引
const visibleRange = ref({ start: 0, end: 2 });

function handleSwiperChange(e: any) {
	currentWeek.value = e.detail.current + 1;
	currentSwiperIndex.value = e.detail.current;
	updateVisibleRange();
};

function updateVisibleRange() {
	visibleRange.value = {
		start: Math.max(0, currentSwiperIndex.value - 1),
		end: Math.min(totalWeeks.value - 1, currentSwiperIndex.value + 1)
	};
};

watch(currentSwiperIndex, updateVisibleRange);


const lessonsOfAllWeeks = computed(() => {
	if (!schedule.lessons) return null;

	return Array.from(
		{ length: totalWeeks.value }, 
		(_, index) => schedule.getLessons({ week: index + 1 })
	);
});


// 初始化当前周和 swiper 索引
onMounted(() => {
	currentWeek.value = calculateCurrentWeek();
	currentSwiperIndex.value = currentWeek.value - 1;
})
</script>

<template>
	<cus-page header-type="nav">
		<view class="w-full h-[60px]">
			<schedule-header 
				:current-week="currentWeek" 
				:current-viewing-week="currentSwiperIndex + 1"
				:is-term-started="isTermStarted" 
			/>
		</view>

		<view 
			v-if="!lessonsOfAllWeeks"
			class="flex-1"
		>
			<no-schedule />
		</view>
		<swiper
			v-else
			class="flex-1 overflow-hidden" 
			:current="currentSwiperIndex" 
			@change="handleSwiperChange"
		>
			<swiper-item 
				v-for="(lessons, index) in lessonsOfAllWeeks" 
				:key="index" class="h-full overflow-hidden"
			>
				<schedule-table 
					v-if="index >= visibleRange.start && index <= visibleRange.end" 
					:lessons="lessons"
				/>
			</swiper-item>
		</swiper>
	</cus-page>
</template>