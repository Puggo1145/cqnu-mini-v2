<script setup lang="ts">
import { ref, onMounted } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
// linkOfficial
import { getAcademicDetails } from '@/utils/link-official';


const obligatoryCourses = ref();
onMounted(async () => {
    const data = await getAcademicDetails("obligatories");
    obligatoryCourses.value = data;
    console.log(data);
    
});

</script>

<template>
    <cus-page header-type="nav" paddingx="16">
        <text>学生学业情况</text>
    </cus-page>
</template>
