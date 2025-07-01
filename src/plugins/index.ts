import type { App, Plugin } from 'vue';

interface PluginModule { default: Plugin }

const modules = import.meta.glob<PluginModule>('./modules/*.ts', { eager: true });

export function registerPlugins(app: App) {
  Object.values(modules).forEach((module) => {
    if (typeof module.default === 'object' && module.default && typeof module.default.install === 'function') {
      app.use(module.default);
    }
    else if (typeof module.default === 'function') {
      app.use(module.default);
    }
    else {
      console.warn('插件模块无效:', module);
    }
  });
}
