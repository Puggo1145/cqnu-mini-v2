"use strict";
const common_vendor = require("../common/vendor.js");
const constants_icons = require("../constants/icons.js");
require("../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cus-select",
  props: {
    mode: { default: "selector" },
    value: {},
    range: {},
    start: {},
    end: {},
    fieldName: {},
    placeholder: {},
    icon: {},
    variant: { default: "primary" }
  },
  emits: ["change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const variants = {
      primary: "w-full h-_60px_ border border-solid border-_hE0E0E0_ rounded-2xl bg-white",
      mini: "h-_36px_ bg-secondary rounded-full text-secondary-foreground text-sm"
    };
    const hasSelected = common_vendor.ref(false);
    const emit = __emit;
    function emitChange(e) {
      if (props.mode !== "selector") {
        return emit("change", { value: e.detail.value });
      }
      emit(
        "change",
        hasSelected.value ? { value: Number(e.detail.value) } : { value: Number(e.detail.value), hasSelected: props.fieldName }
      );
      hasSelected.value = true;
    }
    const errorMessage = common_vendor.ref("");
    const showError = (message) => {
      errorMessage.value = message;
    };
    __expose({ showError, hasSelected });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.icon
      }, props.icon ? {
        b: props.icon
      } : {}, {
        c: _ctx.placeholder && !hasSelected.value
      }, _ctx.placeholder && !hasSelected.value ? {
        d: common_vendor.t(_ctx.placeholder),
        e: common_vendor.n(props.variant === "primary" && "leading-_58px_"),
        f: common_vendor.n(props.variant === "mini" && "leading-_36px_ mr-8")
      } : {
        g: common_vendor.t(props.range ? props.range[props.value] : props.value),
        h: common_vendor.n(props.variant === "primary" && "leading-_58px_"),
        i: common_vendor.n(props.variant === "mini" && "leading-_36px_ mr-8")
      }, {
        j: props.mode,
        k: props.value,
        l: props.range,
        m: common_vendor.o(emitChange),
        n: common_vendor.unref(constants_icons.icons).down,
        o: common_vendor.n(props.variant === "primary" && "size-6"),
        p: common_vendor.n(props.variant === "mini" && "size-4"),
        q: common_vendor.n(errorMessage.value ? "iborder-destructive" : ""),
        r: common_vendor.n(variants[props.variant]),
        s: errorMessage.value
      }, errorMessage.value ? {
        t: common_vendor.t(errorMessage.value)
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/components/cus-select.vue"]]);
wx.createComponent(Component);
