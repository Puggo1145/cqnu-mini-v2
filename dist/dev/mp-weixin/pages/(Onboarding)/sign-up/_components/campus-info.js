"use strict";
const common_vendor = require("../../../../common/vendor.js");
const constants_signup_campusInfo = require("../../../../constants/signup/campus-info.js");
if (!Math) {
  (signupTexts + cusInput + cusSelect + cusButton)();
}
const signupTexts = () => "./signup-texts.js";
const cusSelect = () => "../../../../components/cus-select.js";
const cusInput = () => "../../../../components/cus-input.js";
const cusButton = () => "../../../../components/cus-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "campus-info",
  props: {
    current: {}
  },
  emits: ["update:current"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const inputValue = common_vendor.ref("");
    const inputRef = common_vendor.ref();
    const selectedFields = common_vendor.ref([]);
    const identityIndex = common_vendor.ref(0);
    const facultyIndex = common_vendor.ref(0);
    const majorsIndex = common_vendor.ref(0);
    const faculties = common_vendor.computed(() => constants_signup_campusInfo.facultiesAndMajors.map(({ name }) => name));
    const majors = common_vendor.computed(() => {
      const majorsOfFaculty = constants_signup_campusInfo.facultiesAndMajors.find(({ name }) => name === faculties.value[facultyIndex.value]);
      return identityIndex.value === 0 ? majorsOfFaculty == null ? void 0 : majorsOfFaculty.majorsForUndergraduates : majorsOfFaculty == null ? void 0 : majorsOfFaculty.majorsForPostgraduates;
    });
    const handleIdentityChange = (event) => {
      identityIndex.value = event.value;
      majorsIndex.value = 0;
      if (event.hasSelected) {
        selectedFields.value.push(event.hasSelected);
      }
    };
    const handleFacultyChange = (event) => {
      facultyIndex.value = event.value;
      majorsIndex.value = 0;
      if (event.hasSelected) {
        selectedFields.value.push(event.hasSelected);
      }
    };
    const validateValue = () => {
      const isInputLengthCorrect = inputValue.value.length === 13;
      const isInputNumbers = Number.isInteger(Number(inputValue.value));
      selectedFields.value.length === 3;
      if (!isInputLengthCorrect) {
        inputRef.value.showError("请输入 13 位学号");
      } else if (!isInputNumbers) {
        inputRef.value.showError("学号只能包含数字");
      } else {
        inputRef.value.showError("");
        emit("update:current", props.current + 1);
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "完善你的校园信息",
          desc: "输入你的学号、学院和专业，以便为你提供更好的服务"
        }),
        b: common_vendor.sr(inputRef, "4462f7d7-1", {
          "k": "inputRef"
        }),
        c: common_vendor.o(($event) => inputValue.value = $event.value),
        d: common_vendor.p({
          ["field-name"]: "学号（13 位）"
        }),
        e: common_vendor.o(handleIdentityChange),
        f: common_vendor.p({
          ["field-name"]: "identity",
          placeholder: "请选择你的身份",
          value: identityIndex.value,
          range: common_vendor.unref(constants_signup_campusInfo.identity)
        }),
        g: common_vendor.o(handleFacultyChange),
        h: common_vendor.p({
          ["field-name"]: "faculty",
          placeholder: "请选择你的学院",
          value: facultyIndex.value,
          range: faculties.value
        }),
        i: selectedFields.value.length > 1
      }, selectedFields.value.length > 1 ? {
        j: common_vendor.o(($event) => majorsIndex.value = $event.value),
        k: common_vendor.p({
          ["field-name"]: "major",
          placeholder: "请选择你的专业",
          value: majorsIndex.value,
          range: majors.value
        })
      } : {}, {
        l: common_vendor.o(validateValue)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Onboarding)/sign-up/_components/campus-info.vue"]]);
wx.createComponent(Component);
