import type { ComponentInternalInstance } from 'vue';
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface Utils {
  $is: {
    [key: string]: (...args: any[]) => boolean;
  };
  $dataHelpers: {
    [key: string]: (...args: any[]) => any;
  };
  $common: {
    [key: string]: (...args: any[]) => any;
  };
}

interface UseCurrentInstanceReturn {
  currentInstance: ComponentInternalInstance;
  proxy: ComponentInternalInstance['proxy'] & Utils;
  router: Router;
  route: RouteLocationNormalizedLoaded;
  $is: Utils['$is'];
  $dataHelpers: Utils['$dataHelpers'];
  $common: Utils['$common'];
}

export function useCurrentInstance(): UseCurrentInstanceReturn {
  const router = useRouter();
  const route = useRoute();

  const currentInstance = getCurrentInstance();

  if (!currentInstance) {
    throw new Error('useCurrentInstance必须在setup函数中调用💘');
  }

  const { proxy } = currentInstance as ComponentInternalInstance & { proxy: Utils };

  const $is = proxy.$is;
  const $dataHelpers = proxy.$dataHelpers;
  const $common = proxy.$common;

  return {
    currentInstance,
    proxy,
    router,
    route,
    $is,
    $dataHelpers,
    $common,
  };
}
