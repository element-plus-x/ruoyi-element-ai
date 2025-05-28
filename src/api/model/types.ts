// 查询用户模型列表返回的数据结构
export interface GetSessionListVO {
  id?: number;
  category?: string;
  modelName?: string;
  modelDescribe?: string;
  modelPrice?: number;
  modelType?: string;
  modelShow?: string;
  systemPrompt?: string;
  apiHost?: string;
  apiKey?: string;
  remark?: string;
}
