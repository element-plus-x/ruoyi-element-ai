import type { MomentInput } from 'moment';
import moment from 'moment';

/**
 * 数据处理工具汇总
 * formatDate 日期格式化
 */

/**
 * 日期格式化字符串形式
 * @param date 日期输入（支持时间戳、日期字符串、Date 对象或 Moment 对象）
 * @param format 模式，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化时间字符串，若输入无效则返回空字符串
 */
export function formatDate(
  date: MomentInput | null | undefined,
  format: string = 'YYYY-MM-DD HH:mm:ss',
): string {
  if (!date) {
    return '';
  }

  const momentDate = moment(date);
  if (!momentDate.isValid()) {
    console.warn('Invalid date input:', date);
    return '';
  }

  return momentDate.format(format);
}
