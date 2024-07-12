import type { OriginalStudentInfo } from "../../scripts/jwxt"

export const resolveStudentInfo = (originalData: OriginalStudentInfo) => {
    return {
        studentId: originalData.xh,
        identity: originalData.xslbdm,
        faculty: originalData.jg_id,
        stuClass: originalData.bh_id,
        major: originalData.zyh_id
    }
}