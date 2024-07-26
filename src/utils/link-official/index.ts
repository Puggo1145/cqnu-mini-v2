// 该模块用于获取与解析校园官网数据
import { 
    getSignInSessionAndAuthCode,
    signInToOfficial
} from "./scripts/sign-in"
import { 
    getSchedules,
    getStudentInfo,
    getOverallGrade
} from "./scripts/jwxt"


export {
    getSignInSessionAndAuthCode,
    signInToOfficial
}

export {
    getSchedules,
    getStudentInfo,
    getOverallGrade
}

const LinkOfficial = {
    getSignInSessionAndAuthCode,
    signInToOfficial,
    getSchedules,
    getStudentInfo
}

export default LinkOfficial