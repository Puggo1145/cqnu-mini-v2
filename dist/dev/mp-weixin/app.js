"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const stores_statusBarHeight = require("./stores/statusBarHeight.js");
if (!Math) {
  "./pages/(Main)/today/page.js";
  "./pages/(Onboarding)/index/index.js";
  "./pages/(Onboarding)/sign-up/page.js";
  "./pages/(Onboarding)/process-sign-up/page.js";
  "./pages/dev/page.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    const statusBarHeight = common_vendor.index.getMenuButtonBoundingClientRect().top;
    stores_statusBarHeight.useStatusBarHeight().set(statusBarHeight - 15);
    return () => {
    };
  }
});
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  const pinia = common_vendor.createPinia();
  app.use(pinia);
  return {
    app,
    pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
