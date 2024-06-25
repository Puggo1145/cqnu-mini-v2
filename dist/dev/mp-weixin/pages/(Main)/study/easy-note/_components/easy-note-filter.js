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
    const allRelatedCoursesOptions = common_vendor.ref(mock_easyNote.allRelatedCourses);
    const tagsOptions = common_vendor.ref([
      "重要",
      "作业",
      "考试"
    ]);
    const selectedTimeRange = common_vendor.ref(0);
    const selectedRelatedCourse = common_vendor.ref(0);
    const selectedTag = common_vendor.ref(0);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          value: selectedTimeRange.value,
          range: timeRangeOptions,
          variant: "mini"
        }),
        b: common_vendor.p({
          value: selectedRelatedCourse.value,
          range: allRelatedCoursesOptions.value,
          variant: "mini"
        }),
        c: common_vendor.p({
          value: selectedTag.value,
          range: tagsOptions.value,
          variant: "mini"
        }),
        d: common_vendor.f(common_vendor.unref(mock_easyNote.mockNotes), (note, k0, i0) => {
          return {
            a: note.id,
            b: "609b43a2-3-" + i0,
            c: common_vendor.p({
              ...note
            })
          };
        }),
        e: common_vendor.f(common_vendor.unref(mock_easyNote.mockNotes), (note, k0, i0) => {
          return {
            a: note.id,
            b: "609b43a2-4-" + i0,
            c: common_vendor.p({
              ...note
            })
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Main)/study/easy-note/_components/easy-note-filter.vue"]]);
wx.createComponent(Component);
