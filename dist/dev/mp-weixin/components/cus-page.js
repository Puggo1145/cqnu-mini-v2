"use strict";
const common_vendor = require("../common/vendor.js");
const stores_statusBarHeight = require("../stores/statusBarHeight.js");
const utils_setTab = require("../utils/setTab.js");
const constants_icons = require("../constants/icons.js");
require("../constants/tabbar-style.js");
require("../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cus-page",
  props: {
    headerType: {},
    backgroundStyle: {},
    paddingX: {}
  },
  setup(__props) {
    const { statusBarheight } = stores_statusBarHeight.useStatusBarHeight();
    const props = __props;
    const paddingTop = common_vendor.computed(() => {
      return props.headerType === "none" ? "0px" : statusBarheight.toString() + "px";
    });
    const backgroundStyle = {
      none: "bg-transparent",
      default: "bg-background",
      modern: "bg-gradient-to-b from-_hE6EBF8_ to-_hF5F9FC_"
    };
    common_vendor.onMounted(() => utils_setTab.setTabBackgroundColor(props.backgroundStyle ?? "default"));
    const goBack = () => common_vendor.index.navigateBack();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.headerType === "nav"
      }, props.headerType === "nav" ? {
        b: common_vendor.unref(constants_icons.icons).back,
        c: common_vendor.o(goBack)
      } : {}, {
        d: (props.paddingX || 0) + "px",
        e: (props.paddingX || 0) + "px",
        f: common_vendor.n(backgroundStyle[props.backgroundStyle ?? "default"]),
        g: paddingTop.value
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/components/cus-page.vue"]]);
wx.createComponent(Component);
