"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cus-input",
  props: {
    fieldName: {},
    value: {},
    disabled: { type: Boolean }
  },
  emits: ["focus", "blur", "input"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const isInputFocused = common_vendor.ref(false);
    const inputValue = common_vendor.ref("");
    const errorMessage = common_vendor.ref("");
    const emit = __emit;
    const onInput = (e) => {
      inputValue.value = e.detail.value;
      emit("input", { value: inputValue.value });
    };
    const onBlur = () => inputValue.value.length === 0 && (isInputFocused.value = false);
    const showError = (message) => {
      errorMessage.value = message;
    };
    __expose({ showError });
    common_vendor.watch(() => props.value, (value) => {
      if (value === void 0)
        return;
      inputValue.value = value || "";
      if (inputValue.value) {
        isInputFocused.value = true;
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(props.fieldName),
        b: common_vendor.n(isInputFocused.value ? "text-xs leading-_12px_" : "leading-_16px_"),
        c: props.value,
        d: props.disabled,
        e: common_vendor.o(($event) => isInputFocused.value = true),
        f: common_vendor.o(onBlur),
        g: common_vendor.o(onInput),
        h: common_vendor.n(isInputFocused.value ? "py-3 border-secondary-foreground" : "py-5 border-_hE0E0E0_"),
        i: common_vendor.n(errorMessage.value && "iborder-destructive"),
        j: common_vendor.n(props.disabled && "border-_hE0E0E0_ bg-_hF5F5F5_"),
        k: errorMessage.value
      }, errorMessage.value ? {
        l: common_vendor.t(errorMessage.value)
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/components/cus-input.vue"]]);
wx.createComponent(Component);
