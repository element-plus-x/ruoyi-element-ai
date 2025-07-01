import type { App } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const elementPlusIconsPlugin = {
  install(app: App) {
    // 注册所有ElementPlus图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};

export default elementPlusIconsPlugin;
