<script setup lang="ts">
import { ref, onMounted } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import spinner from '@/components/spinner.vue';
import cusButton from '@/components/cus-button.vue';
import cusInput from '@/components/cus-input.vue';
import easyNoteCard from '../(Main)/study/easy-note/_components/easy-note-card.vue';
// apis
import { getNoteList, createNote } from '@/api/easy-note';
// 爬虫测试
import LinkOfficial from '@/utils/link-official';
// linker 加密和解密测试
// import { encryptLinker, rsaDecrypt } from '@/utils/encrypter';


const captchaBase64 = ref<string>('');
const authCode = ref<string>('');
const dataObj = ref();

// onMounted(async () => {
//     const data = await LinkOfficial.getSignInSessionAndAuthCode();
//     if (data) {
//         captchaBase64.value = "data:image/png;base64," + data.authCodeImg;
//         dataObj.value = data.dataObj;
//     }
// })

const signInToOfficial = async () => {
    await LinkOfficial.signInToOfficial(
        "2021050919079",
        "281733",
        authCode.value,
        dataObj.value,
    )
}

const getSchedules = async () => {
    const schedule = await LinkOfficial.getSchedules();
    console.log(schedule);
}

const getStudentInfo = async () => {
    const studentInfo = await LinkOfficial.getStudentInfo();
    console.log(studentInfo);
}


const createEasyNote = async () => {
    const res = await createNote({
        title: "测试",
        content: "测试",
        imagesUrl: [],
        deadline: "2024-7-15 00:04:46",
        courseName: "测试",
        tagIds: [1],
    });

    console.log(res);
};


// const testRSA = () => {
//     const data = "281733";
//     const encrypted = encryptLinker(data);
//     console.log("加密后：" + encrypted);
//     const decrypted = rsaDecrypt(encrypted);
//     console.log("解密后：" + decrypted);
// }


const testWebSocket = () => {
    uni.connectSocket({
        url: "wss://localhost:3000",
        header: {
            'content-type': 'application/json'
        },
        success: (res) => {
            console.log(res);
            
            console.log("连接成功");
        },

    })
}
</script>

<template>
    <cus-page header-type="nav" padding-x="16">
        <cus-button class-name="flex items-center gap-2">
            <spinner size="small" color="white" />
            测试
        </cus-button>

        <easy-note-card 
            :card="{
                id: 1,
                openid: '1',
                title: '下节课要带的资料',
                content: '资料',
                imagesUrl: [],
                deadline: '2024-7-15 00:04',
                courseName: '文化人类学',
                tagList: [{
                    id: 1,
                    tagName: '重要',
                    noteId: 1,
                    isDelete: 0,
                    createdTime: '2024-7-15 00:04',
                    updatedTime: '2024-7-15 00:04',
                }],
                username: 'Puggo',
                seeNumber: 0,
                supportNumber: 0,
            }"
        />
        
        <!-- <view class="mt-4">
            <text class="mb-2 text-xl font-bold">登录到校园门户</text>
            <view class="flex flex-col">
                <image :src="captchaBase64" class="w-[100px] h-[30px] object-cover" />
                <cus-input @input="event => authCode = event.value" />
                <cus-button @click="signInToOfficial">提交登录</cus-button>
            </view>
        </view> -->

        <!-- <view class="mt-4">
            <text class="mb-2 text-xl font-bold">教务系统</text>
            <view class="flex flex-col">
                <cus-button @click="getSchedules">
                    同步课表
                </cus-button>
                <cus-button class-name="mt-4" @click="getStudentInfo">
                    获取学生信息
                </cus-button>
            </view>
        </view> -->
        
        <!-- <view class="mt-4">
            <text class="mb-2 text-xl font-bold">小记</text>
            <view class="flex flex-col">
                <cus-button @click="() => getNoteList({current: 1, pageSize: 10})">
                    获取小记
                </cus-button>
                <cus-button class-name="mt-4" @click="createEasyNote">
                    创建小记
                </cus-button>
            </view>
        </view> -->

        <!-- <view class="mt-4">
            <cus-button @click="testRSA">
                测试RSA
            </cus-button>
        </view> -->
        
        <!-- <view class="mt-4">
            <cus-button @click="testWebSocket">
                测试 websocket
            </cus-button>
        </view> -->
    </cus-page>
</template>
