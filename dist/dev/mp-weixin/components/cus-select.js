"use strict";
const common_vendor = require("../common/vendor.js");
const constants_icons = require("../constants/icons.js");
require("../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cus-select",
  props: {
    value: {},
    range: {},
    fieldName: {},
    placeholder: {}
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const hasSelected = common_vendor.ref(false);
    function emitChange(e) {
      emit(
        "change",
        hasSelected.value ? { value: Number(e.detail.value) } : { value: Number(e.detail.value), hasSelected: props.fieldName }
      );
      hasSelected.value = true;
    }
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
        g: common_vendor.unref(constants_icons.icons).down
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/components/cus-select.vue"]]);
wx.createComponent(Component);
