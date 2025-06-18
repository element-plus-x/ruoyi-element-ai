import { ElMessage } from 'element-plus';
import { createApp } from 'vue';
import ElementPlusX from 'vue-element-plus-x';
import App from './App.vue';
import { registerPlugins } from './plugins';
import router from './routers';
import store from './stores';
import './styles/index.scss';
import 'virtual:uno.css';
import 'element-plus/dist/index.css';
// SVG插件配置
import 'virtual:svg-icons-register';

const app = createApp(App);

// 插件安装
registerPlugins(app);

app.use(router);
app.use(ElMessage);
app.use(ElementPlusX);

app.use(store);

app.mount('#app');
