import { useBreakpoints } from '@vueuse/core';
import { reactive } from 'vue';

export const breakpointsEnum = {
  xl: 1600,
  lg: 1199,
  md: 991,
  sm: 767,
  xs: 575,
};

/**
 * 提供响应式的屏幕尺寸状态管理（useScreenStore）
 *
 * @description
 * 基于 breakpointsEnum 定义的断点，返回是否处于手机、平板、桌面等状态的布尔值。
 * 可用于响应式布局判断、组件显示隐藏逻辑、移动端适配等场景。
 *
 * @example 使用示例
 * ```ts
 * const { isMobile, isDesktop } = useScreenStore();
 * if (isMobile.value) {
 *   执行移动端逻辑
 * }
 * ```
 */
export function useScreenStore() {
  const breakpoints = reactive(useBreakpoints(breakpointsEnum));
  // 手机端
  const isMobile = breakpoints.smaller('sm');
  // pad端
  const isPad = breakpoints.between('sm', 'md');
  // pc端
  const isDesktop = breakpoints.greater('md');
  // 登录页面一
  const isScreen = breakpoints.smaller('lg');
  return {
    breakpoints,
    isMobile,
    isPad,
    isDesktop,
    isScreen,
  };
}
