"use strict";
const mockNotes = [
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
  }
];
const mockNoteStatistics = {
  thisWeek: 12,
  important: 6,
  total: 24
};
exports.mockNoteStatistics = mockNoteStatistics;
exports.mockNotes = mockNotes;
