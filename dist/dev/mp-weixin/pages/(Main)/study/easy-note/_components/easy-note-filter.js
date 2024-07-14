"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const stores_easyNote_easyNote = require("../../../../../stores/easy-note/easy-note.js");
const mock_easyNote = require("../../../../../mock/easy-note.js");
require("../../../../../api/easy-note.js");
require("../../../../../utils/request.js");
require("../../../../../utils/requestManager.js");
require("../../../../../constants/acceptableErrorCode.js");
if (!Math) {
  (cusSelect + loading + noNote + easyNoteCard)();
}
const easyNoteCard = () => "./easy-note-card.js";
const cusSelect = () => "../../../../../components/cus-select.js";
const loading = () => "../../../../../components/loading.js";
const noNote = () => "../../../today/_components/no-note.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "easy-note-filter",
  setup(__props) {
    const store = stores_easyNote_easyNote.useEasyNoteStore();
    const current = common_vendor.ref(1);
    const pageSize = common_vendor.ref(5);
    async function fetchNotes() {
      const transformedCourseName = allRelatedCoursesOptions[selectedRelatedCourse.value] === "全部课程" ? "" : allRelatedCoursesOptions[selectedRelatedCourse.value];
      const transformedTagName = tagsOptions[selectedTag.value] === "全部标签" ? "" : tagsOptions[selectedTag.value];
      await store.fetchNotes({
        current: current.value,
        pageSize: pageSize.value,
        timespan: timeRangeOptions[selectedTimeRange.value],
        courseName: transformedCourseName,
        tagName: transformedTagName
      });
    }
    const timeRangeOptions = [
      "今日内",
      "本周内",
      "两周内",
      "本月内",
      "季度内",
      "半年内",
      "今年内"
    ];
    const allRelatedCoursesOptions = mock_easyNote.mockRelatedCourses;
    const tagsOptions = [
      "全部标签",
      "重要",
      "作业",
      "考试"
    ];
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
    common_vendor.onMounted(async () => {
      await fetchNotes();
    });
    common_vendor.watch([selectedTimeRange, selectedRelatedCourse, selectedTag], async () => {
      await fetchNotes();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(onTimeRangeChange),
        b: common_vendor.p({
          value: selectedTimeRange.value,
          range: timeRangeOptions,
          variant: "mini"
        }),
        c: common_vendor.o(onRelatedCourseChange),
        d: common_vendor.p({
          value: selectedRelatedCourse.value,
          range: common_vendor.unref(allRelatedCoursesOptions),
          variant: "mini"
        }),
        e: common_vendor.o(onTagChange),
        f: common_vendor.p({
          value: selectedTag.value,
          range: tagsOptions,
          variant: "mini"
        }),
        g: common_vendor.unref(store).notes === void 0
      }, common_vendor.unref(store).notes === void 0 ? {} : common_vendor.unref(store).notes && common_vendor.unref(store).notes.length === 0 ? {} : {
        i: common_vendor.f(common_vendor.unref(store).notes, (note, k0, i0) => {
          return {
            a: note.id,
            b: note.id,
            c: "609b43a2-5-" + i0,
            d: common_vendor.p({
              id: note.id,
              title: note.title,
              content: note.content,
              ["images-url"]: note.imagesUrl,
              deadline: note.deadline,
              ["course-name"]: note.courseName,
              ["tag-list"]: note.tagList,
              openid: note.openid,
              username: note.username,
              seeNumber: note.seeNumber,
              supportNumber: note.supportNumber
            })
          };
        })
      }, {
        h: common_vendor.unref(store).notes && common_vendor.unref(store).notes.length === 0
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Main)/study/easy-note/_components/easy-note-filter.vue"]]);
wx.createComponent(Component);
