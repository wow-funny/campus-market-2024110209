# AI Collaboration Card

## 1. 使用的 AI 工具

- **opencode**（CLI 编程助手），模型为 big-pickle
- 通过自然语言对话逐步下达开发任务

## 2. AI 参与的任务

| 阶段 | AI 辅助内容 | 人工调整内容 |
|------|------------|-------------|
| Day2 | 导航系统与首页：AppLayout 布局、AppNav 导航菜单、HomeView 首页骨架 | 检查页面名称和路由路径；调整 CSS 风格统一性 |
| Day3 | 业务列表页：TradeView / LostFoundView / GroupBuyView / ErrandView 四个列表页 + ItemCard 组件 + 对应 API 封装 | 调整字段使其贴合校园业务（如 category、publisher 等）；统一列表页数据加载模式 |
| Day4 | 发布表单：PublishView 四种类型表单切换 + FormField 组件 + 表单校验逻辑 + create API | 删除复杂登录和图片上传逻辑；修改校验规则贴合校园场景；去掉不生效的原生元素样式 |
| Day5 | Pinia 状态管理：userStore、favoriteStore + UserCenterView 个人中心 + 收藏功能 | 调整状态边界（哪些放 Store、哪些放局部）；拆分用户和收藏 Store；修复 item.id 冲突和 publisher 硬编码问题 |
| Day6 | 注册登录：db.json users 资源、api/user.ts、LoginView / RegisterView、导航栏登录态切换、发布页登录保护 | 修正 vite.config.ts 的 /users 代理缺失；修复 ElMessage 导入位置；修复 currentUser 类型安全；统一 UI 风格为 Element Plus；删除 window.alert 统一为 ElMessage |

## 3. 典型提示词

最有价值的提示词：

1. **"在 db.json 中增加 users 数据资源，创建用户 API 模块，改造 userStore 将硬编码模拟用户改造成登录状态管理"**
   — 生成了完整的登录/注册/状态持久化/退出的用户闭环，直接从 mock 切换到真实流程。

2. **"创建 LoadingState / ErrorState / SearchBar 组件，为四个列表页统一接入 loading、error、search 状态"**
   — 一次生成了 3 个通用组件 + 4 个页面的完整交互状态，极大减少了重复工作。

## 4. AI 生成内容的问题

AI 生成内容中存在以下问题：

- **字段不贴合业务** — 初始生成的表单字段与校园场景不符（如价格字段缺失、地址字段不适合校园），需人工调整
- **代码过度复杂** — AI 倾向于生成超出范围的逻辑（如 JWT Token、密码加密、权限路由），需要人工删除
- **组件抽象过度** — 某些场景 AI 会创建过多抽象层，增加理解成本而非简化开发
- **生成内容无法直接运行** — 常见问题包括：
  - 导入路径错误（ElMessage 放入错误的 script 块）
  - 类型安全遗漏（currentUser 未做 null 安全访问）
  - 配置遗漏（vite.config.ts 缺少 /users 代理）
  - 使用了项目中未安装的库或组件
- **样式与现有项目不统一** — AI 生成的页面使用原生 HTML 元素（input、button），而非项目统一使用的 Element Plus 组件，需要人工替换

## 5. 我的判断与修改

对 AI 生成内容的处理原则：

1. **功能边界控制** — AI 建议的 JWT、密码加密、权限路由等生产级功能全部拒绝，只保留 Mock 级别的注册/登录流程
2. **类型安全修复** — 每次生成后运行 vue-tsc 类型检查，修复所有类型错误（如可选链、类型断言）
3. **风格统一** — 将 AI 生成的原生 HTML 元素替换为 Element Plus 组件，使用项目统一的 CSS 变量体系
4. **配置补齐** — AI 不会自动修改 vite.config.ts 等配置文件，需要人工补充代理规则
5. **状态边界调整** — AI 倾向于把所有数据都放入 Store，人工调整为「跨组件共享→Store、页面独有→局部 ref」原则
6. **分步验证** — 不一次性接受 AI 的全部修改，而是按 Task 逐步下达指令，每一步完成后验证再继续

## 6. 总结

AI 在本项目中主要提高了**重复性代码的生成效率**和**模板代码的搭建速度**。具体来说：

- 通用组件（LoadingState、EmptyState、ErrorState、SearchBar）的模板代码由 AI 快速生成，省去了重复编写 CSS 和基础逻辑的时间
- Pinia Store 的结构（state / getters / actions）和 API 封装代码由 AI 生成基础骨架，人工只需填充业务逻辑
- 页面表单和列表的初始版本由 AI 搭建，人工调整字段和校验规则

**必须由开发者自己理解和判断的部分：**

- **功能边界** — 哪些功能应该做（Mock 注册登录）、哪些不应该做（JWT、权限路由），AI 无法判断项目范围
- **状态设计** — 哪些数据放 Pinia Store、哪些放局部 ref，AI 倾向于全部放 Store，需要人工按职责拆分
- **类型安全** — AI 生成的 TypeScript 代码经常忽略 null/undefined 边界，需要人工检查和修复
- **配置集成** — vite.config.ts 等工程配置文件的修改需要人工完成
- **UI 一致性** — 保持项目整体视觉风格统一需要人工把控，AI 无法感知现有设计系统

总结：AI 是一个高效的代码生成助手，能大幅减少重复性工作，但在架构设计、功能边界、类型安全和工程配置方面，开发者的判断力仍然不可替代。
