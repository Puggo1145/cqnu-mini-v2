import { defineStore } from "pinia";

import { useSchedule } from "../useSchedule";


type EasyNoteFilters = {
    courseNameOptions: string[];
    timeRangeOptions: string[];
    tagsOptions: string[];
    timeRange: number;
    courseName: number;
    tag: number;
}

export const useEasyNoteFilters = defineStore('easyNoteFilters', {
    // 出于兼容微信 select 的用法，select 的值是 options 的 index
    state: () => ({
        courseNameOptions: [
            "全部课程",
            ...useSchedule().getNamesOfLessons()
        ],
        timeRangeOptions: [
            "今日内",
            "本周内",
            "两周内",
            "本月内",
            "季度内",
            "半年内",
            "今年内",
        ],
        tagsOptions: [
            "全部标签",
            "重要",
            "作业",
            "考试"
        ],
        timeRange: 1, // 默认从本周开始
        courseName: 0,
        tag: 0,
    }) as EasyNoteFilters,
    actions: {
        getFilterValues() {
            const formattedCourseName = this.courseNameOptions[this.courseName] === "全部课程"
                ? ""
                : this.courseNameOptions[this.courseName];

            const formattedTag = this.tagsOptions[this.tag] === "全部标签"
                ? ""
                : this.tagsOptions[this.tag];


            return {
                timeRange: this.timeRangeOptions[this.timeRange],
                courseName: formattedCourseName,
                tag: formattedTag,
            }
        }
    }
});