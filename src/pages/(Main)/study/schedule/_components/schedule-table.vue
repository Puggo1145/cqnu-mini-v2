<script lang="ts" setup>
import { ref, computed } from 'vue';
import { startOfWeek, addDays, format } from 'date-fns';

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
const props = defineProps<{
	lessons: Lesson[] | undefined,
	currentDate?: Date
}>();


const weekList = [
	"一",
	"二",
	"三",
	"四",
	"五",
	"六",
	"日",
];

// 计算当前是周几
const currentDay = computed(() => {
	const today = new Date();
	// 获取今天是周几 (0-6, 0 代表周日)
	const day = today.getDay();
	// 转换为我们的格式 (1-7)
	return day === 0 ? 7 : day;
});


// Calculate dates for the week
const weekDates = computed(() => {
	const date = props.currentDate || new Date();
	const monday = startOfWeek(date, { weekStartsOn: 1 }); // Start from Monday
	
	return weekList.map((_, index) => {
		const currentDate = addDays(monday, index);
		return format(currentDate, 'd'); // Get day of month as number
	});
});

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


const isDetailShow = ref(false);
function onOpen() {
	isDetailShow.value = true;
}
// function onClose() {
// 	isDetailShow.value = false;
// }

const selectedLesson = ref<Lesson>();
function selectLesosn(lesson: Lesson) {
	selectedLesson.value = lesson;
	onOpen();
}
</script>

<template>
	<view class="w-full h-full flex flex-col gap-3">
		<!-- 周列 -->
		<view class="grid grid-cols-8 grid-rows-1 gap-1">
			<text class="col-span-1 p-2 flex justify-center items-center font-bold text-xs">
				{{ new Date().getMonth() + 1 }}月
			</text>
			<view
				v-for="(day, index) in weekList"
				:key="index"
				:class="[
					`col-start-${index + 2} p-2 flex justify-center items-center font-bold`,
					// 当前日期列添加特殊样式
					index + 1 === currentDay && 'bg-primary/10 rounded-lg'
				]"
			>
				<view class="flex flex-col items-center gap-y-1">
					<text 
						class="text-sm"
						:class="index + 1 === currentDay ? 'text-primary' : 'text-modern'"
					>
						{{ day }}
					</text>
					<text 
						class="text-xs"
						:class="index + 1 === currentDay ? 'text-primary' : 'text-secondary-foreground'"
					>
						{{ weekDates[index] }}
					</text>
				</view>
			</view>
		</view>

		<scroll-view
			scroll-y
			class="flex-1 overflow-hidden"
		>
			<view class="grid grid-cols-8 grid-rows-10 gap-1">
				<!-- 课程时间列 -->
				<view 
					v-for="(time, index) in courseTimeList" 
					:key="index"
					:class="`col-span-1 row-start-${index + 1} row-end-${index + 2}`"
				>
					<view class="p-3 flex flex-col justify-center items-center font-bold text-modern text-xs">
						<text class="text-sm">{{ index + 1 }}</text>
						<text>{{ time[0] }}</text>
						<text>{{ time[1] }}</text>
					</view>
				</view>
				<!-- 课程 -->
				<!-- <view class="row-start-1 row-end-3 col-start-2 bg-black">

				</view> -->
				<view
					v-for="lesson in props.lessons"
					:key="lesson.lesson_id"
					:style="{
						// 微信小程序无法正确通过 tailwind 设置 grid row 和 column，所以使用 css
						gridRowStart: lesson.start_time,
						gridRowEnd: lesson.end_time + 1,
						gridColumnStart: lesson.day + 1,
					}"
					:class="[
						'text-xs text-modern py-2 p-1 rounded-md bg-secondary text-center',
						'flex flex-col gap-y-1',
						// 当前日期的课程添加特殊样式
						lesson.day === currentDay && '!bg-primary/10'
					]"
					@click="() => selectLesosn(lesson)"
				>
					<text class="font-bold text-primary">
						{{ lesson.name }}
					</text>
					<text class="font-bold">
						{{ lesson.place.split("-")[0] }}
					</text>
					<text class="font-bold">
						{{ lesson.place.split("-")[1] }}
					</text>
					<text class="mt-1">
						{{ lesson.teacher }}
					</text>
				</view>
			</view>
		</scroll-view>
	</view>
	<!-- 课程详情弹出层 -->
	<!-- <up-popup
		:show="isDetailShow"
		mode="bottom"
		:round="16"
		@open="onOpen"
		@close="onClose"
	>
		<schedule-detail :lesson="selectedLesson" />
	</up-popup> -->
</template>