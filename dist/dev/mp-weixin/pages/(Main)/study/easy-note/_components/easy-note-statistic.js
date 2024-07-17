"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const constants_icons = require("../../../../../constants/icons.js");
const mock_easyNote = require("../../../../../mock/easy-note.js");
require("../../../../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "easy-note-statistic",
  setup(__props) {
    const noteStatistics = common_vendor.ref([
      {
        icon: constants_icons.icons.calendarWhite,
        iconBackgroundColor: "#90ad5f",
        title: "周内小记",
        count: mock_easyNote.mockNoteStatistics.thisWeek,
        backgroundColor: "#e1ecc8"
      },
      {
        icon: constants_icons.icons.attentionWhite,
        iconBackgroundColor: "#a6765a",
        title: "重要小记",
        count: mock_easyNote.mockNoteStatistics.important,
        backgroundColor: "#f4ded1"
      },
      {
        icon: constants_icons.icons.boxWhite,
        iconBackgroundColor: "#638fac",
        title: "所有小记",
        count: mock_easyNote.mockNoteStatistics.total,
        backgroundColor: "#d4ebfa"
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(noteStatistics.value, (item, index, i0) => {
          return {
            a: item.icon,
            b: item.iconBackgroundColor,
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.count),
            e: index,
            f: item.backgroundColor
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/erjietangfeiniao/Desktop/cqnu-mini-v2/src/pages/(Main)/study/easy-note/_components/easy-note-statistic.vue"]]);
wx.createComponent(Component);
