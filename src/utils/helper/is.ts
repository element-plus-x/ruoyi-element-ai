/*
 * 数据类型检测工具汇总
 * * * @function isArray: 检测给定的值是否为数组
 * * * @function isObject: 检测给定的值是否为对象（注意：在JavaScript中，数组和null也会被认为是对象）
 * * * @function isString: 检测给定的值是否为字符串
 * * * @function isNumber: 检测给定的值是否为数字
 * * * @function isFunction: 检测给定的值是否为函数（包括异步函数）
 * * * @function isAsyncFunction: 检测给定的值是否为异步函数
 * * * @function isRegExp: 检测给定的值是否为正则表达式对象
 * * * @function isDef: 检测给定的值是否已定义（即不是undefined）
 * * * @function isUnDef: 检测给定的值是否未定义（即为undefined）
 * * * @function isNull: 检测给定的值是否为null
 */

type DataType = 'Array' | 'Object' | 'String' | 'Number' | 'Function' | 'AsyncFunction' | 'RegExp' | 'Undefined' | 'Null';

export function dataTypeCheck<T extends DataType>(value: unknown, type: T): value is T extends 'Array' ? unknown[] : T extends 'Object' ? object : T extends 'String' ? string : T extends 'Number' ? number : T extends 'Function' ? (...args: any[]) => any : T extends 'AsyncFunction' ? (...args: any[]) => Promise<any> : T extends 'RegExp' ? RegExp : T extends 'Undefined' ? undefined : T extends 'Null' ? null : never {
  return Object.prototype.toString.call(value) === `[object ${type}]`;
}

export function isArray(value: unknown): value is unknown[] {
  return dataTypeCheck(value, 'Array');
}

export function isObject(value: unknown): value is object {
  return dataTypeCheck(value, 'Object');
}

export function isString(value: unknown): value is string {
  return dataTypeCheck(value, 'String');
}

export function isNumber(value: unknown): value is number {
  return dataTypeCheck(value, 'Number');
}

export function isFunction(value: unknown): value is (...args: any[]) => any {
  return dataTypeCheck(value, 'Function') || isAsyncFunction(value);
}

export function isAsyncFunction(value: unknown): value is (...args: any[]) => Promise<any> {
  return dataTypeCheck(value, 'AsyncFunction');
}

export function isRegExp(value: unknown): value is RegExp {
  return dataTypeCheck(value, 'RegExp');
}

export function isDef<T>(value: T): value is NonNullable<T> {
  return !dataTypeCheck(value, 'Undefined');
}

export function isUnDef(value: unknown): value is undefined {
  return !isDef(value);
}

export function isNull(value: unknown): value is null {
  return dataTypeCheck(value, 'Null');
}
