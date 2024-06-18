"use strict";
const common_vendor = require("../common/vendor.js");
const useStatusBarHeight = common_vendor.defineStore("statusBarHeight", {
  state: () => ({ statusBarheight: 0 }),
  actions: {
    set(newHeight) {
      this.statusBarheight = newHeight;
    }
  }
});
exports.useStatusBarHeight = useStatusBarHeight;
