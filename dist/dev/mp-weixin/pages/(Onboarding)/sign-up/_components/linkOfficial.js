"use strict";
const common_vendor = require("../../../../common/vendor.js");
const utils_linkOfficial_index = require("../../../../utils/link-official/index.js");
const constants_signup_signupTexts = require("../../../../constants/signup/signup-texts.js");
const constants_signup_campusInfo = require("../../../../constants/signup/campus-info.js");
const stores_signupInfo = require("../../../../stores/signup-info.js");
require("../../../../utils/link-official/scripts/sign-in.js");
require("../../../../utils/request.js");
require("../../../../utils/requestManager.js");
require("../../../../constants/acceptableErrorCode.js");
require("../../../../utils/link-official/libs/sign-in/getDynamicData.js");
require("../../../../utils/link-official/constants/headers.js");
require("../../../../utils/link-official/constants/urls.js");
require("../../../../utils/link-official/libs/sign-in/getCaptcha.js");
require("../../../../utils/link-official/scripts/jwxt.js");
require("../../../../utils/link-official/libs/jwxt/getJwxtCookie.js");
require("../../../../utils/link-official/libs/jwxt/scheduleHandlers.js");
require("../../../../utils/link-official/libs/jwxt/studentInfoHandler.js");
if (!Math) {
  (signupTexts + cusInput + cusButton)();
}
const signupTexts = () => "./signup-texts.js";
const cusInput = () => "../../../../components/cus-input.js";
const cusButton = () => "../../../../components/cus-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "linkOfficial",
  emits: ["update:current"],
  setup(__props, { emit: __emit }) {
    const captchaBase64 = common_vendor.ref("");
    const authCode = common_vendor.ref("");
    const dataObj = common_vendor.ref();
    async function refreshAuthCode() {
      authCode.value = "";
      const data = await utils_linkOfficial_index.LinkOfficial.getSignInSessionAndAuthCode();
      if (data) {
        captchaBase64.value = "data:image/png;base64," + data.authCodeImg;
        dataObj.value = data.dataObj;
      }
    }
    common_vendor.onMounted(async () => {
      common_vendor.index.setStorageSync("JwxtCookie", null);
      await refreshAuthCode();
    });
    const stores = stores_signupInfo.useSignupInfo();
    const studentIdInputRef = common_vendor.ref();
    const passwordInputRef = common_vendor.ref();
    const authCodeInputRef = common_vendor.ref();
    const isLinkingOfficial = common_vendor.ref(false);
    const emit = __emit;
    const linkOfficialSchema = common_vendor.z.object({
      studentId: common_vendor.z.string().trim().length(13, "请输入 13 位学号"),
      password: common_vendor.z.string().trim().min(1, "密码不能为空"),
      authCode: common_vendor.z.string().trim().min(1, "验证码不能为空")
    });
    async function handleLinkOfficial() {
      isLinkingOfficial.value = true;
      try {
        const form = linkOfficialSchema.parse({
          studentId: stores.studentId,
          password: stores.password,
          authCode: authCode.value
        });
        console.log(form);
        const signInRes = await utils_linkOfficial_index.LinkOfficial.signInToOfficial(
          form.studentId,
          form.password,
          form.authCode,
          dataObj.value
        );
        if (!signInRes.success) {
          await refreshAuthCode();
          common_vendor.index.showToast({
            title: signInRes.message,
            icon: "none"
          });
          isLinkingOfficial.value = false;
          return;
        }
        const userInfoRes = await utils_linkOfficial_index.LinkOfficial.getStudentInfo();
        if (userInfoRes) {
          console.log(userInfoRes);
          stores.setIdentity(constants_signup_campusInfo.identityMapper[userInfoRes.identity]);
          stores.setFaculty(userInfoRes.faculty);
          stores.setMajor(userInfoRes.major);
          stores.setStuClass(userInfoRes.stuClass);
        }
        emit("update:current", 1);
        isLinkingOfficial.value = false;
      } catch (err) {
        isLinkingOfficial.value = false;
        if (err instanceof common_vendor.ZodError) {
          err.errors.forEach((error) => {
            if (error.path[0] === "studentId") {
              studentIdInputRef.value.showError(error.message);
            } else if (error.path[0] === "password") {
              passwordInputRef.value.showError(error.message);
            } else if (error.path[0] === "authCode") {
              authCodeInputRef.value.showError(error.message);
            }
          });
        }
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: common_vendor.unref(constants_signup_signupTexts.linkOfficialTexts).title,
          desc: common_vendor.unref(constants_signup_signupTexts.linkOfficialTexts).desc
        }),
        b: common_vendor.sr(studentIdInputRef, "0210431a-1", {
          "k": "studentIdInputRef"
        }),
        c: common_vendor.o((e) => common_vendor.unref(stores).studentId = e.value),
        d: common_vendor.p({
          ["field-name"]: "学号",
          value: common_vendor.unref(stores).studentId
        }),
        e: common_vendor.sr(passwordInputRef, "0210431a-2", {
          "k": "passwordInputRef"
        }),
        f: common_vendor.o((e) => common_vendor.unref(stores).password = e.value),
        g: common_vendor.p({
          ["field-name"]: "官网密码",
          type: "password",
          value: common_vendor.unref(stores).password
        }),
        h: common_vendor.sr(authCodeInputRef, "0210431a-3", {
          "k": "authCodeInputRef"
        }),
        i: common_vendor.o((e) => authCode.value = e.value),
        j: common_vendor.p({
          ["field-name"]: "验证码",
          value: authCode.value
        }),
        k: captchaBase64.value === ""
      }, captchaBase64.value === "" ? {} : {
        l: captchaBase64.value
      }, {
        m: common_vendor.o(refreshAuthCode),
        n: common_vendor.t(isLinkingOfficial.value ? "" : "绑定"),
        o: common_vendor.o(handleLinkOfficial),
        p: common_vendor.p({
          variant: isLinkingOfficial.value ? "loading" : "primary"
        }),
        q: common_vendor.unref(stores).faculty
      }, common_vendor.unref(stores).faculty ? {
        r: common_vendor.p({
          variant: "ghost"
        })
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Onboarding)/sign-up/_components/linkOfficial.vue"]]);
wx.createComponent(Component);
