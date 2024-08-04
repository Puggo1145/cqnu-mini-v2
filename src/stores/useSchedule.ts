import { defineStore } from "pinia";

export interface Lesson {
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

export const useSchedule = defineStore("useSchedule", {
  state: () => ({
    lessons: [
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
    ] as Lesson[],
  }),
  actions: {
    addLessons(schedule: Lesson[]) {
      this.lessons.push(...schedule);
    },
  },
});