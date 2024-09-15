// zod
import { z, ZodError } from "zod"
// types
import type { OriginalStudentInfo } from "../libs/jwxt/get-student-info"


const StudentInfoSchema = z.object({
    studentId: z.string(),
    identity: z.string(),
    faculty: z.string(),
    stuClass: z.string(),
    major: z.string()
});

export const resolveStudentInfo = (originalData: OriginalStudentInfo) => {
    try {
        const resolvedStudentInfo = {
            studentId: originalData.xh,
            identity: originalData.pyccdm,
            faculty: originalData.jg_id,
            stuClass: originalData.bh_id,
            major: originalData.zyh_id
        }
        
        return StudentInfoSchema.parse(resolvedStudentInfo);
    } catch (err) {
        if (err instanceof ZodError) {
            throw new Error("暂不支持研究生用户")
        }
    }
}
