<!-- Main -->
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useDesignStore } from '@/stores';
import { useKeepAliveStore } from '@/stores/modules/keepAlive';

const designStore = useDesignStore();
const keepAliveStore = useKeepAliveStore();
const useroute = useRoute();

const transitionName = computed(() => {
  if (useroute.meta.isDefaultChat) {
    return 'slide';
  }
  else {
    return designStore.pageAnimateType;
  }
});

// 刷新当前路由页面缓存方法
const isRouterShow = ref(true);
const refreshMainPage = (val: boolean) => (isRouterShow.value = val);
provide('refresh', refreshMainPage);
</script>

<template>
  <el-main
    class="layout-main"
    :class="{ 'layout-main-overfow-hidden': useroute.meta.isDefaultChat }"
  >
    <router-view v-slot="{ Component, route }">
      <transition :name="transitionName" mode="out-in" appear>
        <keep-alive :max="10" :include="keepAliveStore.keepAliveName">
          <component :is="Component" v-if="isRouterShow" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<style scoped lang="scss">
.layout-main-overfow-hidden {
  overflow: hidden;
}

/* 默认聊天页面：上下滑动动画 */
.slide-enter-from {
  margin-top: 200px;
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s; /* 缓出动画 */
}
.slide-enter-to {
  margin-top: 0;
  opacity: 1;
}
.slide-leave-from {
  margin-top: 0;
  opacity: 1;
}
.slide-leave-to {
  margin-top: 200px;
  opacity: 0;
}

/* 带id聊天页面：中间缩放动画 */
.zoom-fade-enter-from {
  transform: scale(0.8); /* 进入前：缩小隐藏 */
  opacity: 0;
}
.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: all 0.3s; /* 缓入动画 */
}
.zoom-fade-enter-to {
  transform: scale(1); /* 进入后：正常大小 */
  opacity: 1;
}
.zoom-fade-leave-from {
  transform: scale(1); /* 离开前：正常大小 */
  opacity: 1;
}
.zoom-fade-leave-to {
  transform: scale(0.8); /* 离开后：缩小隐藏 */
  opacity: 0;
}
</style>
