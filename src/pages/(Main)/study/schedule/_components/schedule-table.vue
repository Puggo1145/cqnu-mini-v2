<script lang="ts" setup>
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

const { lessons } = defineProps<{lessons: Lesson[] | null}>();

const weekList = [
	"一",
	"二",
	"三",
	"四",
	"五",
	"六",
	"日",
];
const courseTimeList = [
	["8:30", "9:15"],
	["9:25", "10:10"],
	["10:30", "11:15"],
	["11:25", "12:10"],
	["14:30", "15:15"],
	["15:25", "16:10"],
	["16:30", "17:15"],
	["17:25", "18:10"],
	["19:30", "20:15"],
	["20:25", "21:10"],
]
</script>

<template>
	<view class="w-full h-full flex flex-col gap-3">
		<!-- 周列 -->
		<view class="grid grid-cols-8 grid-rows-1">
			<text class="col-span-1 p-2 flex justify-center items-center font-bold text-sm">
				{{ new Date().getMonth() + 1 }}月
			</text>
			<view
				v-for="(day, index) in weekList"
				:class="`col-start-${index + 2} p-2 flex justify-center items-center font-bold`"
			>
				<text class="text-sm text-modern">
					{{ day }}
				</text>
			</view>
		</view>

		<scroll-view
			scroll-y
			class="flex-1 overflow-hidden"
		>
			<view class="grid grid-cols-8 grid-rows-10">
				<!-- 课程时间列 -->
				<view 
					v-for="(time, index) in courseTimeList" 
					:key="index"
					:class="`col-span-1 row-start-${index + 1}`"
				>
					<view class="p-3 flex flex-col justify-center items-center font-bold text-modern text-xs">
						<text class="text-sm">{{ index + 1 }}</text>
						<text>{{ time[0] }}</text>
						<text>{{ time[1] }}</text>
					</view>
				</view>
				<!-- 课程 -->
				<view class="col-span-5 row-span-10 grid grid-cols-5 grid-rows-10 gap-1">
					<view 
						v-for="_ in 7" 
						class="col-span-1 row-span-10 grid grid-rows-10 grid-cols-1 gap-1"
					>
						<view
							v-for="lesson in lessons"
							:class="[
								`row-start-${lesson.start_time}, 'row-span-${(lesson.end_time - lesson.start_time + 1)}`, 
								'text-xs text-modern bg-secondary p-1 rounded-md text-center',
								'overflow-hidden flex flex-col gap-y-1',
							]"
						>
							<text class="font-bold text-primary">
								{{ lesson.name }}
							</text>
							<text class="font-bold">
								{{ lesson.place }}
							</text>
							<text>
								{{ lesson.teacher }}
							</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>