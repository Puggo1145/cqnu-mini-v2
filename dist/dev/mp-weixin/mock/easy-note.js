"use strict";
const mockNotes = [
  {
    id: 0,
    title: "下节课上课前要提交的作业",
    content: " 1. 完成教材 35 页习题 2.在 DingZhen 在线判题平台提交仿真模拟",
    imagesUrl: [],
    deadline: "2024/9/10 - 10：30",
    courseName: "计算机网络",
    tags: [
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
    openid: "Puggo",
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
    tags: [
      {
        id: 0,
        tagName: "重要",
        noteId: 1,
        isDelete: 0,
        createdTime: "2024/9/9 - 10：30",
        updatedTime: "2024/9/9 - 10：30"
      }
    ],
    openid: "Puggo",
    seeNumber: 24,
    supportNumber: 14
  }
];
const mockNoteStatistics = {
  thisWeek: 12,
  important: 6,
  total: 24
};
const mockRelatedCourses = [
  "计算机网络",
  "计算机组成原理",
  "操作系统",
  "数据结构",
  "算法设计与分析"
];
exports.mockNoteStatistics = mockNoteStatistics;
exports.mockNotes = mockNotes;
exports.mockRelatedCourses = mockRelatedCourses;
