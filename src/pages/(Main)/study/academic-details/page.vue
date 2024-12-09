<script setup lang="ts">
import { ref, onMounted } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import detailList from './_components/detail-list.vue';
import noData from '@/components/no-data.vue';
// linkOfficial
import { getAcademicDetails } from '@/utils/link-official';


const currentTab = ref(0);
const tabs = ref([
    { name: "必修课程", key: "obligatories" },
    { name: "选修课程", key: "electives" },
    { name: "通识选修", key: "generalElectives" },
    { name: "其他", key: "others" }
]);

const courseData = ref<Record<string, any>>({
    obligatories: [],
    electives: [],
    generalElectives: [],
    others: []
});

onMounted(async () => {
    uni.showLoading({ title: "加载中" });

    // 并行请求所有数据
    const [obligatories, electives, generalElective, other] = await Promise.all([
        getAcademicDetails("obligatories"),
        getAcademicDetails("electives"),
        getAcademicDetails("generalElectives"),
        getAcademicDetails("others")
    ]);

    courseData.value = {
        obligatories,
        electives,
        generalElective,
        others: other
    };

    uni.hideLoading();
});

function onTabChange(event: any) {
    currentTab.value = event.index;
}
</script>

<template>
    <cus-page header-type="nav">
        <view class="flex-1 flex flex-col">
            <!-- Tab栏 -->
            <up-sticky class="px-4">
                <up-tabs
                    :list="tabs"
                    :current="currentTab"
                    lineWidth="20"
                    lineHeight="3"
                    lineColor="#000"
                    :activeStyle="{
                        color: '#000',
                        fontWeight: 'bold',
                        transform: 'scale(1.05)'
                    }"
                    :inactiveStyle="{
                        color: '#666',
                        transform: 'scale(1)'
                    }"
                    scrollable
                    itemStyle="height: 44px"
                    @click="onTabChange"
                />
            </up-sticky>

            <!-- 内容区域 -->
            <swiper
                class="flex-1"
                :current="currentTab"
                @change="(e: any) => currentTab = e.detail.current"
            >
                <swiper-item
                    v-for="(tab, index) in tabs"
                    :key="index"
                    class="h-full"
                >
                    <scroll-view
                        scroll-y
                        class="h-full px-4"
                    >
                        <detail-list
                            v-if="courseData[tab.key]?.length > 0"
                            :course-details="courseData[tab.key]"
                        />
                        <no-data
                            v-else
                            title="暂无课程"
                            :desc="`暂无${tab.name}信息`"
                            className="pt-24"
                        />
                    </scroll-view>
                </swiper-item>
            </swiper>
        </view>
    </cus-page>
</template>
