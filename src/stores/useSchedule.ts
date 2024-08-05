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

export const useSchedule = defineStore("useSchedule", {
  state: () => ({
    lessons: undefined as Lesson[] | undefined,
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
    }
  }
});