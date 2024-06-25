"use strict";
const common_vendor = require("../common/vendor.js");
const constants_icons = require("../constants/icons.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cus-select",
  props: {
    value: {},
    range: {},
    fieldName: {},
    placeholder: {},
    variant: {}
  },
  emits: ["change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const variants = {
      primary: "w-full h-_60px_ border border-solid border-_hE0E0E0_ rounded-2xl bg-white",
      mini: "h-_36px_ bg-secondary rounded-full text-secondary-foreground text-sm"
    };
    const hasSelected = common_vendor.ref(false);
    const errorMessage = common_vendor.ref("");
    const emit = __emit;
    function emitChange(e) {
      emit(
        "change",
        hasSelected.value ? { value: Number(e.detail.value) } : { value: Number(e.detail.value), hasSelected: props.fieldName }
      );
      hasSelected.value = true;
    }
    const showError = (message) => {
      errorMessage.value = message;
    };
    __expose({ showError, hasSelected });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.placeholder && !hasSelected.value
      }, _ctx.placeholder && !hasSelected.value ? {
        b: common_vendor.t(_ctx.placeholder)
      } : {
        c: common_vendor.t(props.range[props.value])
      }, {
        d: props.value,
        e: props.range,
        f: common_vendor.o(emitChange),
        g: common_vendor.unref(constants_icons.icons).down,
        h: common_vendor.n(props.variant === "primary" && "size-6"),
        i: common_vendor.n(props.variant === "mini" && "size-4"),
        j: common_vendor.n(errorMessage.value ? "iborder-destructive" : ""),
        k: common_vendor.n(variants[props.variant || "primary"]),
        l: errorMessage.value
      }, errorMessage.value ? {
        m: common_vendor.t(errorMessage.value)
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/components/cus-select.vue"]]);
wx.createComponent(Component);
