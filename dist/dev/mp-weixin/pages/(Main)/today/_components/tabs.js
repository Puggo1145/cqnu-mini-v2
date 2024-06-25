"use strict";
const common_vendor = require("../../../../common/vendor.js");
const constants_icons = require("../../../../constants/icons.js");
if (!Array) {
  const _component_up_tabs = common_vendor.resolveComponent("up-tabs");
  const _component_up_sticky = common_vendor.resolveComponent("up-sticky");
  (_component_up_tabs + _component_up_sticky)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tabs",
  setup(__props) {
    const tabs = common_vendor.ref([
      { name: "课程" },
      { name: "打卡" }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          list: tabs.value,
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
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Main)/today/_components/tabs.vue"]]);
wx.createComponent(Component);
