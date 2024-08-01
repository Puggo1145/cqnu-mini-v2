import type { OriginalStudentInfo } from "../libs/jwxt/get-student-info"

export const resolveStudentInfo = (originalData: OriginalStudentInfo) => {
    return {
        studentId: originalData.xh,
        identity: originalData.pyccdm,
        faculty: originalData.jg_id,
        stuClass: originalData.bh_id,
        major: originalData.zyh_id
    }
}