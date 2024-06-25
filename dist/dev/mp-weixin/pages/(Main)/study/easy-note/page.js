"use strict";
const common_vendor = require("../../../../common/vendor.js");
const constants_icons = require("../../../../constants/icons.js");
const mock_easyNote = require("../../../../mock/easy-note.js");
if (!Math) {
  (cusInput + cusButton + cusPage)();
}
const cusPage = () => "../../../../components/cus-page.js";
const cusInput = () => "../../../../components/cus-input.js";
const cusButton = () => "../../../../components/cus-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "page",
  setup(__props) {
    const noteStatistics = common_vendor.ref([
      {
        icon: constants_icons.icons.calendar,
        iconBackgroundColor: "#90ad5f",
        title: "周内小记",
        count: mock_easyNote.mockNoteStatistics.thisWeek,
        backgroundColor: "#e1ecc8"
      },
      {
        icon: constants_icons.icons.attention,
        iconBackgroundColor: "#a6765a",
        title: "重要小记",
        count: mock_easyNote.mockNoteStatistics.important,
        backgroundColor: "#f4ded1"
      },
      {
        icon: constants_icons.icons.box,
        iconBackgroundColor: "#638fac",
        title: "所有小记",
        count: mock_easyNote.mockNoteStatistics.total,
        backgroundColor: "#d4ebfa"
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          icon: common_vendor.unref(constants_icons.icons).search,
          placeholder: "查找小记"
        }),
        b: common_vendor.p({
          variant: "secondary",
          ["class-name"]: "w-_122px_ itext-primary"
        }),
        c: common_vendor.f(noteStatistics.value, (item, index, i0) => {
          return {
            a: item.icon,
            b: item.iconBackgroundColor,
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.count),
            e: index,
            f: item.backgroundColor
          };
        }),
        d: common_vendor.p({
          ["header-type"]: "nav",
          ["padding-x"]: "16"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Main)/study/easy-note/page.vue"]]);
wx.createPage(MiniProgramPage);
