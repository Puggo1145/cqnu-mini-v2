import { defineStore } from "pinia";

import { useSchedule } from "../useSchedule";


type EasyNoteFilters = {
    courseNameOptions: string[];
    timespanOptions: string[];
    tagsOptions: string[];
    timespan: number;
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
        timespanOptions: [
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
        timespan: 1, // 默认从本周开始
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
                timespan: this.timespanOptions[this.timespan],
                courseName: formattedCourseName,
                tag: formattedTag,
            }
        }
    }
});