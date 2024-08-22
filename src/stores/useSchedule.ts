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

interface GetLessonsParams {
  week: number;
  day?: number;
}

const list: Lesson[] = [
    {
      lesson_id: 1,
      name: "高等数学",
      place: "特教楼",
      teacher: "吕美英",
      start_time: 8,
      end_time: 10,
      day: 1,
      include_week: [1, 2, 3, 4, 5, 6],
      color: "#ffa500",
    },{
      lesson_id: 2,
      name: "前端Web框架",
      place: "特教楼",
      teacher: "汪平",
      start_time: 8,
      end_time: 10,
      day: 2,
      include_week: [1, 2, 3, 4, 5, 6],
      color: "#ffa500",
    }
]

export const useSchedule = defineStore("useSchedule", {
  state: () => ({
    lessons: list as Lesson[],
  }),
  actions: {
    getLessons({ week, day }: GetLessonsParams) {
      return this.lessons?.filter(lesson =>
        lesson.include_week.includes(week)
        && (day === undefined || lesson.day === day)
      )
    },
    getCurrentWeek(startDate: Date, totalWeeks: number) {
      const now = new Date();

      const diffTime = Math.abs(now.getTime() - startDate.getTime());
      const weeksPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7)) + 1;

      return Math.min(weeksPassed, totalWeeks);  // 确保不超过总周数
    },
    getNamesOfLessons() {
      return this.lessons?.map(lesson => lesson.name);
    }
  }
});