<script setup lang="ts">
	// components
	import cusPage from '@/components/cus-page.vue';
	import scheduleFooter from './_components/schedule-footer.vue';
	import scheduleTable from './_components/schedule-table.vue'

	
</script>

<template>
	<cus-page header-type="nav" padding-x="16">
		<view class="flex-1 overflow-auto">
			<schedule-table></schedule-table>
		</view>
		<schedule-footer />
	</cus-page>
</template>