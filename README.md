# ruoyi-element-ai

<div align="center">

  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/element-plus-x/ruoyi-element-ai/blob/main/LICENSE)&emsp;[![Vue 3.5](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js)](https://vuejs.org/)&emsp;[![Vite 5](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)&emsp;[![TypeScript 5.8](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)&emsp;[![GitHub Stars](https://img.shields.io/github/stars/element-plus-x/ruoyi-element-ai?style=social)](https://github.com/element-plus-x/ruoyi-element-ai)&emsp;

</div>

<div align="center">
<img src="https://cdn.element-plus-x.com/chat/1.webp" />
</div>

## 🚀 项目亮点

**ruoyi-element-ai** 是基于 **Vue3.5** + **Element-Plus-X** + **hook-fetch** + **TypeScript** + **Eslint9** 开发的企业级AI应用模板，搭配 **ruoyi-ai** 后端，快速构建仿豆包/通义的全栈AI项目。

## 💡 核心优势
- 最新技术栈：Vue3.5+/Vite6/Pinia3/TypeScript5
- 流式交互：Hook-Fetch支持Server-Sent Events，插件化写法优雅的一批
- 企业级规范：ESLint/Stylelint/husky/commitlint全链路校验
- 全栈项目：集成 ruoyi-ai 后端服务，快速开发
- 开箱即用：内置动态路由、状态管理、组件库封装、hooks封装

## 🎯 开发文档

帮助你快速熟悉项目

<div align="center">
<img src="https://cdn.element-plus-x.com/chat/docs1.webp" />
</div>

## 🔗 关键链接

| 功能模块         | 说明                          | 链接                                                                 |
|------------------|-------------------------------|----------------------------------------------------------------------|
| 🚀 前端仓库 | Gitee/GitHub 代码仓库(感谢 star🥰爱你爱你😘) | [Gitee](https://gitee.com/he-jiayue/ruoyi-element-ai) <br> [GitHub](https://github.com/element-plus-x/ruoyi-element-ai) |
| 🛠️ 后端仓库 | Java服务，功能丰富强大      |   [Gitee](https://gitee.com/ageerle/ruoyi-ai) <br> [GitHub](https://github.com/ageerle/ruoyi-ai)    |
| 📚 前端文档 | 开发指南/项目说明              | [快速了解项目](https://chat-docs.element-plus-x.com)       |
| 📡 在线演示 | 实时交互体验                    | [在线预览](https://chat.element-plus-x.com)                          |

## 🧰 核心功能

- 使用 Vue3.5+ 各种新特性的支持，让开发更有效率
- 采用 Vite6.3+ 作为项目开发、打包工具
- 使用 Pinia3.0+ 作为全局状态管理库，轻量、优雅、易用，集成 Pinia 持久化插件
- 使用 TypeScript5.8+ 增强项目的代码规范和可读性
- 使用 Unocss 预设样式，更快书写简单的样式
- 弃用 Axios (不支持流式请求) 改用 Hook-Fetch (支持流模式，插件化封装，写法极度优雅) 进行全局的请求封装
- 使用 VueRouter 配置动态路由权限拦截、路由懒加载
- 使用 KeepAlive 对页面进行缓存
- 封装了一些好用的组件和Hooks，增强用户交互体验
- 使用   ESLint9+、Stylelint16+ 代码校验规范、同时统一保存格式化代码
- 使用 husky、lint-staged、commitlint、cz-git 规范提交信息

## 📦 安装与运行

```bash
# 克隆项目
# Gitee
git clone https://gitee.com/he-jiayue/ruoyi-element-ai.git
# GitHub
git clone https://github.com/element-plus-x/ruoyi-element-ai.git
cd ruoyi-element-ai

# 安装依赖（推荐pnpm 避免幻影依赖）
pnpm install

# 开发模式
pnpm run dev

# 生产构建
pnpm build

# 代码校验
pnpm lint          # ESLint检测
pnpm lint:stylelint # 样式格式化
pnpm cz            # 规范提交（自动执行lint）
```

开发模式配置远程服务器地址:

根目录下新建 `.env.development.local` 文件

```bash
VITE_API_URL = xxxxxxxxxxxxxxxxxxxxx
```

## 🪼 项目发版

项目使用 `release-it` 进行发版

默认更新次版本号，如果想每次更新修订号，可执行 pnpm release patch

```bash
# 更新主版本号
 pnpm release major

 # 更新次版本号
 pnpm release minor

 # 更新修订号
 pnpm release patch
```

## 🧸 即将推出 （含 ruoyi-ai 接口联调）
- [x] 会话管理
- [x] 发送消息
- [x] 登录注册
- [ ] md 渲染
- [ ] 编辑输入框
- [ ] 文件上传
- [ ] 其他...

## 🤝 社区支持
| 👨‍👨‍👧‍👦 微信交流群                          | 💩 作者微信                          |
|---------------------------------------|-------------------------------------|
| <img src="https://cdn.element-plus-x.com/vx-2025-06-23.png" alt="微信交流群" width="230px" height="300px" ><br>扫码加入交流群<br>获取最新动态与技术支持 | <img src="https://cdn.element-plus-x.com/vx.png" alt="作者vx" width="230px" height="300px" ><br>群过期或失效？<br>扫码添加作者微信 |

## 🌹 赠人玫瑰，手有余香
<div align="center">
<p>😍开源是热爱的坚持，您的每一份心意都让我们走得更远～😍</p>
<img src="https://cdn.element-plus-x.com/zs1.webp" alt="赞赏" width="230px" height="100%" />
<h3 style="color: #fa8c16; margin-bottom: 10px;">🙊扫码赞赏，感谢您的支持！🙊</h3>
<p style="color: #666; margin: 15px 0;">💖感谢每一份温暖助力💖</p>
<p style="color: #666; margin: 15px 0;">💌 后续将截图保留，并公示赞赏记录 💌</p>
</div>
</div>
