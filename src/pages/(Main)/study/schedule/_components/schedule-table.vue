<template>
	<view class="w-full h-full flex flex-col gap-3">
		<view class="flex justify-between items-center">
			<view class="flex flex-col gap-1">
				<text class="text-3xl text-primary font-bold text-modern">课程表</text>
				<text class="tetx-md text-modern-secondary">第{{currentWeek}}周</text>
			</view>
		</view>
		<view class="grid grid-cols-6 grid-rows-11 gap-1 overflow-auto">
			<view class="row-span-1 col-span-6 grid grid-cols-6">
				<view class="col-span-1 row-span-1"></view>
				<view v-for="day in 5" class="col-span-1 row-span-1">
					<view class="p-4 flex justify-center items-center font-bold text-modern ">
						<text>{{day}}</text>
					</view>
				</view>
			</view>
			<view class="row-span-10 col-span-6 grid grid-cols-6 grid-rows-10 gap-1">
				<view class="col-span-1 row-span-10 grid grid-rows-10 gap-1">
					<view v-for="time in 10" class="col-span-1 row-span-1">
						<view class="p-4 flex justify-center items-center font-bold text-modern ">
							{{time}}
						</view>
					</view>
				</view>
				<view class="col-span-5 row-span-10 grid grid-cols-5 grid-rows-10 gap-1">
					<view v-for="day in 5" class="col-span-1 row-span-10 grid grid-rows-10 grid-cols-1 gap-1">
						<view v-for="lesson in getLessons(day,currentWeek)"
							:class="['row-start-'+ lesson.start_time,'row-span-'+(lesson.end_time - lesson.start_time + 1),'text-xs text-modern bg-secondary p-1.5 rounded-md text-center']">
							<text class="font-bold text-primary">{{lesson.name}}</text>
							<text class="font-bold">{{lesson.place}}</text>
							<text>{{lesson.teacher}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script lang="ts" setup>
	import { ref } from "vue";
	
	interface Lesson {
		lesson_id : number;
		name : string;
		place : string;
		teacher : string;
		start_time : number;
		end_time : number;
		day : number;
		include_week : number[];
		color : string;
	}
	
	const startDate = new Date('2024-06-01');  // 开学日期（示例）
	const currentWeek = ref(1);  // 当前周次
	const lessons : Lesson[] = [
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
	
	const calculateCurrentWeek = () : number => {
		const now = new Date();
		const diffTime = Math.abs(now.getTime() - startDate.getTime());
		return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7)) + 1;
	};
	
	
	const getLessons = (day : number, week : number) : Lesson[] => {
		return lessons.filter(
			(lesson) => lesson.day === day && lesson.include_week.includes(week)
		).sort((a,b)=>a.start_time-b.start_time);
	};
	
	currentWeek.value = calculateCurrentWeek()
</script>

<style>
</style>