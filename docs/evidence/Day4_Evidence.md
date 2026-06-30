# Day4 Evidence - 发布表单与数据新增

## 1. 今日完成内容

请简要说明今天完成了哪些发布表单、表单校验和数据提交工作。

发布表单：创建了 FormField.vue 表单项组件，在 PublishView.vue 中实现了支持四类业务（二手交易、失物招领、拼单搭子、跑腿委托）的发布表单，每类根据类型条件渲染专属字段，切换类型时自动重置表单。
表单校验：实现了自定义 validateForm() 函数，对公共字段（标题、地点、描述）和各类型专有字段（如价格 > 0、目标人数 ≥ 2、酬劳非负等）进行必填和数值校验，错误信息通过 errors 对象绑定到 FormField 组件展示。
数据提交：在 4 个 API 文件中补充了 createXxx() 方法，提交时先校验 → 调用对应 API → 成功后 ElMessage 提示并跳转列表页，失败时提示检查 Mock 服务，提交过程中按钮显示 loading 状态防止重复提交。

## 2. 发布类型与字段设计
trades — 含 category、price、condition 等交易核心字段
lostFounds — 通过 type 区分寻物/招领，itemName + eventTime 描述物品
groupBuys — targetCount(≥2) + deadline 控制拼单规模
errands — reward、from、to、deadline 定义跑腿任务

## 3. 表单校验规则
公共字段（全部类型）： 
标题不能为空 → errors.title = '请输入标题'
地点不能为空 → errors.location = '请输入地点'
描述不能为空 → errors.description = '请输入描述'
二手交易（trade）：
商品分类不能为空 → errors.category = '请输入商品分类'
价格必须大于 0 → errors.price = '价格应大于 0'
成色不能为空 → errors.condition = '请选择商品成色'
失物招领（lostFound）：
物品名称不能为空 → errors.itemName = '请输入物品名称'
发生时间不能为空 → errors.eventTime = '请选择发生时间'
拼单搭子（groupBuy）：
拼单类型不能为空 → errors.groupType = '请输入拼单类型'
目标人数不能少于 2 → errors.targetCount = '目标人数不能少于 2 人'
截止时间不能为空 → errors.deadline = '请选择截止时间'
跑腿委托（errand）：
任务类型不能为空 → errors.taskType = '请输入任务类型'
酬劳不能为负数 → errors.reward = '酬劳不能为负数'
取件地点不能为空 → errors.from = '请输入取件地点'
送达地点不能为空 → errors.to = '请输入送达地点'
截止时间不能为空 → errors.deadline = '请选择截止时间'

## 4. AI 协作记录
请说明：
使用了什么 AI 工具：
opencode ,豆包
输入了什么核心提示词：
请根据用户输入的发布类型，生成对应的表单字段。例如，用户输入“二手交易”，则生成商品分类、价格、成色字段；用户输入“失物招领”，则生成物品名称、发生时间字段；用户输入“拼单搭子”，则生成拼单类型、目标人数、截止时间字段；用户输入“跑腿委托”，则生成任务类型、酬劳、取件地点、送达地点、截止时间字段。
AI 生成了哪些内容：
.page-header h1 → .page-header h2 — 匹配模板中的 <h2>
删除 input, select, textarea { ... } — 不作用于 Element Plus 组件
删除 textarea { resize: vertical } — 同上
删除 button { ... }、button:disabled { ... }、.primary { ... }、.secondary { ... } — Element Plus 的 <el-button> 已有自带样式
.publish-form 改为 display: flex + 去掉了
等等
AI 生成内容中有哪些不合理之处。

## 5. 人工调整内容

请说明你自己做了哪些修改。
例如：
删除了复杂登录逻辑；
修改了不贴合校园场景的字段；
修正了表单校验规则。

## 6. 测试记录


发布了2条二手交易信息；
发布成功后跳转到二手交易页面；
在列表中看到了新增数据；
在 db.json 中确认新增记录。

## 7. 遇到的问题与解决方法

请记录至少一个真实问题，例如：
样式规则与模板组件不匹配
PublishView.vue 的 <style scoped> 中包含针对原生 HTML 元素的样式规则（.page-header h1、input、select、textarea、button、.primary、.secondary），但模板中实际使用的是 Element Plus 组件（<el-input>、<el-button type="primary"> 等）以及 <h2> 而非 <h1>。这些样式永远不会生效，属于死代码。

  
## 8. 今日反思

请用一小段话说明：
发布表单、表单校验和数据新增对完整 Web 应用有什么作用？
发布表单是用户与系统交互的入口，负责将用户输入的结构化数据提交到后端；表单校验在数据发送前拦截无效输入（如空值、负数价格），保证数据质量和系统稳定性；数据新增则将校验通过的合法数据持久化到数据库，使前端创建的记录在刷新后仍然可见，是完整 CRUD 应用中"创建"环节的基石。三者串联起来，构成了用户从"填写 → 验证 → 存储"的完整数据生产流程。