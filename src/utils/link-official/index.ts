// 该模块用于获取与解析校园官网数据
import { getSignInSessionAndAuthCode } from "./libs/sign-in/getSignInSessionAndAuthCode"
import { signInToOfficial } from "./libs/sign-in/signin-to-official"


import { getSchedules } from "./libs/jwxt/get-schedules"
import { getStudentInfo } from "./libs/jwxt/get-student-info"
import { getOverallGrade } from "./libs/jwxt/get-overall-grade"
import { getTermGrade } from "./libs/jwxt/get-term-grade"


export {
    getSignInSessionAndAuthCode,
    signInToOfficial
}

export {
    getSchedules,
    getStudentInfo,
    getOverallGrade,
    getTermGrade
}

const LinkOfficial = {
    getSignInSessionAndAuthCode,
    signInToOfficial,
    getSchedules,
    getStudentInfo
}

export default LinkOfficial