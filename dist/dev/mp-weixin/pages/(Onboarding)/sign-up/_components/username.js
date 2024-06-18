"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Math) {
  (signupTexts + cusInput + cusButton)();
}
const cusInput = () => "../../../../components/cus-input.js";
const signupTexts = () => "./signup-texts.js";
const cusButton = () => "../../../../components/cus-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "username",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "让我们相互认识一下",
          desc: "告诉我你想叫什么名字？你不必使用你的真实姓名"
        }),
        b: common_vendor.p({
          ["field-name"]: "用户名"
        }),
        c: common_vendor.p({
          variant: "muted"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Onboarding)/sign-up/_components/username.vue"]]);
wx.createComponent(Component);
