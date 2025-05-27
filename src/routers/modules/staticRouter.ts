import type { RouteRecordRaw } from 'vue-router';
import { HOME_URL } from '@/config';

// LayoutRouter[布局路由]
export const layoutRouter: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: HOME_URL,
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: HOME_URL,
        name: 'chat',
        component: () => import('@/pages/chat/index.vue'),
        meta: {
          title: '通用聊天页面',
          isDefaultChat: true,
          icon: 'HomeFilled',
          isHide: '1',
          isKeepAlive: '0', // 是否缓存路由数据[0是，1否]
          isFull: '1', // 是否缓存全屏[0是，1否]
          // enName: "Master Station", // 英文名称 预留
        },
      },
      {
        path: '/chat/:id',
        name: 'chatWithId',
        component: () => import('@/pages/chat/index.vue'),
        meta: {
          title: '带 ID 的聊天页面',
          isDefaultChat: false,
        },
      },
    ],
  },
];

// staticRouter[静态路由] 预留
export const staticRouter: RouteRecordRaw[] = [];

// errorRouter (错误页面路由)
export const errorRouter = [
  {
    path: '/403',
    name: '403',
    component: () => import('@/pages/error/403.vue'),
    meta: {
      title: '403页面',
      enName: '403 Page', // 英文名称
      icon: 'QuestionFilled', // 菜单图标
      isHide: '1', // 代表路由在菜单中是否隐藏，是否隐藏[0隐藏，1显示]
      isLink: '1', // 是否外链[有值则是外链]
      isKeepAlive: '0', // 是否缓存路由数据[0是，1否]
      isFull: '1', // 是否缓存全屏[0是，1否]
      isAffix: '1', // 是否缓存固定路由[0是，1否]
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/error/404.vue'),
    meta: {
      title: '404页面',
      enName: '404 Page', // 英文名称
      icon: 'CircleCloseFilled', // 菜单图标
      isHide: '1', // 代表路由在菜单中是否隐藏，是否隐藏[0隐藏，1显示]
      isLink: '1', // 是否外链[有值则是外链]
      isKeepAlive: '0', // 是否缓存路由数据[0是，1否]
      isFull: '1', // 是否缓存全屏[0是，1否]
      isAffix: '1', // 是否缓存固定路由[0是，1否]
    },
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/pages/error/500.vue'),
    meta: {
      title: '500页面',
      enName: '500 Page', // 英文名称
      icon: 'WarningFilled', // 图标
      isHide: '1', // 代表路由在菜单中是否隐藏，是否隐藏[0隐藏，1显示]
      isLink: '1', // 是否外链[有值则是外链]
      isKeepAlive: '0', // 是否缓存路由数据[0是，1否]
      isFull: '1', // 是否缓存全屏[0是，1否]
      isAffix: '1', // 是否缓存固定路由[0是，1否]
    },
  },
  // 找不到path将跳转404页面
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/error/404.vue'),
  },
];
