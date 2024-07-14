"use strict";
const common_vendor = require("../../common/vendor.js");
const api_easyNote = require("../../api/easy-note.js");
const utils_linkOfficial_index = require("../../utils/link-official/index.js");
require("../../utils/request.js");
require("../../utils/requestManager.js");
require("../../constants/acceptableErrorCode.js");
require("../../utils/link-official/scripts/sign-in.js");
require("../../utils/link-official/libs/sign-in/getDynamicData.js");
require("../../utils/link-official/constants/headers.js");
require("../../utils/link-official/constants/urls.js");
require("../../utils/link-official/libs/sign-in/getCaptcha.js");
require("../../utils/link-official/scripts/jwxt.js");
require("../../utils/link-official/libs/jwxt/getJwxtCookie.js");
require("../../utils/link-official/libs/jwxt/scheduleHandlers.js");
require("../../utils/link-official/libs/jwxt/studentInfoHandler.js");
if (!Math) {
  (spinner + cusButton + cusInput + cusPage)();
}
const cusPage = () => "../../components/cus-page.js";
const spinner = () => "../../components/spinner.js";
const cusButton = () => "../../components/cus-button.js";
const cusInput = () => "../../components/cus-input.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "page",
  setup(__props) {
    const captchaBase64 = common_vendor.ref("");
    const authCode = common_vendor.ref("");
    const dataObj = common_vendor.ref();
    common_vendor.onMounted(async () => {
      const data = await utils_linkOfficial_index.LinkOfficial.getSignInSessionAndAuthCode();
      if (data) {
        captchaBase64.value = "data:image/png;base64," + data.authCodeImg;
        dataObj.value = data.dataObj;
      }
    });
    const signInToOfficial = async () => {
      await utils_linkOfficial_index.LinkOfficial.signInToOfficial(
        "2021050919079",
        "281733",
        authCode.value,
        dataObj.value
      );
    };
    const getSchedules = async () => {
      const schedule = await utils_linkOfficial_index.LinkOfficial.getSchedules();
      console.log(schedule);
    };
    const getStudentInfo = async () => {
      const studentInfo = await utils_linkOfficial_index.LinkOfficial.getStudentInfo();
      console.log(studentInfo);
    };
    const createEasyNote = async () => {
      const res = await api_easyNote.createNote({
        title: "测试",
        content: "测试",
        imagesUrl: [],
        deadline: "2024-7-15 00:04:46",
        courseName: "测试",
        tagsIds: [1]
      });
      console.log(res);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          size: "small",
          color: "white"
        }),
        b: common_vendor.p({
          ["class-name"]: "flex items-center gap-2"
        }),
        c: captchaBase64.value,
        d: common_vendor.o((event) => authCode.value = event.value),
        e: common_vendor.o(signInToOfficial),
        f: common_vendor.o(getSchedules),
        g: common_vendor.o(getStudentInfo),
        h: common_vendor.p({
          ["class-name"]: "mt-4"
        }),
        i: common_vendor.o(() => common_vendor.unref(api_easyNote.getNoteList)(1, 10)),
        j: common_vendor.o(createEasyNote),
        k: common_vendor.p({
          ["class-name"]: "mt-4"
        }),
        l: common_vendor.p({
          ["header-type"]: "nav",
          ["padding-x"]: "16"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/dev/page.vue"]]);
wx.createPage(MiniProgramPage);
