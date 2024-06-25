"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cus-button",
  props: {
    variant: {},
    className: {},
    disabled: { type: Boolean }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const variants = {
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-secondary-foreground",
      muted: "ibg-muted text-secondary-foreground",
      outline: "border border-primary border-solid text-primary bg-white",
      ghost: "ih-_32px_ ileading-_32px_ text-primary bg-transparent border-none"
    };
    const emit = __emit;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(variants[props.variant || "primary"]),
        b: common_vendor.n(props.className),
        c: common_vendor.o(($event) => emit("click")),
        d: props.disabled
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d363d67f"], ["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/components/cus-button.vue"]]);
wx.createComponent(Component);
