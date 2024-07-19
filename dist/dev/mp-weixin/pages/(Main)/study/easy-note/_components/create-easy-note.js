"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const api_easyNote = require("../../../../../api/easy-note.js");
const utils_timeHandler = require("../../../../../utils/timeHandler.js");
const constants_easyNote_easyNoteCard = require("../../../../../constants/easy-note/easy-note-card.js");
const mock_easyNote = require("../../../../../mock/easy-note.js");
const stores_easyNote_classEasyNote = require("../../../../../stores/easy-note/class-easy-note.js");
const stores_easyNote_easyNote = require("../../../../../stores/easy-note/easy-note.js");
const constants_icons = require("../../../../../constants/icons.js");
require("../../../../../utils/request.js");
require("../../../../../utils/requestManager.js");
require("../../../../../constants/acceptableErrorCode.js");
require("../../../../../common/assets.js");
if (!Math) {
  (cusInput + cusSelect + cusButton + cusPage)();
}
const cusPage = () => "../../../../../components/cus-page.js";
const cusInput = () => "../../../../../components/cus-input.js";
const cusSelect = () => "../../../../../components/cus-select.js";
const cusButton = () => "../../../../../components/cus-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "create-easy-note",
  setup(__props) {
    stores_easyNote_classEasyNote.useClassEasyNoteStore();
    stores_easyNote_easyNote.useEasyNoteStore();
    const tags = common_vendor.ref([]);
    const relatedCourses = common_vendor.ref(mock_easyNote.mockRelatedCourses);
    common_vendor.onMounted(async () => {
      const data = await api_easyNote.getTags();
      if (tags) {
        tags.value = data;
      }
    });
    const currentDate = common_vendor.ref(utils_timeHandler.getDate());
    const currentTime = common_vendor.ref(utils_timeHandler.getCurrentTime());
    const currentCourseIndex = common_vendor.ref(0);
    function onDateChange(e) {
      currentDate.value = e.value;
    }
    function onTimeChange(e) {
      currentTime.value = e.value;
    }
    function onCourseChange(e) {
      currentCourseIndex.value = e.value;
    }
    const selectedTags = common_vendor.ref([]);
    function onTagClick(tagId) {
      if (selectedTags.value.includes(tagId)) {
        selectedTags.value = selectedTags.value.filter((id) => id !== tagId);
      } else {
        selectedTags.value.push(tagId);
      }
    }
    const titleInputRef = common_vendor.ref();
    const title = common_vendor.ref("");
    const content = common_vendor.ref("");
    const easyNoteSchema = common_vendor.z.object({
      title: common_vendor.z.string().min(1, "标题不能为空").max(16, "标题不能超过 16 个字符"),
      content: common_vendor.z.string().min(1, "内容不能为空").max(200, "内容不能超过 200 个字符"),
      imagesUrl: common_vendor.z.array(common_vendor.z.string()),
      deadline: common_vendor.z.string(),
      courseName: common_vendor.z.string(),
      tagIds: common_vendor.z.array(common_vendor.z.number())
    });
    async function createEasyNote() {
      try {
        const form = easyNoteSchema.parse({
          title: title.value,
          content: content.value,
          imagesUrl: [],
          deadline: `${currentDate.value} ${currentTime.value}`,
          courseName: relatedCourses.value[currentCourseIndex.value],
          tagIds: selectedTags.value
        });
        const res = await api_easyNote.createNote(form);
        if (res.success) {
          common_vendor.index.showToast({
            title: "创建成功",
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 1500);
        }
      } catch (err) {
        if (err instanceof common_vendor.z.ZodError) {
          err.errors.forEach((err2) => {
            if (err2.path[0] === "title") {
              titleInputRef.value.showError(err2.message);
            } else if (err2.path[0] === "content") {
              common_vendor.index.showToast({
                title: err2.message,
                icon: "none"
              });
            }
          });
        }
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr(titleInputRef, "640acf13-1,640acf13-0", {
          "k": "titleInputRef"
        }),
        b: common_vendor.o((e) => title.value = e.value),
        c: common_vendor.p({
          ["field-name"]: "标题",
          value: title.value
        }),
        d: content.value,
        e: common_vendor.o((e) => {
          content.value = e.detail.value;
        }),
        f: common_vendor.unref(constants_icons.icons).image,
        g: common_vendor.o(onDateChange),
        h: common_vendor.p({
          mode: "date",
          icon: common_vendor.unref(constants_icons.icons).calendar,
          value: currentDate.value,
          start: currentDate.value
        }),
        i: common_vendor.o(onTimeChange),
        j: common_vendor.p({
          mode: "time",
          icon: common_vendor.unref(constants_icons.icons).clock,
          value: currentTime.value,
          start: currentTime.value
        }),
        k: common_vendor.o(onCourseChange),
        l: common_vendor.p({
          mode: "selector",
          icon: common_vendor.unref(constants_icons.icons).academy,
          value: currentCourseIndex.value,
          range: relatedCourses.value
        }),
        m: common_vendor.f(tags.value, (tag, k0, i0) => {
          return {
            a: common_vendor.t(tag.tagName),
            b: tag.id,
            c: common_vendor.n(selectedTags.value.includes(tag.id) && "text-white"),
            d: selectedTags.value.includes(tag.id) ? common_vendor.unref(constants_easyNote_easyNoteCard.easyNoteTagColorMapper)[tag.tagName] : "#eeeff1",
            e: common_vendor.o(() => onTagClick(tag.id), tag.id)
          };
        }),
        n: common_vendor.o(createEasyNote),
        o: common_vendor.p({
          ["header-type"]: "nav",
          ["padding-x"]: "16"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Main)/study/easy-note/_components/create-easy-note.vue"]]);
wx.createPage(MiniProgramPage);
