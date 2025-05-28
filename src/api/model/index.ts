import type { GetSessionListVO } from './types';
import { get } from '@/utils/request';

// 获取当前用户的模型列表
export function getModelList() {
  return get<GetSessionListVO[]>('/system/model/modelList');
}
