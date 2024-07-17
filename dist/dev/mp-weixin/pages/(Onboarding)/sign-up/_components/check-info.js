"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Math) {
  (signupTexts + cusButton)();
}
const signupTexts = () => "./signup-texts.js";
const cusButton = () => "../../../../components/cus-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "check-info",
  setup(__props) {
    function goToSignUpProcess() {
      common_vendor.index.redirectTo({
        url: "/pages/(Onboarding)/process-sign-up/page"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "请核对信息",
          desc: "请核对您填写的信息，您当前依然可以返回修改。提交后，您将无法再修改这些信息"
        }),
        b: common_vendor.o(goToSignUpProcess),
        c: common_vendor.p({
          variant: "primary"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/erjietangfeiniao/Desktop/cqnu-mini-v2/src/pages/(Onboarding)/sign-up/_components/check-info.vue"]]);
wx.createComponent(Component);
