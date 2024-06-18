"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cus-button",
  props: {
    variant: {},
    class: {}
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const variants = {
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-white",
      muted: "bg-muted text-secondary-foreground",
      outline: "border border-primary border-solid text-primary bg-white",
      loading: "bg-primary text-white"
    };
    const buttonStyle = common_vendor.computed(() => {
      return props.class + " " + variants[props.variant || "primary"];
    });
    const emit = __emit;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(buttonStyle.value),
        b: common_vendor.o(($event) => emit("click"))
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/components/cus-button.vue"]]);
wx.createComponent(Component);
