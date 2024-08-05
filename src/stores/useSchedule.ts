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
    }
  }
});