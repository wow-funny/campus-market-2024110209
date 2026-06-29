 Day3 Evidence - Mock 数据建模与列表渲染

## 1. 今日完成内容

请简要说明今天完成了哪些 Mock 数据、接口封装和页面渲染工作。

一、Mock 数据（db.json）
四个模块共 21 条数据：二手交易（6）、失物招领（5）、拼单搭子（5）、跑腿委托（5）
每条数据字段贴合业务场景（如二手交易含 category/price/condition，跑腿含 taskType/reward/from→to）
二、接口封装（src/api/）
http.ts — Axios 基础实例，空 baseURL + 5s 超时，走 Vite 代理
trade.ts / lostFound.ts / groupBuy.ts / errand.ts — 各模块的 TypeScript 接口定义 + 列表请求函数（getTrades() 等）
三、通用组件（src/components/）
ItemCard.vue — 卡片组件，通过 props 接收 title/description/tag/location/time，支持 footer 插槽
EmptyState.vue — 空状态组件，接收 text 文案
四、页面渲染（src/views/）
TradeView / LostFoundView / GroupBuyView / ErrandView 四个页面全部改为 onMounted 请求数据 → 赋值响应式 ref → ItemCard 列表渲染 → 空数据时显示 EmptyState
五、工程配置
vite.config.ts 添加 server.proxy，解决跨域问题

## 2. Mock 数据结构说明
通用字段：各模块共享 id、title、status、description
身份字段：publisher 或 contact，标识发布者或联系方式
时空字段：location + 时间字段（publishTime / eventTime / deadline）
业务特有字段:trades有price/condition，lostFounds有type/itemNameg,groupBuys有targetCount/currentCount,errands有reward/from/to
状态约束：所有数据 status 均为 "open"，后续可扩展 "closed"、"resolved" 等

## 3. 我的设计
请说明自己为什么这样设计数据字段。
1为什么二手交易需要 price 和 condition:
price（价格）：交易的核心要素，买家最关注的信息。没有价格就无法完成交易决策，也是列表排序（按价格筛选/排序）的基础字段。
condition（成色）：二手商品区别于全新商品的关键属性，直接影响定价合理性。同款商品九成新和五成新的价值差异很大，买家需要据此判断是否值得购买。

2为什么失物招领需要 type 字段；
失物招领天然包含两个方向：丢失（lost） 和 拾到（found）。type 字段用于区分这两种场景，页面可以根据 type 做 tab 筛选（只看寻物或只看招领），帮助用户快速匹配——丢东西的人找"招领"列表，捡到东西的人找"寻物"列表。

3为什么拼单搭子需要 targetCount 和 currentCount；
拼单的核心是"凑够人数"。targetCount 表示目标人数（满员条件），currentCount 表示当前已加入人数，两者共同体现拼单进度。用户通过这两个字段能直观判断：还差多少人？能不能赶上截止时间？进度 80% 比 20% 的拼单成功率更高。

4为什么跑腿委托需要 from、to 和 reward。
from（起点） + to（终点）：跑腿本质是"从 A 点到 B 点"的任务，接单者需要知道去哪里（起点取件/取餐）和送到哪里（终点交付），两个字段缺一不可。
reward（报酬）：跑腿是付费服务，报酬是接单者的核心驱动力，也是任务能否被接的关键因素。

5.四个模块为什么都设计了 status 字段？
status 是业务状态机的基础。当前全部为 "open"（进行中），后续可扩展 "closed"（已关闭/已下架）、"resolved"（失物已找回/招领已归还）、"completed"（跑腿已完成）等状态。列表页可以根据 status 过滤数据，减少无效信息的干扰。

6二手交易的 image 为什么设计为字符串而非数组？
Day3 阶段以基础功能为主，设计为单个字符串足够支撑列表页的封面图展示，避免前期复杂度。后续需要多图轮播时可升级为 string[]（字符串数组），接口和组件只需做向后兼容的扩展，不影响现有数据。

## 4. AI 设计

请说明 AI 工具生成了哪些内容。

AI帮我生成了 db.json；
AI帮我你生成了 API 模块；
AI帮我生成了页面列表代码；

AI 生成内容中有哪些不合理之处：
（1）字段设计过度抽象
src/api/ 下各模块最初设计了全套 CRUD（getList、getDetail、create、update、delete），但 Day3 阶段实际只用到 getXxx() 列表请求。多余的接口属于预判过度，删掉后更清爽。
最初为所有模块设计了 userId、createdAt 等字段，后来才改成贴近业务语义的 publisher、publishTime。前一套字段太像通用后台管理系统的风格，与校园集市的实际场景脱节。
（2）未提前考虑跨域问题
Ai第一版 http.ts 直接填了 localhost:3001 的完整 URL，没有一开始就用 Vite 代理。这在前后端分离的项目中是常见问题，应该在一开始就配置好代理，而不是等我反馈"页面没数据"才去补。

## 5. 最终调整
1.删除了哪些复杂字段：
各模块的 userId：原类型定义中有 userId: number 字段，但校园集市场景暂不需要用户系统，完全移除。
各 API 文件的 CRUD 接口：原包含 getDetail、create、update、delete。现Day3 阶段全部删除，只保留 getXxx() 列表接口。
2.修改了哪些不贴合校园场景的数据；
二手交易分类：原示例分类为 "书籍"、"数码"、"出行" 等，改为更具体的校园分类 "数码配件"、"教材资料"、"生活用品"、"文体用品"。
发布者身份：原为泛化字段，改为 "软件工程 2023 级学生"、"数学学院学生" 等带学院年级的真实校园身份。
3.调整了哪些字段名称；
name 改为	title	各模块：	与示例统一命名规范
desc 改为	description	各模块：	与示例统一命名规范
maxCount 改为	targetCount	拼单搭子：	与示例统一命名规范
等等
4.添加了哪些页面展示需要的字段。
二手交易补充 condition（成色）：页面 footer 中展示 item.condition，帮助买家判断商品新旧程度。
二手交易补充 publisher（发布者）：显示谁发布的商品，增强可信度。
失物招领补充 itemName（物品名称）：从 title 中分离出具体的物品名称，便于筛选和标签展示。
失物招领补充 eventTime（发生时间）：替换通用的 publishTime，更贴合失物发生/拾到的时间语义。
拼单搭子补充 deadline（截止时间）：替换 publishTime，用户需要知道拼单何时截止。

# 6. 遇到的问题与解决方法

请记录至少一个真实问题，例如：
Axios 请求失败；
启动项目后，四个业务页面均显示空状态，控制台报 CORS 相关错误。

## 7. 今日反思

Mock 数据建模为项目提供了可独立运行的数据层，让前端开发不依赖真实后端，提前验证数据结构的合理性；接口请求将数据访问按业务模块隔离，后续新增页面只需调用对应 API 函数，无需重复写请求逻辑；列表渲染将数据与视图解耦，后续开发详情页、发布页、搜索筛选等功能时，可以直接复用已定义的 TypeScript 类型、API 函数和 ItemCard 等通用组件，减少重复工作，让迭代更聚焦于业务逻辑本身。