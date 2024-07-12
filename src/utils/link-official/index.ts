// 该模块用于获取与解析校园官网数据
import { 
    getSignInSessionAndAuthCode,
    signInToOfficial
} from "./scripts/sign-in"
import { 
    getSchedules,
    getStudentInfo
} from "./scripts/jwxt"

const LinkOfficial = {
    getSignInSessionAndAuthCode,
    signInToOfficial,
    getSchedules,
    getStudentInfo
}

export default LinkOfficial