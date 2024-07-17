"use strict";
const common_vendor = require("../../../../common/vendor.js");
const constants_icons = require("../../../../constants/icons.js");
require("../../../../common/assets.js");
if (!Math) {
  (cusInput + easyNoteHeader + easyNoteStatistic + easyNoteFilter + cusPage)();
}
const cusPage = () => "../../../../components/cus-page.js";
const cusInput = () => "../../../../components/cus-input.js";
const easyNoteHeader = () => "./_components/easy-note-header.js";
const easyNoteStatistic = () => "./_components/easy-note-statistic.js";
const easyNoteFilter = () => "./_components/easy-note-filter.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "page",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          icon: common_vendor.unref(constants_icons.icons).search,
          placeholder: "查找小记"
        }),
        b: common_vendor.p({
          ["header-type"]: "nav",
          ["padding-x"]: "16"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/erjietangfeiniao/Desktop/cqnu-mini-v2/src/pages/(Main)/study/easy-note/page.vue"]]);
wx.createPage(MiniProgramPage);
