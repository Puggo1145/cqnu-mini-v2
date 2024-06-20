"use strict";
const common_vendor = require("../../../../common/vendor.js");
const constants_flowTexts = require("../../../../constants/flowTexts.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "flow-texts",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(constants_flowTexts.flowTexts), (text, index, i0) => {
          return {
            a: common_vendor.t(text),
            b: common_vendor.n(index !== 0 && index / 4 === 0 ? "block" : "inline-block"),
            c: index
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Onboarding)/index/_components/flow-texts.vue"]]);
wx.createComponent(Component);
