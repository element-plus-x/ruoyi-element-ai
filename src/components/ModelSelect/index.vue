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
    modelStore.modelList.length > 0
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
  popoverRef.value.hide();
}
</script>

<template>
  <div class="model-switch">
    <Popover
      ref="popoverRef"
      position="top-start"
      :offset="[-14, 14]"
      :trigger-style="{ cursor: 'pointer' }"
      popover-class="popover-content"
      :popover-style="popoverStyle"
      @show="showPopover"
    >
      <!-- 触发元素插槽 -->
      <template #trigger>
        <div
          class="model-switch-box select-none flex items-center gap-4px px-10px py-8px rounded-15px cursor-pointer font-size-12px"
        >
          <div class="model-switch-box-icon">
            <SvgIcon name="models" size="12" />
          </div>
          <div class="model-switch-box-text font-size-12px">
            {{ currentModelName }}
          </div>
        </div>
      </template>

      <div class="popover-content-box">
        <div v-for="item in popoverList" :key="item.id" class="popover-content-box-items h-full">
          <el-tooltip
            popper-class="rounded-tooltip"
            effect="dark"
            placement="right"
            trigger="hover"
            :offset="10"
            :show-arrow="false"
          >
            <template #content>
              <div class="popover-content-box-item-text text-wrap max-w-200px rounded-lg">
                {{ item.remark }}
              </div>
            </template>
            <div
              class="popover-content-box-item select-none transition-all transition-duration-300 flex items-center h-full gap-8px p-8px pl-10px pr-12px rounded-lg hover:cursor-pointer hover:bg-[rgba(0,0,0,.04)]"
              :class="{ 'bg-[rgba(0,0,0,.04)] is-select': item.modelName === currentModelName }"
              @click="handleClick(item)"
            >
              <div
                class="popover-content-box-item-text font-size-12px text-overflow max-h-120px line-height-snug"
              >
                {{ item.modelName }}
              </div>
            </div>
          </el-tooltip>
        </div>
      </div>
    </Popover>
  </div>
</template>

<style scoped lang="scss">
.model-switch-box {
  color: var(--el-color-primary, #409eff);
  border: 1px solid var(--el-color-primary, #409eff);
  border-radius: 15px;
}

.popover-content-box-item.is-select {
  color: var(--el-color-primary, #409eff);
  font-weight: 700;
}
</style>
