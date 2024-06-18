"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Math) {
  signupTexts();
}
const signupTexts = () => "./signup-texts.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "campus-info",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "完善你的校园信息",
          desc: "输入你的学号、学院和专业，以便为你提供更好的服务"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Onboarding)/sign-up/_components/campus-info.vue"]]);
wx.createComponent(Component);
