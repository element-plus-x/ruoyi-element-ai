import type { FilesCardProps } from 'vue-element-plus-x/types/FilesCard';
// 对话聊天的文件上传列表
import { defineStore } from 'pinia';

export const useFilesStore = defineStore('files', () => {
  const filesList = ref<FilesCardProps[]>([]);

  // 设置文件列表
  const setFilesList = (list: FilesCardProps[]) => {
    filesList.value = list;
  };

  // 根据索引删除 文件
  const deleteFileByIndex = (index: number) => {
    filesList.value.splice(index, 1);
  };

  return {
    filesList,
    setFilesList,
    deleteFileByIndex,
  };
});
