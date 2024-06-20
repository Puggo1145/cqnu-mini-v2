"use strict";
const common_vendor = require("../../../../common/vendor.js");
const constants_signup_signupTexts = require("../../../../constants/signup/signup-texts.js");
const stores_signupInfo = require("../../../../stores/signup-info.js");
if (!Math) {
  (signupTexts + cusInput + cusButton)();
}
const signupTexts = () => "./signup-texts.js";
const cusInput = () => "../../../../components/cus-input.js";
const cusButton = () => "../../../../components/cus-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "linkOfficial",
  emits: ["update:current"],
  setup(__props, { emit: __emit }) {
    const stores = stores_signupInfo.useSignupInfo();
    const emit = __emit;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: common_vendor.unref(constants_signup_signupTexts.linkOfficialTexts).title,
          desc: common_vendor.unref(constants_signup_signupTexts.linkOfficialTexts).desc
        }),
        b: common_vendor.p({
          ["field-name"]: "学号",
          value: common_vendor.unref(stores).studentId,
          disabled: true
        }),
        c: common_vendor.p({
          ["field-name"]: "官网密码",
          type: "password"
        }),
        d: common_vendor.p({
          variant: "muted"
        }),
        e: common_vendor.o(() => emit("update:current")),
        f: common_vendor.p({
          variant: "outline"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Onboarding)/sign-up/_components/linkOfficial.vue"]]);
wx.createComponent(Component);
