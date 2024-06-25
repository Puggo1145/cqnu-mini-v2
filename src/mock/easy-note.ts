import type { EasyNoteCard } from "@/pages/(Main)/study/easy-note/_components/easy-note-card.vue"

export const mockNotes: EasyNoteCard[] = [
    {
        id: 0,
        title: "下节课上课前要提交的作业",
        content: " 1. 完成教材 35 页习题 2.在 DingZhen 在线判题平台提交仿真模拟",
        images: [],
        deadline: "2024/9/10 - 10：30",
        relatedCourse: "计算机网络",
        tags: [0, 1],
        from: "Puggo",
        seenNumber: 24,
        supportedNumber: 14
    },
    {
        id: 1,
        title: "下节课要带的资料",
        content: " 1. 计算机网络自顶向下方法",
        images: [],
        deadline: "2024/9/14 - 10：30",
        relatedCourse: "计算机网络",
        tags: [1],
        from: "Puggo",
        seenNumber: 24,
        supportedNumber: 14
    },
];

export const mockNoteStatistics = {
    thisWeek: 12,
    important: 6,
    total: 24
};

export const allRelatedCourses = [
    "计算机网络",
    "计算机组成原理",
    "操作系统",
    "数据结构",
    "算法设计与分析",
];