# 校园轻集市

## 1. 项目简介

"校园轻集市"是一个面向高校校园生活场景的 PC 端 Web App，主要支持二手交易、失物招领、拼单搭子、跑腿委托四大功能模块。项目采用 Vue 3 + TypeScript 技术栈，通过 JSON Server 实现 Mock API，模拟完整的用户注册登录、信息发布、收藏、搜索筛选等业务流程。本项目为前端工程化实训课程的过程性产物，重点实践 Pinia 状态管理、组件化开发、AI Coding 协作等工程能力。

## 2. 技术栈

- Vue 3 — 渐进式前端框架（Composition API + `<script setup>`）
- Vite — 构建工具与开发服务器
- TypeScript — 类型安全
- Vue Router — 路由管理
- Pinia — 状态管理
- Axios — HTTP 请求封装
- Element Plus — UI 组件库
- JSON Server — Mock REST API
- ESLint + Oxlint — 代码规范检查

## 3. 核心功能

- 首页与导航 — 服务分类入口、平台公告、热门推荐
- 二手交易列表 — 商品浏览、关键词搜索、分类筛选、收藏
- 失物招领列表 — 信息浏览、关键词搜索、类型筛选（寻物/招领）
- 拼单搭子列表 — 拼单浏览、关键词搜索
- 跑腿委托列表 — 委托浏览、关键词搜索
- 信息发布 — 四种类型表单切换、字段校验、提交到 Mock API
- 用户注册/登录 — Mock 注册（写入 db.json）、登录（查询校验）、退出
- 登录状态持久化 — localStorage 存储 + Pinia 恢复
- 个人中心 — 用户资料、我的收藏、我的发布
- 收藏功能 — 跨页面共享的收藏状态（Pinia）
- 搜索与筛选 — 全列表页关键词搜索 + 分类/类型下拉筛选
- 状态反馈 — 加载态、空态、错误态（含重试）

## 4. 项目运行

### 安装依赖

```bash
pnpm install
```

### 启动 Mock API（终端 1）

```bash
npm run mock
```

JSON Server 启动于 http://localhost:3000，读取 db.json 提供 REST API。

### 启动开发服务器（终端 2）

```bash
npm run dev
```

Vite 开发服务器启动于 http://localhost:5173。

### 预设测试账号

| 用户名 | 密码 | 说明 |
|--------|------|------|
| student | 123456 | 预设演示用户 |

也可通过注册页面自行创建新用户。

## 5. 使用指南

1. 打开首页，浏览服务分类
2. 未登录时导航栏显示「登录」「注册」按钮
3. 使用预设账号登录，或注册新账号
4. 进入二手交易 / 失物招领 / 拼单搭子 / 跑腿委托页面浏览信息
5. 使用搜索框和下拉筛选快速查找内容
6. 点击「发布信息」填写表单并提交
7. 收藏感兴趣的信息，在个人中心查看
8. 个人中心展示用户资料、收藏列表和我的发布
9. 点击「退出登录」清除登录状态

## 6. 项目结构

```
campus-market-2024110209/
├── db.json                   # JSON Server 数据源
├── src/
│   ├── main.ts               # 应用入口
│   ├── App.vue               # 根组件（登录状态恢复）
│   ├── api/                   # API 请求层
│   │   ├── http.ts            #   axios 实例
│   │   ├── user.ts            #   用户注册/查询 API
│   │   ├── trade.ts           #   二手交易 API
│   │   ├── lostFound.ts       #   失物招领 API
│   │   ├── groupBuy.ts        #   拼单搭子 API
│   │   └── errand.ts          #   跑腿委托 API
│   ├── stores/                # Pinia 状态管理
│   │   ├── user.ts            #   用户状态（登录/退出/持久化）
│   │   └── favorite.ts        #   收藏状态
│   ├── router/                # 路由配置
│   │   └── index.ts           #   8 个页面路由
│   ├── views/                 # 页面组件
│   │   ├── HomeView.vue       #   首页
│   │   ├── LoginView.vue      #   登录
│   │   ├── RegisterView.vue   #   注册
│   │   ├── TradeView.vue      #   二手交易
│   │   ├── LostFoundView.vue  #   失物招领
│   │   ├── GroupBuyView.vue   #   拼单搭子
│   │   ├── ErrandView.vue     #   跑腿委托
│   │   ├── PublishView.vue    #   发布信息
│   │   ├── MessageView.vue    #   消息中心
│   │   └── UserCenterView.vue #   个人中心
│   └── components/            # 通用组件
│       ├── AppLayout.vue      #   布局外壳
│       ├── AppHeader.vue      #   导航栏
│       ├── AppNav.vue         #   导航菜单
│       ├── ItemCard.vue       #   信息卡片
│       ├── FormField.vue      #   表单字段
│       ├── SearchBar.vue      #   搜索组件
│       ├── LoadingState.vue   #   加载状态
│       ├── EmptyState.vue     #   空状态
│       └── ErrorState.vue     #   错误状态
├── docs/evidence/             # 每日证据卡
└── package.json
```

## 7. 各日功能概览

| Day | 主题 | 核心产出 |
|-----|------|---------|
| Day1 | 项目初始化与开发环境搭建 | Vite + Vue 3 项目脚手架、路由配置、AppLayout 布局 |
| Day2 | 导航系统与首页 | AppNav 导航菜单、HomeView 首页（分类卡片 + 公告 + 热门推荐）|
| Day3 | 业务列表页 | TradeView / LostFoundView / GroupBuyView / ErrandView 四个列表页 + ItemCard 组件 |
| Day4 | 发布表单与数据新增 | PublishView 四种类型发布表单 + FormField 组件 + create API |
| Day5 | Pinia 状态管理与个人中心 | userStore、favoriteStore、UserCenterView（资料 + 收藏 + 我的发布）|
| Day6 | 注册登录与状态持久化 | LoginView / RegisterView、userStore 重构、localStorage 持久化、登录态联动 |
