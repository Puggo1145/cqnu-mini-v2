"use strict";
const common_vendor = require("../common/vendor.js");
const useSignupInfo = common_vendor.defineStore("signupInfo", {
  state: () => ({
    username: "",
    studentId: "",
    password: "",
    identity: null,
    faculty: null,
    major: null,
    stuClass: null
  }),
  actions: {
    setUsername(newUsername) {
      this.username = newUsername;
    },
    setStudentId(newStudentId) {
      this.studentId = newStudentId;
    },
    setIdentity(newIdentity) {
      this.identity = newIdentity;
    },
    setFaculty(newFaculty) {
      this.faculty = newFaculty;
    },
    setMajor(newMajor) {
      this.major = newMajor;
    },
    setPassword(newPassword) {
      this.password = newPassword;
    },
    setStuClass(newStuClass) {
      this.stuClass = newStuClass;
    }
  }
});
exports.useSignupInfo = useSignupInfo;
