// 引入ElementPlus所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { createApp } from 'vue';
// import ElementPlusX from 'vue-element-plus-x';
import App from './App.vue';
import router from './routers';
import store from './stores';
import './styles/index.scss';
import 'virtual:uno.css';
import 'element-plus/dist/index.css';
// SVG插件配置
import 'virtual:svg-icons-register';

const app = createApp(App);

app.use(router);
app.use(ElMessage);
// app.use(ElementPlusX);
// 注册ElementPlus所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(store);

app.mount('#app');
