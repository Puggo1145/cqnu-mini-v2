<script setup lang="ts">
import { ref } from 'vue';
// components
import titleDesc from '@/components/title-desc.vue';
import cusSelect from '@/components/cus-select.vue';
import cusInput from '@/components/cus-input.vue';
import cusButton from '@/components/cus-button.vue';
// api
import { updateUserInfo } from '@/api/user';
// stores
import useUserInfo from '@/stores/user-info';
// zod
import { ZodError, z } from 'zod';
// constants
import { dormitories } from '@/constants/dormitories';
// types
import type { CusSelectEvent } from '@/components/cus-select.vue';

const props = defineProps<{
    onClose: () => void;
}>();


const userInfo = useUserInfo();


const selectedDormitory = ref(0);
function onDormitoryChange(e: CusSelectEvent) {
    selectedDormitory.value = e.value;
}

const roomNumber = ref('');
const roomNumberInputRef = ref();
function onRoomNumberChange(e: any) {
    roomNumber.value = e.value;
}


const isBinding = ref(false);
const bindDormitorySchema = z.object({
    roomNumber: z.string().length(4, '请输入正确的四位宿舍号')
});
async function bindDormitory() {
    isBinding.value = true;

    try {
        bindDormitorySchema.parse({
            roomNumber: roomNumber.value
        });

        // 更新用户信息
        const isSuccess = await updateUserInfo({
            openid: userInfo.openid!,
            dormitory: dormitories[selectedDormitory.value],
            roomNumber: roomNumber.value
        });
        if (isSuccess) {
            userInfo.dormitory = dormitories[selectedDormitory.value];
            userInfo.roomNumber = roomNumber.value;

            uni.showToast({
                title: '绑定成功',
                icon: 'success'
            });

            // 关闭弹窗
            props.onClose();
        }
    } catch (err) {
        if (err instanceof ZodError) {
            if (err.errors[0].path[0] === "roomNumber") {
                roomNumberInputRef.value.showError(err.errors[0].message);
            }
        }
    } finally {
        isBinding.value = false;
    }
}
</script>

<template>
    <view class="w-full flex flex-col px-4 gap-y-4 mt-4">
        <title-desc
            title="绑定宿舍信息"
            desc="绑定您的宿舍信息，体验最好用的宿舍水电查询功能。请确保您选择了正确的宿舍楼并输入了正确的四位宿舍号。您可以在个人中心随时修改该信息"
            title-size="medium"
        />
        <view class="w-full flex flex-col gap-y-3">
            <cus-select
                field-name="宿舍楼"
                :value="selectedDormitory"
                :range="dormitories"
                @change="onDormitoryChange"
            />
            <cus-input
                field-name="宿舍号（X0XX）"
                ref="roomNumberInputRef"
                :value="roomNumber"
                @input="onRoomNumberChange"
            />
        </view>
        <cus-button
            class="mt-6"
            :variant="isBinding ? 'loading' : 'primary'"
            @click="bindDormitory"
        >
            绑定
        </cus-button>
    </view>
</template>
