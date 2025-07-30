<!-- 切换模型 -->
<script setup lang="ts">
import type { GetSessionListVO } from '@/api/model/types';
import Popover from '@/components/Popover/index.vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
import { useModelStore } from '@/stores/modules/model';

const modelStore = useModelStore();

onMounted(async () => {
  await modelStore.requestModelList();
  // 设置默认模型
  if (
    modelStore.modelList?.length > 0
    && (!modelStore.currentModelInfo || !modelStore.currentModelInfo.modelName)
  ) {
    modelStore.setCurrentModelInfo(modelStore.modelList[0]);
  }
});

const currentModelName = computed(
  () => modelStore.currentModelInfo && modelStore.currentModelInfo.modelName,
);
const popoverList = computed(() => modelStore.modelList);

/* 弹出面板 开始 */
const popoverStyle = ref({
  width: '200px',
  padding: '4px',
  height: 'fit-content',
  background: 'var(--el-bg-color, #fff)',
  border: '1px solid var(--el-border-color-light)',
  borderRadius: '8px',
  boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
});
const popoverRef = ref();

// 显示
async function showPopover() {
  // 获取最新的模型列表
  await modelStore.requestModelList();
}

// 点击
function handleClick(item: GetSessionListVO) {
  modelStore.setCurrentModelInfo(item);
  popoverRef.value?.hide?.();
}
</script>

<template>
  <div class="model-select">
    <Popover
      ref="popoverRef"
      placement="top-start"
      :offset="[4, 0]"
      popover-class="popover-content"
      :popover-style="popoverStyle"
      trigger="clickTarget"
      @show="showPopover"
    >
      <!-- 触发元素插槽 -->
      <template #trigger>
        <div
          class="model-select-box select-none flex items-center gap-4px p-10px rounded-10px cursor-pointer font-size-12px border-[rgba()]"
        >
          <div class="model-select-box-icon">
            <SvgIcon name="models" size="12" />
          </div>
          <div class="model-select-box-text font-size-12px">
            {{ currentModelName }}
          </div>
        </div>
      </template>

      <div class="popover-content-box">
        <div
          v-for="item in popoverList"
          :key="item.id"
          class="popover-content-box-items w-full rounded-8px select-none transition-all transition-duration-300 flex items-center hover:cursor-pointer hover:bg-[rgba(0,0,0,.04)]"
        >
          <Popover
            trigger-class="popover-trigger-item-text"
            popover-class="rounded-tooltip"
            placement="right"
            trigger="hover"
            :offset="[12, 0]"
          >
            <template #trigger>
              <div
                class="popover-content-box-item p-4px font-size-12px text-overflow line-height-16px"
                :class="{ 'bg-[rgba(0,0,0,.04)] is-select': item.modelName === currentModelName }"
                @click="handleClick(item)"
              >
                {{ item.modelName }}
              </div>
            </template>
            <div
              class="popover-content-box-item-text text-wrap max-w-200px rounded-lg p-8px font-size-12px line-height-tight"
            >
              {{ item.remark }}
            </div>
          </Popover>
        </div>
      </div>
    </Popover>
  </div>
</template>

<style scoped lang="scss">
.model-select-box {
  color: var(--el-color-primary, #409eff);
  background: var(--el-color-primary-light-9, rgb(235.9 245.3 255));
  border: 1px solid var(--el-color-primary, #409eff);
  border-radius: 10px;
}
.popover-content-box-item.is-select {
  font-weight: 700;
  color: var(--el-color-primary, #409eff);
}
.popover-content-box {
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 200px;
  overflow: hidden auto;
  .popover-content-box-items {
    :deep() {
      .popover-trigger-item-text {
        width: 100%;
      }
    }
  }
  .popover-content-box-item-text {
    color: white;
    background-color: black;
  }

  // 滚动条样式
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    background: #cccccc;
    border-radius: 4px;
  }
}
</style>
