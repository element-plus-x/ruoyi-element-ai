import { ref } from 'vue';

type TimeGreeting = '凌晨' | '清晨' | '早上' | '中午' | '下午' | '傍晚' | '晚上';

// 时间分段配置（按顺序排列，find会返回第一个匹配项）
const timeRanges: Array<[start: number, end: number, label: TimeGreeting]> = [
  [0, 5, '凌晨'],
  [5, 7, '清晨'],
  [7, 12, '早上'],
  [12, 14, '中午'],
  [14, 18, '下午'],
  [18, 21, '傍晚'],
  [21, 24, '晚上'],
];

/**
 * 获取当前时段的问候语（Vue 组合式函数）
 *
 * @description
 * 根据当前小时自动判断并返回适合的问候语（如“早上好”、“下午好”等）。
 * 通常用于首页、欢迎面板等人性化展示场景。
 *
 * @example 使用示例
 * ```vue
 * <script setup lang="ts">
 *  import { useTimeGreeting } from '@/hooks/useTimeGreeting';
 *
 *  const timeGreeting = useTimeGreeting();
 * </script>
 *
 * <template>
 *   <div>{{ timeGreeting }}好，欢迎~</div>
 * </template>
 * ```
 */
export function useTimeGreeting() {
  // 直接计算初始值（合并初始化逻辑）
  const currentHour = new Date().getHours();
  const greeting = timeRanges.find(([s, e]) => currentHour >= s && currentHour < e)?.[2] || '晚上';

  // 使用ref保持响应式（即使不更新，组件仍可正确绑定）
  return ref<TimeGreeting>(greeting);
}
