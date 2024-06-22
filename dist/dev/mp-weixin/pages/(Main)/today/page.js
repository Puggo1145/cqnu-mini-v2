"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  (dynamicHeader + tabs + smartClass + cusPage)();
}
const cusPage = () => "../../../components/cus-page.js";
const dynamicHeader = () => "./_components/dynamic-header.js";
const tabs = () => "./_components/tabs.js";
const smartClass = () => "./_components/smart-class.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "page",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["padding-x"]: "16"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Main)/today/page.vue"]]);
wx.createPage(MiniProgramPage);
