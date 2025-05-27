<!-- 头像 -->
<script setup lang="ts">
import Popover from '@/components/Popover/index.vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
import { useUserStore } from '@/stores';
import { useSessionStore } from '@/stores/modules/session';

const userStore = useUserStore();
const sessionStore = useSessionStore();
const src = computed(
  () => userStore.userInfo?.avatar ?? 'https://avatars.githubusercontent.com/u/76239030',
);

/* 弹出面板 开始 */
const popoverStyle = ref({
  width: '200px',
  padding: '4px',
  height: 'fit-content',
});
const popoverRef = ref();

// 弹出面板内容
const popoverList = ref([
  {
    key: '1',
    title: '收藏夹',
    icon: 'book-mark-fill',
  },
  {
    key: '2',
    title: '设置',
    icon: 'settings-4-fill',
  },
  {
    key: '3',
    divider: true,
  },
  {
    key: '4',
    title: '退出登录',
    icon: 'logout-box-r-line',
  },
]);

// 点击
function handleClick(item: any) {
  switch (item.key) {
    case '1':
      ElMessage.warning('暂未开放');
      console.log('点击了收藏夹');
      break;
    case '2':
      ElMessage.warning('暂未开放');
      console.log('点击了设置');
      break;
    case '4':
      popoverRef.value.hide();
      ElMessageBox.confirm('退出登录不会丢失任何数据，你仍可以登录此账号。', '确认退出登录？', {
        confirmButtonText: '确认退出',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'el-button--danger',
        cancelButtonClass: 'el-button--info',
        roundButton: true,
        autofocus: false,
      })
        .then(async () => {
          // 在这里执行退出方法
          await userStore.logout();
          // 清空回话列表并回到默认页
          await sessionStore.requestSessionList(1, true);
          await sessionStore.createSessionBtn();
          ElMessage({
            type: 'success',
            message: '退出成功',
          });
        })
        .catch(() => {
          // ElMessage({
          //   type: 'info',
          //   message: '取消',
          // });
        });
      break;
    default:
      break;
  }
}

/* 弹出面板 结束 */
</script>

<template>
  <div class="avatar-container">
    <Popover
      ref="popoverRef"
      position="bottom-end"
      :offset="[-10, 8]"
      :trigger-style="{ cursor: 'pointer' }"
      popover-class="popover-content"
      :popover-style="popoverStyle"
    >
      <!-- 触发元素插槽 -->
      <template #trigger>
        <el-avatar :src="src" :size="28" fit="fit" shape="circle" />
      </template>

      <div class="popover-content-box">
        <div v-for="item in popoverList" :key="item.key" class="popover-content-box-items h-full">
          <div
            v-if="!item.divider"
            class="popover-content-box-item flex items-center h-full gap-8px p-8px pl-10px pr-12px rounded-lg hover:cursor-pointer hover:bg-[rgba(0,0,0,.04)]"
            @click="handleClick(item)"
          >
            <SvgIcon :name="item.icon!" size="16" class-name="flex-none" />
            <div class="popover-content-box-item-text font-size-14px text-overflow max-h-120px">
              {{ item.title }}
            </div>
          </div>

          <div v-if="item.divider" class="divder h-1px bg-gray-200 my-4px" />
        </div>
      </div>
    </Popover>
  </div>
</template>

<style scoped lang="scss">
.popover-content {
  width: 520px;
  height: 520px;
}
</style>
