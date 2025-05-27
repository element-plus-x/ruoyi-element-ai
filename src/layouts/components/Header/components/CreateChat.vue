<!-- 添加新会话按钮 -->
<script setup lang="ts">
import { useSessionStore } from '@/stores/modules/session';

const sessionStore = useSessionStore();

/* 创建会话 开始 */
function handleCreatChat() {
  if (!sessionStore.currentSession)
    return;
  // 创建会话, 跳转到默认聊天
  sessionStore.createSessionBtn();
}
/* 创建会话 结束 */
</script>

<template>
  <div
    class="create-chat-container flex-center flex-none p-6px pl-8px pr-8px c-#0057ff b-#0057ff b-rounded-12px border-1px hover:bg-#0057ff hover:c-#fff hover:b-#fff hover:cursor-pointer border-solid select-none"
    :class="{
      'is-disabled': !sessionStore.currentSession,
    }"
    @click="handleCreatChat"
  >
    <el-icon size="12" class="flex-center flex-none w-14px h-14px">
      <Plus />
    </el-icon>
    <span class="ml-4px font-size-14px font-700">新对话</span>
  </div>
</template>

<style scoped lang="scss">
.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;

  &:hover {
    background-color: transparent;
    color: #0057ff;
    border-color: #0057ff;
    border-style: solid;
    cursor: not-allowed;
    transition: none;
  }
}
</style>
