import type { EasyNoteCard } from "@/pages/(Main)/study/easy-note/_components/easy-note-card.vue"

export const mockNotes: EasyNoteCard[] = [
    {
        id: 0,
        title: "下节课上课前要提交的作业",
        content: " 1. 完成教材 35 页习题 2.在 DingZhen 在线判题平台提交仿真模拟",
        imagesUrl: [],
        deadline: "2024/9/10 - 10：30",
        courseName: "计算机网络",
        tagList: [
            {
                id: 0,
                tagName: "重要",
                noteId: 0,
                isDelete: 0,
                createdTime: "2024/9/9 - 10：30",
                updatedTime: "2024/9/9 - 10：30"
            },
            {
                id: 1,
                tagName: "考试",
                noteId: 0,
                isDelete: 0,
                createdTime: "2024/9/9 - 10：30",
                updatedTime: "2024/9/9 - 10：30"
            }
        ],
        openid: "",
        username: "Puggo",
        seeNumber: 24,
        supportNumber: 14
    },
    {
        id: 1,
        title: "下节课要带的资料",
        content: " 1. 计算机网络自顶向下方法",
        imagesUrl: [],
        deadline: "2024/9/14 - 10：30",
        courseName: "计算机网络",
        tagList: [
            {
                id: 2,
                tagName: "作业",
                noteId: 0,
                isDelete: 0,
                createdTime: "2024/9/9 - 10：30",
                updatedTime: "2024/9/9 - 10：30"
            }
        ],
        openid: "",
        username: "Puggo",
        seeNumber: 24,
        supportNumber: 14
    },
];

export const mockNoteStatistics = {
    thisWeek: 12,
    important: 6,
    total: 24
};

export const mockRelatedCourses = [
    "全部课程",
    "计算机网络",
    "计算机组成原理",
    "操作系统",
    "数据结构",
    "算法设计与分析",
];