"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const mock_easyNote = require("../../../../../mock/easy-note.js");
if (!Math) {
  (cusSelect + easyNoteCard)();
}
const easyNoteCard = () => "./easy-note-card.js";
const cusSelect = () => "../../../../../components/cus-select.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "easy-note-filter",
  setup(__props) {
    const timeRangeOptions = [
      "今日内",
      "本周内",
      "两周内",
      "本月内",
      "季度内",
      "半年内",
      "今年内"
    ];
    const allRelatedCoursesOptions = common_vendor.ref(mock_easyNote.mockRelatedCourses);
    const tagsOptions = common_vendor.ref([
      "重要",
      "作业",
      "考试"
    ]);
    const selectedTimeRange = common_vendor.ref(0);
    const selectedRelatedCourse = common_vendor.ref(0);
    const selectedTag = common_vendor.ref(0);
    function onTimeRangeChange(e) {
      selectedTimeRange.value = e.value;
    }
    function onRelatedCourseChange(e) {
      selectedRelatedCourse.value = e.value;
    }
    function onTagChange(e) {
      selectedTag.value = e.value;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onTimeRangeChange),
        b: common_vendor.p({
          value: selectedTimeRange.value,
          range: timeRangeOptions,
          variant: "mini"
        }),
        c: common_vendor.o(onRelatedCourseChange),
        d: common_vendor.p({
          value: selectedRelatedCourse.value,
          range: allRelatedCoursesOptions.value,
          variant: "mini"
        }),
        e: common_vendor.o(onTagChange),
        f: common_vendor.p({
          value: selectedTag.value,
          range: tagsOptions.value,
          variant: "mini"
        }),
        g: common_vendor.f(common_vendor.unref(mock_easyNote.mockNotes), (note, k0, i0) => {
          return {
            a: note.id,
            b: note.id,
            c: "0b181fbc-3-" + i0,
            d: common_vendor.p({
              id: note.id,
              title: note.title,
              content: note.content,
              images: note.images,
              deadline: note.deadline,
              relatedCourse: note.relatedCourse,
              tags: note.tags,
              from: note.from,
              seenNumber: note.seenNumber,
              supportedNumber: note.supportedNumber
            })
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/erjietangfeiniao/Desktop/cqnu-mini-v2/src/pages/(Main)/study/easy-note/_components/easy-note-filter.vue"]]);
wx.createComponent(Component);
