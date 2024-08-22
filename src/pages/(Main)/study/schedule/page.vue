<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import scheduleTable from './_components/schedule-table.vue'
import scheduleHeader from './_components/schedule-header.vue';
import noSchedule from './_components/no-schedule.vue';
// store
import { useSchedule } from '@/stores/useSchedule';
// constants
import { baseConfigs } from '@/constants/baseConfig';


const schedule = useSchedule();
console.log(schedule.$state);


const startDate = new Date(baseConfigs.termStartDate);  // 开学日期
const totalWeeks = baseConfigs.totalWeeks;  // 总周数
const isTermStarted = ref(true);  // 是否开学
const currentWeek = ref(1);  // 当前周次

const lessonsOfAllWeeks = computed(() => {
	if (schedule.lessons.length === 0) {
		return null;
	}

	return Array.from(
		{ length: totalWeeks }, 
		(_, index) => schedule.getLessons({ week: index + 1 })
	);
});


const currentSwiperIndex = ref(0);  // 当前 swiper 索引
const visibleRange = ref({ start: 0, end: 2 });

function handleSwiperChange(e: any) {
	currentSwiperIndex.value = e.detail.current;
	updateVisibleRange();
};
function updateVisibleRange() {
	visibleRange.value = {
		start: Math.max(0, currentSwiperIndex.value - 1),
		end: Math.min(totalWeeks - 1, currentSwiperIndex.value + 1)
	};
};
watch(currentSwiperIndex, updateVisibleRange);


// 初始化当前周和 swiper 索引
onMounted(() => {
	// 没有开学将日期设为第一周
	if (startDate > new Date()) {
		currentWeek.value = 1;
		isTermStarted.value = false;
	} else {
		currentWeek.value = schedule.getCurrentWeek(startDate, totalWeeks)
	}

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