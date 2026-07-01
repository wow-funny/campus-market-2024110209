# Day5 Evidence - 状态管理与用户中心

## 1. 今日完成内容

请简要说明今天完成了哪些 Pinia Store、用户中心和收藏功能。
Pinia Store（2 个）
user.ts — 管理用户状态：isLoggedIn、currentUser（id/name/college/grade/avatar/bio），提供 displayName、userDescription getter，以及 login/logout/updateProfile 操作
favorite.ts — 管理收藏状态：内存中的 favorites[] 列表，提供 isFavorite/addFavorite/removeFavorite/toggleFavorite 及 favoriteCount getter
用户中心（UserCenterView.vue）
用户资料卡片：头像首字、用户名、学院·年级、个人简介，均从 userStore 读取
我的收藏：展示 favoriteStore.favorites 列表，支持取消收藏，空态显示 EmptyState
我的发布：从 trade/groupBuy/errand/lostFound 四类 API 拉取数据，按 publisher 过滤出当前用户发布项，含加载态、错误处理、路由 watch 自动刷新
收藏功能（TradeView.vue）
每张卡片 footer 插槽内嵌收藏按钮，点击调用 favoriteStore.toggleFavorite
未收藏显示 ☆ 收藏（灰底），已收藏切换为 ★ 已收藏（黄底橙字），带过渡动画
收藏数据通过 Pinia 跨组件共享，在用户中心"我的收藏"中即时可见

## 2. Store 设计说明

tore 设计汇总：
Store 文件	管理内容	主要状态	主要方法
src/stores/user.ts	当前用户信息	isLoggedIn、currentUser	updateProfile、login、logout
src/stores/favorite.ts	收藏状态	favorites	addFavorite、removeFavorite、toggleFavorite、isFavorite

## 3. 状态边界说明

以下是对当前项目状态边界的说明：
放入 Store 的数据:
数据	Store	          原因
当前用户信息（isLoggedIn、currentUser）->	user.ts	->多个组件（AppHeader、PublishView、UserCenterView）都需要读取，必须跨组件共享
收藏列表（favorites[]）->	favorite.ts->	收藏按钮在列表页操作，收藏列表在个人中心展示，跨页面共享
未放入 Store 的数据:
数据	存放位置	原因
业务列表数据（trades、lostFounds、groupBuys、errands）->	各自 View 的局部 ref ->	各列表页面相互独立，不存在跨页面共享需求。放入 Store 会导致数据冗余和过期问题
发布表单数据（title、price、location 等）->	PublishView.vue 的 reactive	  ->  属于表单局部状态，提交后即销毁，仅当前页面使用
路由/菜单状态（activeMenu）->	组件内 ref ->	仅当前展示面板切换，无需外部访问
边界原则:
1. 跨组件共享 → Store（用户信息、收藏）
2. 页面独有 → 局部 ref/reactive（列表数据、表单）
3. Store 职责单一 — user 只管用户、favorite 只管收藏，不把业务数据塞进 Store
4. API 数据不过 Store — 列表数据每次 mount 重新拉取，避免 Store 中的缓存与后端不一致

## 4. 页面使用记录

| Store | 使用的组件/页面 | 用途 |
|-------|----------------|------|
| **`useUserStore`** | `AppHeader.vue` | 显示用户名、头像首字 |
| | `PublishView.vue` | 发布时读取 `displayName` 作为 publisher |
| | `UserCenterView.vue` | 展示个人资料卡片（名称、学院年级、简介） |
| **`useFavoriteStore`** | `TradeView.vue` | 收藏按钮（添加/取消/状态判断） |
| | `UserCenterView.vue` | 展示我的收藏列表，支持取消收藏 |

两个 Store 在 `UserCenterView.vue` 中同时被使用，这也是 Day5 的核心页面。

## 5. AI 协作记录

请说明：
使用的 AI 工具：opencode（VSCode 插件），模型为 big-pickle

核心提示词：
"创建用户状态 Store" → 生成 stores/user.ts
"创建收藏状态 Store" → 生成 stores/favorite.ts
"在导航栏中显示用户信息" → 修改 AppHeader.vue
"在发布页面中使用当前用户" → 修改 PublishView.vue
"在列表页面中添加收藏操作" → 修改 TradeView.vue
"完善个人中心页面" → 重写 UserCenterView.vue
"实现'我的发布'基础思路" → 实现发布列表数据过滤

 AI 生成的内容：
两个 Pinia Store 的完整代码（state / getters / actions）
AppHeader.vue 引入 useUserStore 并绑定用户名和头像
PublishView.vue 将硬编码 publisher 改为 userStore.displayName
TradeView.vue 收藏按钮及视觉反馈（☆/★ 切换 + 颜色变化）
UserCenterView.vue 完整页面：用户资料、收藏列表、我的发布（含加载态、错误处理、路由刷新）

AI 生成内容中不合理之处：
item.id ?? 0 可能导致多个未定义 ID 的项 key 冲突，后改为 fallback-${计数器}
UserCenterView 初始版本缺少加载态和错误处理，后补充了 loading 和 Promise.allSettled
失物招领数据因缺少 publisher 字段无法在"我的发布"中展示，后补充了接口定义和 mock 数据
db.json 中的 $schema 行被 json-server 误识别为路由端点（类型应为 array），已删除

## 6. 人工调整内容

请说明你自己做了哪些修改。
删除了 JWT 权限逻辑；
拆分了 userStore 和 favoriteStore；
修改了 Store 命名；
调整了收藏数据结构；
正了页面读取 Store 的方式。

## 7. 测试记录

请记录至少一次真实测试。
在二手交易页面点击收藏；
按钮文字从“收藏”变为“已收藏”；
进入个人中心后能够看到收藏内容；
点击取消收藏后，该内容从个人中心消失；
发布页面中的发布人来自当前用户状态。

## 8. 遇到的问题与解决方法

请记录至少一个真实问题，例如：
- Store 导入路径错误；
- Pinia 没有挂载；
- 收藏按钮点击后无反应；
- 刷新页面后收藏数据丢失；
- AI 生成了过于复杂的登录逻辑

## 9. 今日反思

请用一小段话说明：
Pinia 状态管理对多页面前端应用有什么作用？

跨页面共享数据 — 用户登录信息（如 userStore.displayName）在导航栏、发布页、个人中心等多个页面间无需重复请求或 prop 层层传递，一处修改处处同步
职责边界清晰 — 每个 Store 只管理特定领域的状态（user 管用户、favorite 管收藏），页面组件只需引入所需 Store，代码结构一目了然
响应式自动驱动 — 在 TradeView 收藏商品后，UserCenterView 的收藏列表立即更新，无需手动触发刷新或额外事件总线
与 TypeScript 深度集成 — 类型推断让 Store 的 state / getter / action 在组件中使用时都有完整的代码提示和类型校验，减少运行时错误
保持页面局部状态轻量 — 列表数据、表单数据仍保留在组件局部 ref 中，避免把不需要共享的数据无谓塞入 Store 造成混乱