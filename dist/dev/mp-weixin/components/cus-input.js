"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cus-input",
  props: {
    fieldName: {}
  },
  setup(__props) {
    const props = __props;
    const isInputFocused = common_vendor.ref(false);
    const inputValue = common_vendor.ref("");
    const onInput = (e) => inputValue.value = e.detail.value;
    const onBlur = () => inputValue.value.length === 0 && (isInputFocused.value = false);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.fieldName),
        b: common_vendor.n(isInputFocused.value ? "text-xs leading-_12px_" : "leading-_16px_"),
        c: common_vendor.o(($event) => isInputFocused.value = true),
        d: common_vendor.o(onBlur),
        e: common_vendor.o(onInput),
        f: common_vendor.n(isInputFocused.value ? "py-3 border-secondary-foreground" : "py-5 border-_hE0E0E0_")
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/components/cus-input.vue"]]);
wx.createComponent(Component);
