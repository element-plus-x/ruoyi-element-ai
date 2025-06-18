import type { App, InjectionKey } from 'vue';
import * as common from '../../utils/helper/common';
import * as dataHelpers from '../../utils/helper/dataHelpers';
import * as is from '../../utils/helper/is';

export const COMMON_KEY: InjectionKey<typeof common> = Symbol('$common');
export const IS_KEY: InjectionKey<typeof is> = Symbol('$is');
export const DATA_HELPERS_KEY: InjectionKey<typeof dataHelpers> = Symbol('$dataHelpers');

const utilsPlugin = {
  install(app: App) {
    // common工具
    app.config.globalProperties.$common = common;
    app.provide(COMMON_KEY, common);

    // 类型检测工具
    app.config.globalProperties.$is = is;
    app.provide(IS_KEY, is);

    // 数据处理工具
    app.config.globalProperties.$dataHelpers = dataHelpers;
    app.provide(DATA_HELPERS_KEY, dataHelpers);
  },
};

export default utilsPlugin;
