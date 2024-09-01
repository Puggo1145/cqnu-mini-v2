import { ref } from "vue";
// zod
import { z } from "zod";
// apis
import { createNote } from "@/api/easy-note";
// hooks
import { useCourses } from "./useCourses";
import useFetchClassEasyNote from "./useFetchClassEasyNote";
import useFetchEasyNote from "./useFetchEasyNote";
// types
import type { CreateEasyNote } from "@/api/easy-note";


const easyNoteSchema = z.object({
    title: z.string()
        .min(1, "标题不能为空")
        .max(16, "标题不能超过 16 个字符"),
    content: z.string()
        .min(1, "内容不能为空")
        .max(200, "内容不能超过 200 个字符"),
    imagesUrl: z.array(z.string()),
    deadline: z.string(),
    courseName: z.string(),
    tagIds: z.array(z.number()),
});

export default function useCreateEasyNote() {
    const { currentCourseName } = useCourses();
    const { refresh: refreshEasyNote } = useFetchEasyNote();
    const { refresh: refreshClassEasyNote } = useFetchClassEasyNote();

    const isCreating = ref(false);


    const handleCreateEasyNote = async (form: CreateEasyNote) => {
        isCreating.value = true;

        // 1. 校验数据
        const checkedForm = easyNoteSchema.parse({
            title: form.title,
            content: form.content,
            imagesUrl: [],
            deadline: form.deadline,
            courseName: form.courseName,
            tagIds: form.tagIds,
        });

        const isSuccess = await createNote(checkedForm);
        if (isSuccess) {
            if (currentCourseName.value === form.courseName) {
                // 创建的小记的目标课程是当前正在进行的课程，同时重新获取课堂小记和班级小记的内容
                await refreshEasyNote();
                await refreshClassEasyNote();
            } else {
                // 创建的消极的课程不是正在进行的课程，只需要重新获取班级小记的内容
                await refreshClassEasyNote();
            }

            uni.showToast({
                title: "创建成功",
                icon: "success",
            })
            setTimeout(() => {
                uni.navigateBack();
            }, 1500);
        }

        isCreating.value = false;
    }

    return {
        isCreating,
        handleCreateEasyNote,
    }
}
