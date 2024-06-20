"use strict";
const common_vendor = require("../../../../common/vendor.js");
const constants_signup_signupTexts = require("../../../../constants/signup/signup-texts.js");
const stores_signupInfo = require("../../../../stores/signup-info.js");
if (!Math) {
  (signupTexts + cusInput + cusButton)();
}
const cusInput = () => "../../../../components/cus-input.js";
const signupTexts = () => "./signup-texts.js";
const cusButton = () => "../../../../components/cus-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "username",
  emits: ["update:current"],
  setup(__props, { emit: __emit }) {
    const { setUsername } = stores_signupInfo.useSignupInfo();
    const emit = __emit;
    const inputValue = common_vendor.ref("");
    const inputRef = common_vendor.ref();
    const handleInput = (event) => {
      inputValue.value = event.value;
      inputRef.value.showError("");
      setUsername(inputValue.value);
    };
    const validateValue = () => {
      const valueLength = inputValue.value.length;
      if (valueLength < 2 || valueLength > 12) {
        return inputRef.value.showError("用户名长度必须在 2-12 个字符之间");
      } else if (Number.isInteger(Number(inputValue.value[0]))) {
        return inputRef.value.showError("用户名必须以字母开头");
      }
      inputRef.value.showError("");
      emit("update:current");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: common_vendor.unref(constants_signup_signupTexts.usernameTexts).title,
          desc: common_vendor.unref(constants_signup_signupTexts.usernameTexts).desc
        }),
        b: common_vendor.sr(inputRef, "78ae262a-1", {
          "k": "inputRef"
        }),
        c: common_vendor.o(handleInput),
        d: common_vendor.p({
          ["field-name"]: "用户名（2-12 字符）"
        }),
        e: common_vendor.o(validateValue),
        f: common_vendor.p({
          variant: inputValue.value.length > 0 ? "primary" : "muted",
          disabled: inputValue.value.length === 0
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Onboarding)/sign-up/_components/username.vue"]]);
wx.createComponent(Component);
