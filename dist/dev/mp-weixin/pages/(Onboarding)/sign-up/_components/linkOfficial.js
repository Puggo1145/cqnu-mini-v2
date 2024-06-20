"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Math) {
  (signupTexts + cusInput + cusButton)();
}
const signupTexts = () => "./signup-texts.js";
const cusInput = () => "../../../../components/cus-input.js";
const cusButton = () => "../../../../components/cus-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "linkOfficial",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "绑定校园官网",
          desc: "绑定学校官网户账号可以帮助你更好地管理学业信息课表同步、成绩查询及其他学业信息服务都有我来搞定我们尊重您的隐私，因此您可以选择性保存这一信息"
        }),
        b: common_vendor.p({
          ["field-name"]: "学号"
        }),
        c: common_vendor.p({
          ["field-name"]: "官网密码"
        }),
        d: common_vendor.p({
          variant: "muted"
        }),
        e: common_vendor.p({
          variant: "outline"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Onboarding)/sign-up/_components/linkOfficial.vue"]]);
wx.createComponent(Component);
