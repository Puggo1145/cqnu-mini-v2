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
    lessons: [] as Lesson[],
  }),
  actions: {
    addLessons(schedule: Lesson[]) {
      this.lessons.push(...schedule);
    },
  },
});