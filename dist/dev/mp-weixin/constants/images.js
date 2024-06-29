"use strict";
const common_assets = require("../common/assets.js");
const images = {
  landing: common_assets.landing,
  welcome: common_assets.welcome,
  addNote: common_assets.addNote,
  board: common_assets.board,
  study: {
    bg: common_assets.studyBg,
    todo: common_assets.studyTodo,
    easyNote: common_assets.studyEasyNote
  },
  service: {
    bg: common_assets.serviceBg,
    utility: common_assets.serviceUtility,
    card: common_assets.serviceCard,
    food: common_assets.serviceFood,
    location: common_assets.serviceLocation,
    water: common_assets.serviceWater
  }
};
exports.images = images;
