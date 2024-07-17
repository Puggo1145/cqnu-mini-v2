"use strict";
const common_vendor = require("../../../../common/vendor.js");
const stores_signupInfo = require("../../../../stores/signup-info.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "visual-signup-info",
  props: {
    current: {}
  },
  setup(__props) {
    const props = __props;
    const stores = stores_signupInfo.useSignupInfo();
    const campusInfoMap = common_vendor.computed(() => [
      { label: "学号", value: stores.studentId },
      { label: "身份", value: stores.identity },
      { label: "学院", value: stores.faculty },
      { label: "专业", value: stores.major }
    ]);
    const identityMap = {
      0: "本科生",
      1: "研究生"
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(stores).username),
        b: common_vendor.f(campusInfoMap.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: common_vendor.t(item.label === "身份" ? identityMap[item.value] : item.value),
            c: item.label
          };
        }),
        c: common_vendor.t(common_vendor.unref(stores).password ? "已绑定到官网" : "未绑定到官网"),
        d: common_vendor.n(props.current === 0 && "mt-0"),
        e: common_vendor.n(props.current === 1 && "-mt-24"),
        f: common_vendor.n(props.current === 2 && "-mt-40"),
        g: common_vendor.n(props.current === 3 && "mt-0"),
        h: common_vendor.n(props.current === 3 && "h-_360px_")
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/erjietangfeiniao/Desktop/cqnu-mini-v2/src/pages/(Onboarding)/sign-up/_components/visual-signup-info.vue"]]);
wx.createComponent(Component);
