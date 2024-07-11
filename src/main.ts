import { createSSRApp } from 'vue';
import { createPinia } from 'pinia';
import uviewPlus from 'uview-plus';

import App from './App.vue';

export function createApp() {
	const app = createSSRApp(App);
	const pinia = createPinia();

	app.use(pinia);
	app.use(uviewPlus);

	return {
		app,
		pinia
	};
}
