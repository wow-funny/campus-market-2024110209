# Day7 Evidence - 项目文档完善与 AI 协作总结

## 1. 今日完成内容

请简要说明今天完成了哪些文档完善和总结工作。

今日完成内容总结：

**项目文档完善**
- 重写 README.md：从课程种子仓库模板改为项目文档风格，包含项目简介、技术栈、核心功能、项目运行、使用指南、项目结构、各日功能概览共 7 个章节
- 更新 AI_Collaboration_Card.md：从零散记录整理为完整的 AI 协作总结文档，包含使用工具、参与任务、典型提示词、生成内容问题、人工判断与修改、总结 6 个章节

## 2. README.md 结构说明

README.md 最终包含以下章节：

| 章节 | 内容 |
|------|------|
| 1. 项目简介 | 项目定位、四大功能模块、技术概览、实训背景 |
| 2. 技术栈 | 8 项技术及简要说明（Vue 3 / Vite / TypeScript / Vue Router / Pinia / Axios / Element Plus / JSON Server） |
| 3. 核心功能 | 12 项功能逐条列举（首页导航、四个列表页、发布、注册登录、状态持久化、个人中心、收藏、搜索筛选、状态反馈） |
| 4. 项目运行 | 安装依赖 → 启动 Mock API → 启动开发服务器 → 预设测试账号 |
| 5. 使用指南 | 从首页到退出的 9 步完整用户操作流 |
| 6. 项目结构 | 带注释的目录树，展示 src/ 下所有核心文件 |
| 7. 各日功能概览 | Day1~Day6 每日主题与核心产出汇总表 |

## 3. 项目运行说明

```bash
# 安装依赖
pnpm install

# 终端 1：启动 Mock API（端口 3000）
npm run mock

# 终端 2：启动开发服务器（端口 5173）
npm run dev
```

预设测试账号：

| 用户名 | 密码 | 说明 |
|--------|------|------|
| student | 123456 | 预设演示用户 |

## 4. 项目结构说明

基于已读过的所有文件，以下是完整的项目结构分析：
campus-market-2024110209/
│
├── 📄 配置文件
│   ├── package.json              # pnpm 依赖 + 5 个脚本（dev / mock / build / lint / type-check）
│   ├── vite.config.ts            # Vite 配置 + 代理转发（5 条 proxy → localhost:3000）
│   ├── tsconfig.json / tsconfig.app.json / tsconfig.node.json  # TS 三重配置
│   ├── eslint.config.ts          # ESLint + Oxlint 双 Linter
│   ├── .oxlintrc.json            # Oxlint 规则
│   ├── .nvmrc                    # Node 版本锁定
│   ├── .editorconfig             # 编辑器统一缩进/编码
│   └── index.html                # 入口 HTML（挂载 #app）
│
├── 📦 数据源
│   └── db.json                   # JSON Server 数据 → 5 个集合
│       ├── users                 #   用户（注册时新增，登录时查询）
│       ├── trades                #   二手交易
│       ├── lostFounds            #   失物招领
│       ├── groupBuys             #   拼单搭子
│       └── errands               #   跑腿委托
│
├── src/
│   ├── 📌 入口
│   │   ├── main.ts               # createApp + Pinia + Router + Element Plus
│   │   └── App.vue               # 根组件 → AppLayout + onMounted restoreLogin()
│   │
│   ├── 🌐 API 层（axios → Vite proxy → JSON Server）
│   │   ├── http.ts               #   axios 实例（baseURL: ''，timeout: 5000）
│   │   ├── user.ts               #   GET /users + POST /users
│   │   ├── trade.ts              #   GET /trades + POST /trades
│   │   ├── lostFound.ts          #   GET /lostFounds + POST /lostFounds
│   │   ├── groupBuy.ts           #   GET /groupBuys + POST /groupBuys
│   │   └── errand.ts             #   GET /errands + POST /errands
│   │
│   ├── 🗄️ 状态层（Pinia Store — 跨组件共享）
│   │   ├── user.ts               #   isLoggedIn / currentUser → login / logout / restoreLogin + localStorage
│   │   └── favorite.ts           #   favorites[] → toggleFavorite / isFavorite / add / remove
│   │
│   ├── 🧭 路由层
│   │   └── index.ts              #   8 个路由：/ /trade /lost-found /group-buy /errand /publish /message /user + /login /register
│   │
│   ├── 🖥️ 页面层（10 个 Vue 组件）
│   │   ├── HomeView.vue          #   首页 — Hero + 7 个分类卡片 + 公告 + 热门推荐
│   │   ├── LoginView.vue         #   登录页 — 用户名/密码 + 校验 + ElMessage
│   │   ├── RegisterView.vue      #   注册页 — 5 字段 + 查重 + 校验
│   │   ├── TradeView.vue         #   二手交易 — 搜索 + 分类筛选 + 收藏 + loading/error/empty
│   │   ├── LostFoundView.vue     #   失物招领 — 搜索 + 类型筛选 + loading/error/empty
│   │   ├── GroupBuyView.vue      #   拼单搭子 — 搜索 + loading/error/empty
│   │   ├── ErrandView.vue        #   跑腿委托 — 搜索 + loading/error/empty
│   │   ├── PublishView.vue       #   发布 — 4 类型切换 + 校验 + 登录保护
│   │   ├── MessageView.vue       #   消息中心 — Tab 切换 + 消息列表
│   │   └── UserCenterView.vue    #   个人中心 — 资料卡片 + 收藏 + 我的发布
│   │
│   └── 🧩 组件层（9 个通用组件）
│       ├── AppLayout.vue         #   布局外壳 — el-container + CSS 变量 + Footer
│       ├── AppHeader.vue         #   导航栏 — 登录/未登录双态切换 + 下拉菜单
│       ├── AppNav.vue            #   导航菜单 — 7 项 + 激活态高亮
│       ├── ItemCard.vue          #   信息卡片 — 标题/描述/标签/地点/时间 + footer 插槽
│       ├── FormField.vue         #   表单字段 — 标签 + 必填标记 + 错误提示
│       ├── SearchBar.vue         #   搜索组件 — v-model + 清空按钮
│       ├── LoadingState.vue      #   加载态 — spinner + 文字
│       ├── EmptyState.vue        #   空态 — 文字提示
│       └── ErrorState.vue        #   错误态 — 错误信息 + 重试按钮 + retry 事件
│
├── 📚 文档
│   ├── docs/guide/               # 环境搭建 + 快速开始
│   ├── docs/ai/                  # AI 协作卡片
│   └── docs/evidence/            # Day1 ~ Day7 证据卡
│
└── 📁 其他
    ├── public/favicon.ico
    └── node_modules/

## 5. AI 协作记录

请说明 AI 在本项目中的参与情况。

**使用的 AI 工具：** opencode（CLI 编程助手），模型为 big-pickle

**AI 参与的任务：**

| 阶段 | AI 辅助内容 | 人工调整内容 |
|------|------------|-------------|
| Day2 | 导航系统与首页：AppLayout 布局、AppNav 导航菜单、HomeView 首页骨架 | 检查页面名称和路由路径；调整 CSS 风格统一性 |
| Day3 | 业务列表页：四个列表页 + ItemCard 组件 + API 封装 | 调整字段贴合校园业务；统一列表页数据加载模式 |
| Day4 | 发布表单：PublishView 表单切换 + FormField 组件 + 校验逻辑 | 删除复杂登录和图片上传；修改校验规则；去掉不生效样式 |
| Day5 | Pinia Store：userStore、favoriteStore + UserCenterView + 收藏功能 | 调整状态边界；拆分 Store；修复 id 冲突和硬编码问题 |
| Day6 | 注册登录：db.json users、api/user.ts、LoginView/RegisterView、导航栏登录态切换 | 修正 /users 代理缺失；修复 ElMessage 导入和类型安全；统一 UI 风格 |

**AI 生成内容的问题：**
- 字段不贴合业务场景
- 代码过度复杂（如 JWT、权限路由）
- 类型安全遗漏（null 安全访问）
- 配置遗漏（vite.config.ts 代理）
- 样式与现有项目不统一（原生元素 vs Element Plus）

## 6. 项目功能清单

首页与导航（服务分类入口、平台公告、热门推荐）
二手交易列表（商品浏览、关键词搜索、分类筛选、收藏）
失物招领列表（信息浏览、关键词搜索、类型筛选）
拼单搭子列表（拼单浏览、关键词搜索）
跑腿委托列表（委托浏览、关键词搜索）
信息发布（四种类型表单切换、字段校验、Mock API 提交）
用户注册（用户名查重、表单校验、写入 db.json）
用户登录（用户名密码匹配、Pinia + localStorage 持久化）
退出登录（清空 Pinia + localStorage，跳转登录页）
登录状态恢复（页面刷新从 localStorage 恢复）
导航栏登录态切换（未登录显示按钮，登录后显示用户信息）
发布页面登录保护（未登录提示并跳转登录页）
首页卡片登录保护（发布信息卡片点击时检查登录）
个人中心（用户资料、我的收藏、我的发布）
收藏功能（跨页面共享的收藏状态）
搜索与筛选（全列表页关键词搜索 + 下拉筛选）
状态反馈（加载态 / 空态 / 错误态含重试）

## 7. 完整功能走查记录

请按照真实操作记录一次完整走查。

1. 打开终端 1，执行 npm run mock，JSON Server 启动于 localhost:3000
2. 打开终端 2，执行 npm run dev，Vite 启动于 localhost:5173
3. 浏览器访问 http://localhost:5173
4. 首页正常渲染：渐变 Hero 区 + 7 个服务分类卡片 + 公告 + 热门推荐
5. 导航栏右侧显示「登录」「注册」按钮（未登录状态）
6. 点击「登录」，跳转 /login 页面，显示统一风格的登录卡片
7. 输入预设账号 student / 123456，点击登录，ElMessage.success 提示「登录成功」
8. 跳转个人中心，显示用户资料（姓名、学院·年级、个人简介）
9. 导航栏变为已登录状态：消息角标 + 发布按钮 + 用户头像「校」+ 用户名「校园用户」
10. 刷新页面，登录状态保留（localStorage 恢复）
11. 点击导航栏用户名 → 下拉菜单 → 「退出登录」
12. 导航栏恢复为「登录」「注册」按钮
13. 点击「注册」，跳转 /register 页面
14. 填写新用户信息（用户名、密码、姓名、学院、年级）
15. 提交注册，ElMessage.success 提示「注册成功」，跳转登录页
16. 检查 db.json，users 数组中新增了该用户
17. 使用新账号登录成功
18. 点击「发布信息」，填写二手交易表单并提交，发布人显示当前用户名
19. 跳转二手交易列表页，看到新增数据
20. 输入关键词搜索，列表实时过滤
21. 点击「收藏」按钮，按钮变为「已收藏」
22. 进入个人中心，"我的收藏"中显示刚收藏的信息
23. 退出登录后，在首页点击「发布信息」卡片，弹提示并跳转登录页

## 8. 遇到的问题与解决方法

请记录至少一个真实问题。

**问题 1：README.md 从课程模板改为项目文档时需要确认信息准确性**
- README.md 中的项目结构、技术栈、核心功能描述必须与实际代码一致
- 通过逐一核对了 src/ 下所有文件的实际路径和功能，确保目录树和功能描述准确

**问题 2：AI_Collaboration_Card.md 原始内容为 Day1 的零散记录**
- 原始文件包含的是 Day1 的分析报告（目录结构、main.ts、路由作用等），与后续 Day2~Day6 的 AI 协作无关
- 需要从各日证据卡中提取 AI 协作记录，汇总成完整的分阶段表格

**问题 3：各日功能概览表的边界划分**
- 某些功能跨多天完成（如 ItemCard 组件 Day3 创建但后续持续修改），需确定归属哪一天
- 以「首次产出」为准，后续优化归入对应 Day 的基础产出

## 9. 今日反思

请用一小段话说明：完善项目文档和 AI 协作总结对整个实训项目的意义。

实训项目的代码是对功能的实现，而 README 和 AI Collaboration Card 是对整个开发过程的"元记录"。一个清晰的项目文档能让任何一个新接手的人快速理解项目是什么、怎么跑、结构怎样——这是软件工程中"可维护性"和"可交付性"的基础。而 AI 协作总结则是对 AI 辅助开发模式的复盘：哪些任务 AI 做得快（模板代码、重复结构），哪些必须自己判断（功能边界、类型安全、架构设计）。这份总结比代码本身更能体现开发者的工程判断力，也是从"会用 AI"到"用好 AI"的关键一步。没有文档的项目只是一个能跑的代码堆，有文档的项目才是一个可交付的产品。
