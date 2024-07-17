"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "signup-texts",
  props: {
    title: {},
    desc: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(_ctx.title),
        b: common_vendor.t(_ctx.desc)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/erjietangfeiniao/Desktop/cqnu-mini-v2/src/pages/(Onboarding)/sign-up/_components/signup-texts.vue"]]);
wx.createComponent(Component);
