"use strict";
const common_vendor = require("../../../../common/vendor.js");
const constants_icons = require("../../../../constants/icons.js");
require("../../../../common/assets.js");
if (!Array) {
  const _easycom_up_tabs2 = common_vendor.resolveComponent("up-tabs");
  const _easycom_up_sticky2 = common_vendor.resolveComponent("up-sticky");
  (_easycom_up_tabs2 + _easycom_up_sticky2)();
}
const _easycom_up_tabs = () => "../../../../node-modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_up_sticky = () => "../../../../node-modules/uview-plus/components/u-sticky/u-sticky.js";
if (!Math) {
  (_easycom_up_tabs + _easycom_up_sticky)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tabs",
  setup(__props) {
    const tabs = common_vendor.reactive([
      { name: "课程" },
      { name: "打卡" }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          list: tabs,
          scrollable: false,
          ["line-width"]: "28",
          ["line-color"]: "#000",
          ["active-style"]: {
            color: "#000",
            fontSize: "16px",
            fontWeight: "bold",
            lineHeight: "20px",
            marginBottom: "2px"
          },
          ["inactive-style"]: {
            color: "#6D7985",
            fontWeight: "normal",
            lineHeight: "20px"
          },
          ["item-style"]: "height: 30px"
        }),
        b: common_vendor.unref(constants_icons.icons).plus
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/erjietangfeiniao/Desktop/cqnu-mini-v2/src/pages/(Main)/today/_components/tabs.vue"]]);
wx.createComponent(Component);
