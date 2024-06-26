"use strict";
const common_vendor = require("../../../../common/vendor.js");
const constants_signup_campusInfo = require("../../../../constants/signup/campus-info.js");
const constants_signup_signupTexts = require("../../../../constants/signup/signup-texts.js");
const stores_signupInfo = require("../../../../stores/signup-info.js");
if (!Math) {
  (signupTexts + cusInput + cusSelect + cusButton)();
}
const signupTexts = () => "./signup-texts.js";
const cusSelect = () => "../../../../components/cus-select.js";
const cusInput = () => "../../../../components/cus-input.js";
const cusButton = () => "../../../../components/cus-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "campus-info",
  emits: ["update:current"],
  setup(__props, { emit: __emit }) {
    const stores = stores_signupInfo.useSignupInfo();
    const emit = __emit;
    const inputValue = common_vendor.ref("");
    const inputRef = common_vendor.ref();
    const identitySelectRef = common_vendor.ref();
    const facultySelectRef = common_vendor.ref();
    const majorSelectRef = common_vendor.ref();
    const selectedFields = common_vendor.ref([null, null, null]);
    const isMajorShow = common_vendor.computed(() => {
      return selectedFields.value[0] === "identity" && selectedFields.value[1] === "faculty";
    });
    const identityIndex = common_vendor.ref(0);
    const facultyIndex = common_vendor.ref(0);
    const majorsIndex = common_vendor.ref(0);
    const faculties = common_vendor.computed(() => constants_signup_campusInfo.facultiesAndMajors.map(({ name }) => name));
    const majors = common_vendor.computed(() => {
      const majorsOfFaculty = constants_signup_campusInfo.facultiesAndMajors.find(({ name }) => name === faculties.value[facultyIndex.value]);
      return identityIndex.value === 0 ? majorsOfFaculty == null ? void 0 : majorsOfFaculty.majorsForUndergraduates : majorsOfFaculty == null ? void 0 : majorsOfFaculty.majorsForPostgraduates;
    });
    const handleInput = (event) => {
      stores.studentId = event.value;
      inputValue.value = event.value;
      inputRef.value.showError("");
    };
    const handleIdentityChange = (event) => {
      identityIndex.value = event.value;
      stores.identity = event.value;
      if (isMajorShow.value) {
        majorsIndex.value = 0;
        stores.major = majors.value[0];
      }
      if (event.hasSelected) {
        identitySelectRef.value.showError("");
        selectedFields.value[0] = "identity";
      }
    };
    const handleFacultyChange = (event) => {
      facultyIndex.value = event.value;
      stores.faculty = faculties.value[event.value];
      if (isMajorShow.value) {
        majorsIndex.value = 0;
        stores.major = majors.value[0];
      }
      if (event.hasSelected) {
        facultySelectRef.value.showError("");
        selectedFields.value[1] = "faculty";
      }
    };
    const handleMajorChange = (event) => {
      majorsIndex.value = event.value;
      stores.major = majors.value[event.value];
      if (event.hasSelected) {
        majorSelectRef.value.showError("");
        selectedFields.value[2] = "major";
      }
    };
    const validateValue = () => {
      const isInputLengthCorrect = inputValue.value.length === 13;
      const isInputNumbers = Number.isInteger(Number(inputValue.value));
      if (!isInputLengthCorrect) {
        return inputRef.value.showError("请输入 13 位学号");
      } else if (!isInputNumbers) {
        return inputRef.value.showError("学号只能包含数字");
      }
      selectedFields.value[0] === null && identitySelectRef.value.showError("请选择身份");
      selectedFields.value[1] === null && facultySelectRef.value.showError("请选择学院");
      if (isMajorShow.value) {
        selectedFields.value[2] === null && majorSelectRef.value.showError("请选择专业");
      }
      if (selectedFields.value.includes(null))
        return;
      inputRef.value.showError("");
      emit("update:current");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: common_vendor.unref(constants_signup_signupTexts.campusInfoTexts).title,
          desc: common_vendor.unref(constants_signup_signupTexts.campusInfoTexts).desc
        }),
        b: common_vendor.sr(inputRef, "4462f7d7-1", {
          "k": "inputRef"
        }),
        c: common_vendor.o(handleInput),
        d: common_vendor.p({
          ["field-name"]: "学号（13 位）"
        }),
        e: common_vendor.sr(identitySelectRef, "4462f7d7-2", {
          "k": "identitySelectRef"
        }),
        f: common_vendor.o(handleIdentityChange),
        g: common_vendor.p({
          ["field-name"]: "identity",
          placeholder: "请选择你的身份",
          value: identityIndex.value,
          range: common_vendor.unref(constants_signup_campusInfo.identity)
        }),
        h: common_vendor.sr(facultySelectRef, "4462f7d7-3", {
          "k": "facultySelectRef"
        }),
        i: common_vendor.o(handleFacultyChange),
        j: common_vendor.p({
          ["field-name"]: "faculty",
          placeholder: "请选择你的学院",
          value: facultyIndex.value,
          range: faculties.value
        }),
        k: isMajorShow.value
      }, isMajorShow.value ? {
        l: common_vendor.sr(majorSelectRef, "4462f7d7-4", {
          "k": "majorSelectRef"
        }),
        m: common_vendor.o(handleMajorChange),
        n: common_vendor.p({
          ["field-name"]: "major",
          placeholder: "请选择你的专业",
          value: majorsIndex.value,
          range: majors.value
        })
      } : {}, {
        o: common_vendor.o(validateValue)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Onboarding)/sign-up/_components/campus-info.vue"]]);
wx.createComponent(Component);
