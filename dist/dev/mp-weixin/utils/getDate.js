"use strict";
const getDate = () => {
  const date = /* @__PURE__ */ new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const transformedMonth = month > 9 ? month : "0" + month;
  const transformedDay = day > 9 ? day : "0" + day;
  return `${year}-${transformedMonth}-${transformedDay}`;
};
exports.getDate = getDate;
