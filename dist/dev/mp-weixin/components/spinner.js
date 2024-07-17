"use strict";
const common_vendor = require("../common/vendor.js");
const constants_icons = require("../constants/icons.js");
require("../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "spinner",
  props: {
    size: { default: "default" },
    color: { default: "black" }
  },
  setup(__props) {
    const props = __props;
    const size = {
      default: "size-8",
      small: "size-4",
      medium: "size-6",
      large: "size-12"
    };
    const color = {
      black: constants_icons.icons.loadingBlack,
      white: constants_icons.icons.loadingWhite
    };
    return (_ctx, _cache) => {
      return {
        a: color[props.color],
        b: common_vendor.n(size[props.size])
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-40d3408f"], ["__file", "/Users/erjietangfeiniao/Desktop/cqnu-mini-v2/src/components/spinner.vue"]]);
wx.createComponent(Component);
