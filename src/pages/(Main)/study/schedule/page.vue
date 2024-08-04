<script setup lang="ts">
import { ref, computed } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import scheduleTable from './_components/schedule-table.vue'
import scheduleHeader from './_components/schedule-header.vue';


interface Lesson {
	lesson_id: number;
	name: string;
	place: string;
	teacher: string;
	start_time: number;
	end_time: number;
	day: number;
	include_week: number[];
	color: string;
}
const lessons: Lesson[] = [
	{
		lesson_id: 1,
		name: "Vue前端框架",
		place: "12301",
		teacher: "汪平",
		start_time: 7,
		end_time: 8,
		day: 1,
		include_week: [1, 3, 5, 7, 8],
		color: "#ffa500",
	},
	{
		lesson_id: 2,
		name: "软件工程",
		place: "15301",
		teacher: "孙晓玲",
		start_time: 1,
		end_time: 2,
		day: 4,
		include_week: [1, 3, 5, 7, 9, 15],
		color: "#c31c27",
	},
	{
		lesson_id: 3,
		name: "安卓开发",
		place: "T2208",
		teacher: "曾智",
		start_time: 3,
		end_time: 4,
		day: 3,
		include_week: [1, 3, 5, 7, 8],
		color: "#000000",
	},
	{
		lesson_id: 4,
		name: "网络安全与技术",
		place: "13302",
		teacher: "文向波",
		start_time: 1,
		end_time: 2,
		day: 2,
		include_week: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		color: "#a2b231",
	},
	{
		lesson_id: 5,
		name: "编译原理",
		place: "15201",
		teacher: "訾玲玲",
		start_time: 3,
		end_time: 4,
		day: 2,
		include_week: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		color: "#a2b231",
	},
	{
		lesson_id: 6,
		name: "网络通信与组网",
		place: "105实验室",
		teacher: "肖颗",
		start_time: 5,
		end_time: 6,
		day: 2,
		include_week: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		color: "#a2b231",
	},
	{
		lesson_id: 7,
		name: "形式与政策",
		place: "T2208",
		teacher: "董军",
		start_time: 7,
		end_time: 8,
		day: 2,
		include_week: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		color: "#a2b231",
	},
];

const startDate = new Date('2024-09-01');  // 开学日期
const totalWeeks = ref(20);  // 总周数
const currentWeek = ref(1);  // 当前周次
const currentSwiperIndex = ref(0);  // 当前 swiper 索引

const calculateCurrentWeek = (): number => {
	const now = new Date();
	if (now < startDate) {
		return 1;  // 如果还未开学，返回第一周
	}

	const diffTime = Math.abs(now.getTime() - startDate.getTime());
	const weeksPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7)) + 1;
	return Math.min(weeksPassed, totalWeeks.value);  // 确保不超过总周数
};


const getLessons = (week: number): Lesson[] => {
	const lessonsOfCurrentWeek = lessons
		.filter(lesson => lesson.include_week.includes(week))
		.sort((a, b) => a.start_time - b.start_time);

	console.log(lessonsOfCurrentWeek);
	

	return lessonsOfCurrentWeek;
};


// 初始化当前周和 swiper 索引
currentWeek.value = calculateCurrentWeek();
currentSwiperIndex.value = currentWeek.value - 1;

const handleSwiperChange = (e: any) => {
	currentWeek.value = e.detail.current + 1;
};
</script>

<template>
	<cus-page header-type="nav">
		<view class="w-full h-[60px]">
			<schedule-header :current-week="currentWeek" />
		</view>
		<swiper 
			class="flex-1 overflow-hidden" 
			:current="currentSwiperIndex" 
			@change="handleSwiperChange"
		>
			<swiper-item 
				v-for="(_, index) in totalWeeks" 
				:key="index"
				class="h-full overflow-hidden"
			>
				<schedule-table :lessons="getLessons(index+1)" />
			</swiper-item>
		</swiper>
	</cus-page>
</template>