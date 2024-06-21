"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (spinner + cusButton + cusPage)();
}
const cusPage = () => "../../components/cus-page.js";
const spinner = () => "../../components/spinner.js";
const cusButton = () => "../../components/cus-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "page",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          size: "small",
          color: "white"
        }),
        b: common_vendor.p({
          ["class-name"]: "flex items-center gap-2"
        }),
        c: common_vendor.p({
          ["header-type"]: "nav",
          ["padding-x"]: "16"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/dev/page.vue"]]);
wx.createPage(MiniProgramPage);
