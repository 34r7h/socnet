import { createPinia } from 'pinia';
import { createApp } from 'vue';
import './index.scss';
import App from './App.vue';
import router from './routes.js';
import { useMainStore } from './store.js';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

// Make $state and $api globally available
app.config.globalProperties.$state = useMainStore();  // Make store available
app.use(router).mount('#app');