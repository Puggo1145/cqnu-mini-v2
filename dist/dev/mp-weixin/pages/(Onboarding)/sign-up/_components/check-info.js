"use strict";
const common_vendor = require("../../../../common/vendor.js");
const api_auth = require("../../../../api/auth.js");
const stores_signupInfo = require("../../../../stores/signup-info.js");
require("../../../../utils/request.js");
require("../../../../utils/requestManager.js");
require("../../../../constants/acceptableErrorCode.js");
if (!Math) {
  (signupTexts + cusButton)();
}
const signupTexts = () => "./signup-texts.js";
const cusButton = () => "../../../../components/cus-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "check-info",
  setup(__props) {
    const stores = stores_signupInfo.useSignupInfo();
    const isSigningUp = common_vendor.ref(false);
    async function goToSignUpProcess() {
      isSigningUp.value = true;
      const res = await api_auth.signup({
        username: stores.username,
        studentId: stores.studentId,
        password: stores.password,
        identity: stores.identity,
        faculty: stores.faculty,
        major: stores.major,
        stuClass: stores.stuClass
      });
      if (res == null ? void 0 : res.success) {
        common_vendor.index.redirectTo({
          url: "/pages/(Onboarding)/process-sign-up/page"
        });
      }
      isSigningUp.value = false;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "请核对信息",
          desc: "请核对您填写的信息，您当前依然可以返回修改。提交后，您将无法再修改这些信息"
        }),
        b: common_vendor.t(isSigningUp.value ? "" : "确认"),
        c: common_vendor.o(goToSignUpProcess),
        d: common_vendor.p({
          variant: isSigningUp.value ? "loading" : "primary"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Onboarding)/sign-up/_components/check-info.vue"]]);
wx.createComponent(Component);
