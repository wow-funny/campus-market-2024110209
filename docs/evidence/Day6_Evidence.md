# Day6 Evidence - 注册登录、状态持久化与功能走查

## 1. 今日完成内容

请简要说明今天完成了哪些注册、登录、状态持久化和交互优化工作。

完成内容总结：

**注册与登录**
- 在 db.json 中新增 users 数据资源，包含 username / password / name / college / grade 等字段
- 创建 src/api/user.ts — 封装 getUsers()（查询）和 createUser()（注册）API
- 重构 src/stores/user.ts — 从硬编码 mock 用户改为真实的登录/注册/退出/状态恢复逻辑
- 创建 RegisterView.vue — 注册页面，含表单校验、用户名查重、成功后跳转登录页
- 创建 LoginView.vue — 登录页面，含表单校验、用户名密码匹配、登录成功跳转个人中心
- 路由中添加 /login 和 /register 路径

**状态持久化**
- 登录成功后用户数据写入 localStorage（key: campus-market-current-user）
- App.vue 的 onMounted 中调用 restoreLogin()，从 localStorage 恢复登录态
- 退出登录时同时清空 Pinia 和 localStorage

**登录状态联动**
- AppHeader.vue — 未登录显示「登录/注册」按钮，登录后显示用户头像/名称/下拉菜单
- PublishView.vue — 提交时检查登录状态，未登录提示并跳转登录页
- HomeView.vue — 点击「发布信息」卡片时检查登录，未登录提示并跳转登录页
- UserCenterView.vue — 修复 currentUser 可能为 null 的类型错误

**代理配置修复**
- vite.config.ts 添加 /users 代理转发到 JSON Server

## 2. 注册登录设计说明

请说明本项目注册/登录的基本流程。

**注册流程：**
1. 用户填写用户名、密码、姓名、学院、年级
2. 前端校验表单（非空 + 密码长度 >= 6）
3. 调用 getUsers() 检查用户名是否已存在
4. 若不存在，调用 createUser() POST /users 写入 db.json
5. 注册成功后跳转登录页

**登录流程：**
1. 用户填写用户名和密码
2. 前端校验表单（非空）
3. 调用 getUsers() 查询 users 列表
4. 前端匹配用户名和密码
5. 匹配成功 → userStore.login() 保存到 Pinia 和 localStorage
6. 跳转到个人中心

**状态恢复流程：**
1. 刷新页面 → App.vue onMounted
2. 调用 userStore.restoreLogin()
3. 从 localStorage 读取 currentUser
4. 恢复到 Pinia state

**退出登录流程：**
1. 用户点击「退出登录」
2. userStore.logout() 清空 Pinia state
3. 同时删除 localStorage 中的 currentUser
4. 跳转到登录页

## 3. 用户数据结构说明

| 字段 | 含义 | 示例 |
|------|------|------|
| username | 用户名 | student |
| password | 密码 | 123456 |
| name | 显示名称 | 校园用户 |
| college | 学院 | 计算机学院 |
| grade | 年级 | 2023级 |
| avatar | 头像 | 暂为空 |
| bio | 个人简介 | 热爱校园生活，喜欢分享闲置好物。 |

## 4. 状态持久化说明

请说明为什么需要 localStorage。

Pinia 中的状态存储在内存中，刷新页面后会全部丢失。如果只靠 Pinia 管理登录状态，用户一刷新页面就会变成未登录状态，需要重新输入账号密码。

localStorage 的作用：
1. 登录成功后：将 currentUser 写入 localStorage（key: campus-market-current-user）
2. 页面刷新时：App.vue 的 onMounted 调用 userStore.restoreLogin()，从 localStorage 读取并恢复
3. 退出登录时：同时清除 Pinia 和 localStorage，保证状态一致

这样用户刷新页面后登录状态仍然保留，体验更接近真实应用。

需要特别说明：本项目仅使用明文密码和 localStorage 进行 Mock 登录，不是生产级安全方案。

## 5. 页面联动记录

请说明登录状态影响了哪些页面或组件。

| 页面/组件 | 登录状态影响 |
|-----------|-------------|
| AppHeader.vue | 未登录：显示「登录」「注册」按钮；已登录：显示消息角标 + 发布按钮 + 用户头像/名称 + 下拉菜单 |
| HomeView.vue | 点击「发布信息」卡片时检查登录，未登录弹提示并跳转 /login |
| PublishView.vue | 提交表单时检查登录，未登录弹提示并跳转 /login；发布人 publisher 来自 userStore.displayName |
| UserCenterView.vue | 个人资料卡片从 userStore 读取当前用户信息 |
| LoginView.vue | 登录成功后跳转 /user（个人中心） |
| RegisterView.vue | 注册成功后跳转 /login |
| PrivateView.vue | 登录校验 |

## 6. 交互优化记录

请说明今天完成了哪些体验优化。

**Day5 已完成的交互优化（继承使用）：**
- LoadingState.vue — 加载状态组件（spinner + 文字提示）
- ErrorState.vue — 错误状态组件（错误信息 + 重试按钮）
- SearchBar.vue — 搜索组件（v-model + 清空按钮）
- 四个列表页均接入 loading / error / empty / search 完整状态
- 收藏按钮样式升级（蓝色主题 active + ElMessage.info 反馈）
- 发布按钮 loading 防止重复提交

**Day6 新增的交互优化：**
- 导航栏登录态切换（未登录显示按钮，登录后显示用户信息）
- 注册表单用户名查重（即时反馈）
- 登录失败错误提示（红色提示框 + 具体文案）
- 发布页未登录时友好提示并引导登录
- 首页卡片点击时登录保护
- ElMessage.success / warning 统一反馈风格

## 7. AI 协作记录

请说明：
- 使用了什么 AI 工具
- 输入了什么核心提示词
- AI 生成了哪些内容
- AI 生成内容中有哪些不合理之处
- 自己保留、修改或删除了哪些内容

**AI 工具：** opencode（CLI 编程助手），模型为 big-pickle

**核心提示词：**
按 Task 步骤逐步下达：
1. "在 db.json 中增加 users 数据资源"
2. "创建 src/api/user.ts 用户 API 模块"
3. "开 src/router/index.ts，引入登录和注册页面"
4. "创建 RegisterView.vue 注册页面"
5. "改造 userStore，将写死的模拟用户改造成登录状态管理"
6. "在 App.vue 启动时恢复登录状态"
7. "创建 LoginView.vue 登录页面"
8. "改造导航栏登录状态展示"
9. "改造发布页面的发布人逻辑，未登录不能发布"
10. "整体检查运行问题"

**AI 生成的内容：**
- api/user.ts — User 接口、getUsers()、createUser()
- stores/user.ts — login() / logout() / restoreLogin() 完整逻辑
- RegisterView.vue — 注册页面（含校验、查重、提交）
- LoginView.vue — 登录页面（含校验、登录、错误提示）
- AppHeader.vue — 登录/未登录状态切换
- App.vue — restoreLogin() 挂载
- HomeView.vue — 发布卡片登录保护
- PublishView.vue — 提交前登录检查
- vite.config.ts — /users 代理补充
- UserCenterView.vue — currentUser 可选链修复


**AI 生成内容中的不合理之处：**
在 LoginView.vue 中 ElMessage 导入放到了单独的 script 块而非 script setup，导致运行时报错（已修正）
RegisterView.vue 同样存在 ElMessage 导入位置问题（已修正）
初始方案中 UserCenterView.vue 的 currentUser.bio 未做 null 安全访问，类型检查报错（已添加可选链）
vite.config.ts 未自动添加 /users 代理，需要人工补充

**自己保留、修改或删除了哪些内容：**
保留了 AI 生成的核心逻辑（注册/登录流程、localStorage 持久化、导航栏状态切换）
修改了登录/注册页面的 UI 风格，使用 Element Plus 组件替换原生 input/button，保持与项目一致的渐变色 Logo、CSS 变量体系
修正了 ElMessage 导入方式（从独立 script 块改为 script setup 内 import）
修复了 UserCenterView 的类型错误（currentUser?.bio）
补充了 vite.config.ts 的 /users 代理
在 HomeView 中添加了发布卡片的登录保护
 删除了所有 window.alert，替换为 ElMessage 统一提示

## 8. 功能边界说明

请明确说明：

本项目注册/登录功能基于 JSON Server、Pinia 和 localStorage 实现，仅用于前端实训和状态管理模拟，不是生产环境安全认证系统。

本项目暂未实现：
- 密码加密
- JWT
- 权限路由
- 短信验证码
- 找回密码
- 后端安全校验
- 头像真实上传

## 9. 完整功能走查记录

请按照真实操作记录一次完整走查。

1. 启动 JSON Server：npm run mock（端口 3000，读取 db.json）
2. 启动前端项目：npm run dev（端口 5173，代理转发到 3000）
3. 打开浏览器访问 http://localhost:5173
4. 首页正常显示，导航栏右侧显示「登录」「注册」按钮（未登录状态）
5. 点击「登录」按钮，跳转到 /login 登录页面
6. 使用预设账号 student / 123456 登录，提示「登录成功」，跳转到个人中心
7. 导航栏显示用户头像首字「校」和用户名「校园用户」
8. 刷新页面，登录状态仍然保持（localStorage 恢复）
9. 点击「退出登录」，导航栏恢复为「登录」「注册」按钮
10. 点击「注册」按钮，跳转到 /register 注册页面
11. 填写新用户信息（如：testuser / password123 / 测试用户 / 计算机学院 / 2024级）
12. 注册成功后提示「注册成功」，跳转到登录页
13. 使用新注册的账号登录，成功进入个人中心
14. 检查 db.json，users 数组中新增了该用户数据
15. 在登录状态下发布一条二手交易信息，发布人显示当前用户名
16. 进入二手交易页面，输入关键词搜索，列表实时过滤
17. 收藏一条信息，按钮变为「已收藏」
18. 进入个人中心，在「我的收藏」中看到已收藏的信息
19. 退出登录后，直接访问 /publish，点击发布时提示「请先登录后再发布信息」
20. 在首页点击「发布信息」卡片，未登录时同样提示并跳转登录页

## 10. 遇到的问题与解决方法

请记录至少一个真实问题。

**问题 1：注册/登录 API 请求 404**
现象：注册和登录时调用 getUsers() / createUser() 返回 404
原因：vite.config.ts 的 proxy 中只配置了 /trades、/lostFounds、/groupBuys、/errands，缺少 /users
解决：在 proxy 中添加 '/users': 'http://localhost:3000'

**问题 2：类型错误 — currentUser 可能为 null**
现象：vue-tsc 类型检查报错 TS18047: 'currentUser' is possibly 'null'
原因：重构后 currentUser 类型从 CurrentUser 改为 User | null，UserCenterView 中直接访问 .bio 不安全
解决：改为 userStore.currentUser?.bio（可选链访问）

**问题 3：ElMessage 导入位置错误**
现象：登录/注册页面运行时 ElMessage 未定义
原因：AI 生成的代码将 import { ElMessage } 放在了独立的 script 块中，而非 script setup
解决：将 ElMessage 导入移到 script setup 内

## 11. 今日反思

请用一小段话说明：通过补充注册/登录功能，你对"用户状态""状态持久化"和"前端 Mock 认证边界"有什么新的理解？

通过 Day6 的开发，我理解了前端的"用户状态"不只是 Pinia 中一个 isLoggedIn 布尔值，而是一整套数据流：注册时将用户写入 Mock API → 登录时查询校验 → 成功后同步到 Pinia 和 localStorage → 页面刷新时从 localStorage 恢复 → 退出时双向清空。这个闭环让用户状态不再是写死在代码里的假数据，而是可演示、可操作的真实流程。同时我也清楚认识到，这个方案只是前端实训的"Mock 认证"——没有密码加密、没有 JWT、没有服务端校验，真正的生产环境安全方案远比这复杂。前端应该关注的是"状态如何流动"，而不是"认证有多安全"——后者是后端和安全工程师的职责。
