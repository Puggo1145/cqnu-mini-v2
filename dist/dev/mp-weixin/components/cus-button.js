"use strict";
const common_vendor = require("../common/vendor.js");
if (!Math) {
  spinner();
}
const spinner = () => "./spinner.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cus-button",
  props: {
    variant: { default: "primary" },
    className: { default: "" },
    disabled: { type: Boolean, default: false }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isButtonDisabled = common_vendor.computed(
      () => props.disabled || props.variant === "loading"
    );
    const variants = {
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-secondary-foreground",
      muted: "ibg-muted text-secondary-foreground",
      outline: "border border-primary border-solid text-primary bg-white",
      ghost: "ih-_32px_ ileading-_32px_ text-primary bg-transparent border-none",
      loading: "ibg-muted text-secondary-foreground"
    };
    const emit = __emit;
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.variant === "loading"
      }, props.variant === "loading" ? {
        b: common_vendor.p({
          size: "small"
        })
      } : {}, {
        c: common_vendor.n(variants[props.variant]),
        d: common_vendor.n(props.className),
        e: common_vendor.o(($event) => emit("click")),
        f: isButtonDisabled.value
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d363d67f"], ["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/components/cus-button.vue"]]);
wx.createComponent(Component);
