"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  (username + campusInfo + signupTexts + cusPage)();
}
const cusPage = () => "../../../components/cus-page.js";
const signupTexts = () => "./_components/signup-texts.js";
const username = () => "./_components/username.js";
const campusInfo = () => "./_components/campus-info.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "page",
  setup(__props) {
    const current = common_vendor.ref(0);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "绑定校园官网",
          desc: "绑定学校官网户账号可以帮助你更好地管理学业信息课表同步、成绩查询及其他学业信息服务都有我来搞定我们尊重您的隐私，因此您可以选择性保存这一信息"
        }),
        b: current.value,
        c: common_vendor.p({
          ["header-type"]: "nav"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Onboarding)/sign-up/page.vue"]]);
wx.createPage(MiniProgramPage);
