// 该模块用于获取与解析校园官网数据
import { getSignInSessionAndAuthCode } from "./libs/sign-in/getSignInSessionAndAuthCode"
import { signInToOfficial } from "./libs/sign-in/signin-to-official"

import { getSchedules } from "./libs/jwxt/get-schedules"
import { getStudentInfo } from "./libs/jwxt/get-student-info"
import { getOverallGrade } from "./libs/jwxt/get-overall-grade"
import { getTermGrade } from "./libs/jwxt/get-term-grade"
import { getAcademicDetails } from "./libs/jwxt/get-academic-details"

import { getCardInfo } from "./libs/e-card/get-utility"
import { getUtilityBalance } from "./libs/e-card/get-utility"
import { getECardToken } from "./libs/e-card/signin-to-e-card"
import { getConsume } from "./libs/e-card/get-consume"


export {
    getSignInSessionAndAuthCode,
    signInToOfficial
}

export {
    getSchedules,
    getStudentInfo,
    getOverallGrade,
    getTermGrade,
    getAcademicDetails
}

export {
    getCardInfo,
    getUtilityBalance,
    
    getECardToken,
    getConsume
}


const LinkOfficial = {
    getSignInSessionAndAuthCode,
    signInToOfficial,
    getSchedules,
    getStudentInfo
}

export default LinkOfficial