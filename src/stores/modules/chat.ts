import type { ChatMessageVo } from '@/api/chat/types';
import { defineStore } from 'pinia';
import { getChatList } from '@/api/chat';
import { useUserStore } from './user';

export const useChatStore = defineStore('chat', () => {
  const userStore = useUserStore();

  const chatMap = ref<Record<number, ChatMessageVo[]>>({});

  const setChatMap = (id: number, data: ChatMessageVo[]) => {
    chatMap.value[id] = data;
  };

  const requestChatList = async (sessionId: number) => {
    // 如果没有 token 则不查询聊天记录
    if (!userStore.token)
      return;
    try {
      const res = await getChatList({
        sessionId,
        userId: userStore.userInfo?.userId as number,
      });
      if (res.rows) {
        setChatMap(sessionId, res.rows);
      }
    }
    catch (error) {
      console.error('getChatList:', error);
    }
  };

  // 是否开启深度思考
  const isDeepThinking = ref<boolean>(false);

  const setDeepThinking = (value: boolean) => {
    isDeepThinking.value = value;
  };

  return {
    chatMap,
    requestChatList,
    isDeepThinking,
    setDeepThinking,
  };
});
