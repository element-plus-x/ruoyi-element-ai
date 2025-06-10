import type { MaybeRef } from 'vue';
import { onBeforeUnmount, ref, unref, watch } from 'vue';
import { COLLAPSE_THRESHOLD, SIDE_BAR_WIDTH } from '@/config/index';
import { useDesignStore } from '@/stores';

/**
 *
 * @description 这里逻辑是研究豆包的折叠逻辑后，设计的折叠方法
 * @description 基于ResizeObserver的窗口宽度监听hooks（高性能实时监控）
 * @param threshold 宽度阈值（默认600px，支持响应式）
 * @param onChange 自定义回调（传入则覆盖默认逻辑，参数：当前视口宽度是否超过阈值）
 *
 * @template  使用示例
 * 1. 基础使用（保留默认折叠逻辑）
 * ```vue
 * <script setup lang="ts">
 *  import { useWindowWidthObserver } from '@/hooks/useWindowWidthObserver';
 *  // 使用默认阈值600px，自动修改全局折叠状态
 *  useWindowWidthObserver();
 * </script>
 * ```
 * 2. 自定义阈值（例如 768px）
 * ```vue
 * <script setup lang="ts">
 *  import { useWindowWidthObserver } from '@/hooks/useWindowWidthObserver';
 *  // 自定义阈值768px，仍使用默认折叠逻辑
 *  useWindowWidthObserver(768);
 * </script>
 * ```
 * 3. 自定义回调（覆盖默认逻辑）
 * ```vue
 * <script setup lang="ts">
 *  import { useWindowWidthObserver } from '@/hooks/useWindowWidthObserver';
 *  // 传入自定义回调，例如控制其他组件显隐
 *  const { unmount, isAboveThreshold } = useWindowWidthObserver(992, (isAbove) => {
 *    console.log(`当前窗口是否大于992px：${isAbove}`);
 *    // 可在此处执行任意自定义逻辑（如修改其他状态、控制组件等）
 *  });
 * </script>
 * ```
 * 4. 响应式阈值（动态调整阈值）
 * ```vue
 * <script setup lang="ts">
 *   import { ref } from 'vue';
 *   import { useWindowWidthObserver } from '@/hooks/useWindowWidthObserver';
 *  // 动态阈值（例如根据路由参数变化）
 *  const dynamicThreshold = ref(600);
 *
 *   // 监听阈值变化，自动触发逻辑更新
 *  useWindowWidthObserver(dynamicThreshold, (isAbove) => {
 *     console.log(`当前阈值${dynamicThreshold.value}，是否超过：${isAbove}`);
 *   });
 *
 *   // 模拟阈值变化（实际场景中可能由用户操作或路由变化触发）
 *   setTimeout(() => {
 *     dynamicThreshold.value = 768;
 *   }, 3000);
 * </script>
 * ```
 */
export function useWindowWidthObserver(
  threshold: MaybeRef<number> = COLLAPSE_THRESHOLD,
  onChange?: (isAboveThreshold: boolean) => void,
) {
  const designStore = useDesignStore();
  const currentWidth = ref(window.innerWidth);
  const isAboveThreshold = ref(false);
  const thresholdRef = ref(threshold);
  let prevIsAbove = false; // 记录上一次状态，避免重复触发

  // 默认逻辑：修改全局折叠状态
  const updateCollapseState = (isAbove: boolean) => {
    // 判断当前的折叠状态
    switch (designStore.collapseType) {
      case 'alwaysCollapsed':
        designStore.setCollapse(true);
        break;
      case 'followSystem':
        designStore.setCollapse(!isAbove);
        break;
      case 'alwaysExpanded':
        designStore.setCollapse(false);
        if (isAbove) {
          // 大于的时候执行关闭动画 (豆包是有的，第一版本暂未添加)
          console.log('执行关闭动画');
        }
        else {
          // 小于的时候执行打开动画 (豆包是有的，第一版本暂未添加)
          console.log('小于的时候执行打开动画');
        }
        break;
      case 'narrowExpandWideCollapse':
        designStore.setCollapse(isAbove);
    }
    // console.log('最终的折叠状态：', designStore.isCollapse);

    if (!designStore.isCollapse) {
      document.documentElement.style.setProperty(
        `--sidebar-left-container-default-width`,
        `${SIDE_BAR_WIDTH}px`,
      );
    }
    else {
      document.documentElement.style.setProperty(`--sidebar-left-container-default-width`, ``);
    }
  };

  // 初始化状态计算
  const updateState = () => {
    const thresholdVal = unref(threshold);
    const current = unref(currentWidth);
    const newIsAbove = current > thresholdVal; // 正确比较两个 number 类型

    if (newIsAbove !== prevIsAbove) {
      isAboveThreshold.value = newIsAbove;
      prevIsAbove = newIsAbove;

      // 触发用户回调或默认逻辑
      if (onChange) {
        onChange(newIsAbove);
      }
      else {
        updateCollapseState(newIsAbove);
      }
    }
  };

  // 创建ResizeObserver监听根元素宽度（直接反映视口宽度）
  const observer = new ResizeObserver(([entry]) => {
    currentWidth.value = entry.contentRect.width; // 实时获取最新宽度
    updateState(); // 立即更新状态并触发逻辑
  });

  // 监听根元素（HTML元素）的尺寸变化
  observer.observe(document.documentElement);

  // 监听阈值变化（支持响应式阈值）
  watch(thresholdRef, () => {
    updateState(); // 阈值变化时重新计算状态
  });

  // 卸载监听的方法
  const unmount = () => {
    observer.disconnect();
  };

  // 组件卸载时自动清理
  onBeforeUnmount(unmount);

  return {
    unmount,
    currentWidth, // 实时当前宽度（Ref）
    isAboveThreshold, // 当前是否超过阈值（Ref）
  };
}
