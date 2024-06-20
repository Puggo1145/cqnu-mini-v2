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
  props: {
    current: {}
  },
  emits: ["update:current"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const inputValue = common_vendor.ref("");
    const inputRef = common_vendor.ref();
    const validateValue = () => {
      const valueLength = inputValue.value.length;
      if (valueLength < 2 || valueLength > 12) {
        inputRef.value.showError("用户名长度必须在 2-12 个字符之间");
      } else {
        inputRef.value.showError("");
        emit("update:current", props.current + 1);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "让我们相互认识一下",
          desc: "给自己取一个喜欢的昵称。你不必使用你的真实姓名"
        }),
        b: common_vendor.sr(inputRef, "78ae262a-1", {
          "k": "inputRef"
        }),
        c: common_vendor.o(($event) => inputValue.value = $event.value),
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
