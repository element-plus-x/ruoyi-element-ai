<!-- 默认消息列表页 -->
<script setup lang="ts">
import WelecomeText from '@/components/WelecomeText/index.vue';
import { useUserStore } from '@/stores';
import { useChatStore } from '@/stores/modules/chat';
import { useSessionStore } from '@/stores/modules/session';

const userStore = useUserStore();
const chatStore = useChatStore();
const sessionStore = useSessionStore();
const senderValue = ref('');

const isDeepThinking = computed(() => chatStore.isDeepThinking);

async function handleSend() {
  localStorage.setItem('chatContent', senderValue.value);
  await sessionStore.createSessionList({
    userId: userStore.userInfo?.userId as number,
    sessionContent: senderValue.value,
    sessionTitle: senderValue.value.slice(0, 10),
    remark: senderValue.value.slice(0, 10),
  });
}

// 设置是否深度思考
function setIsDeepThinking() {
  chatStore.setDeepThinking(!chatStore.isDeepThinking);
}
</script>

<template>
  <div class="chat-defaul-wrap">
    <WelecomeText />
    <Sender
      v-model="senderValue"
      class="chat-defaul-sender"
      :auto-size="{
        maxRows: 9,
        minRows: 3,
      }"
      variant="updown"
      clearable
      allow-speech
      @submit="handleSend"
    >
      <template #prefix>
        <div class="flex-1 flex items-center gap-8px flex-none w-fit overflow-hidden">
          <div
            class="flex items-center gap-4px px-12px py-8px rounded-15px cursor-pointer font-size-12px border-1px border-gray border-solid hover:bg-[rgba(0,0,0,.04)]"
          >
            <el-icon>
              <Paperclip />
            </el-icon>
          </div>

          <div
            :class="{ 'is-select': isDeepThinking }"
            class="flex items-center gap-4px px-10px py-8px rounded-15px cursor-pointer font-size-12px border-1px border-gray border-solid hover:bg-[rgba(0,0,0,.04)]"
            @click="setIsDeepThinking"
          >
            <el-icon>
              <ElementPlus />
            </el-icon>
            <span>深度思考</span>
          </div>
        </div>
      </template>
    </Sender>
  </div>
</template>

<style scoped lang="scss">
.chat-defaul-wrap {
  position: relative;
  width: 100%;
  max-width: 800px;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .chat-defaul-sender {
    width: 100%;
  }

  .is-select {
    color: var(--el-color-primary, #409eff);
    border: 1px solid var(--el-color-primary, #409eff);
    border-radius: 15px;
  }
}
</style>
