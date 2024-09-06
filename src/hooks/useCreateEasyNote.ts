import { ref } from "vue";
// zod
import { z } from "zod";
// apis
import { createNote } from "@/api/easy-note";
// hooks
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
    const { fetchNotes: refreshEasyNote } = useFetchEasyNote();
    const { fetchNotes: refreshClassEasyNote } = useFetchClassEasyNote();

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
            await refreshEasyNote('refresh');
            await refreshClassEasyNote('refresh');

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
