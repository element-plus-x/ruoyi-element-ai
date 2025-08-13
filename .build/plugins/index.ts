import type { ConfigEnv, PluginOption } from 'vite';
import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import { visualizer } from 'rollup-plugin-visualizer';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import envTyped from 'vite-plugin-env-typed';
import createSvgIcon from './svg-icon';

const root = path.resolve(__dirname, '../../');

function plugins({ mode, command }: ConfigEnv): PluginOption[] {
  return [
    UnoCSS(),
    envTyped({
      mode,
      envDir: root,
      envPrefix: 'VITE_',
      filePath: path.join(root, 'types', 'import_meta.d.ts'),
    }),
    vue(),
    AutoImport({
      imports: ['vue'],
      eslintrc: {
        enabled: true,
      },
      resolvers: [ElementPlusResolver()],
      dts: path.join(root, 'types', 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: path.join(root, 'types', 'components.d.ts'),
    }),
    createSvgIcon(command === 'build'),
    visualizer({
      open: true,
      // 开启gzip大小计算
      gzipSize: true,
      // 开启brotli大小计算
      brotliSize: true,
    }),
  ];
}

export default plugins;
