import { defineStore } from "pinia";
import { STORAGE_KEYS } from "@/constants/storage-key";
import { ref } from 'vue';

const STORAGE_KEY = STORAGE_KEYS.SCHEDULE;

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
    lessons: [] as Lesson[],
    syncStatus: !!uni.getStorageSync(STORAGE_KEY),
  }),
  getters: {
    hasSynced(): boolean {
      return this.syncStatus;
    }
  },
  actions: {
    getLessonsFromStorage() {
      const lessons = uni.getStorageSync(STORAGE_KEY);
      if (lessons) {
        this.lessons = lessons;
        this.syncStatus = true;
      }
    },
    setLessonsToStorage(lessons: Lesson[]) {
      this.lessons = lessons;
      this.syncStatus = true;
      uni.setStorageSync(STORAGE_KEY, lessons);
    },
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
    },
    setLessons(newLessons: Lesson[]) {
      this.lessons = newLessons;
    },
    clearLessons() {
      this.lessons = [];
      this.syncStatus = false;
      uni.removeStorageSync(STORAGE_KEY);
    },
  }
});