<template>
  <section class="page">
    <div class="page-head">
      <h2>消息中心</h2>
      <p>查看系统通知、交易消息、评价提醒</p>
    </div>

    <el-card shadow="never">
      <el-tabs v-model="tab">
        <el-tab-pane label="全部" name="all" />
        <el-tab-pane label="系统通知" name="system" />
        <el-tab-pane label="私信" name="chat" />
        <el-tab-pane label="互动" name="interact" />
      </el-tabs>

      <div v-for="item in filteredList" :key="item.id" class="msg-item">
        <el-badge :is-dot="!item.read" class="msg-dot">
          <el-avatar :size="40">{{ item.avatar }}</el-avatar>
        </el-badge>
        <div class="msg-body">
          <div class="msg-head">
            <span class="msg-title">{{ item.title }}</span>
            <span class="msg-time">{{ item.time }}</span>
          </div>
          <p class="msg-desc">{{ item.desc }}</p>
        </div>
      </div>

      <el-empty v-if="!filteredList.length" description="暂无消息" />
    </el-card>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Message {
  id: number
  type: string
  title: string
  desc: string
  avatar: string
  time: string
  read: boolean
}

const messages: Message[] = [
  { id: 1, type: 'system', title: '系统通知', desc: '您的实名认证已通过', avatar: '系', time: '10分钟前', read: false },
  { id: 2, type: 'chat', title: '李同学', desc: '你好，请问这个书还在吗？', avatar: '李', time: '30分钟前', read: false },
  { id: 3, type: 'interact', title: '商品评论', desc: '张同学评论了您的商品"机械键盘"', avatar: '评', time: '1小时前', read: true },
  { id: 4, type: 'system', title: '系统通知', desc: '您的商品"高等数学"已被浏览10次', avatar: '系', time: '2小时前', read: true },
  { id: 5, type: 'chat', title: '王同学', desc: '可以再便宜点吗？', avatar: '王', time: '昨天', read: true },
  { id: 6, type: 'interact', title: '拼单邀请', desc: '刘同学邀请您加入"奶茶拼单"', avatar: '拼', time: '昨天', read: true },
]

const tab = ref('all')

const filteredList = computed(() => {
  if (tab.value === 'all') return messages
  const map: Record<string, string> = { system: 'system', chat: 'chat', interact: 'interact' }
  return messages.filter((m) => m.type === map[tab.value])
})
</script>

<style scoped>
.page { max-width: 960px; margin: 0 auto; }
.page-head {
  padding: 24px;
  border-radius: var(--campus-radius);
  background: var(--campus-card-bg);
  border: 1px solid var(--campus-border);
  margin-bottom: 24px;
}
.page-head h2 { margin: 0 0 4px; font-size: 22px; font-weight: 700; color: var(--campus-text); }
.page-head p { margin: 0; color: var(--campus-text-secondary); font-size: 14px; }
.msg-item { display: flex; gap: 12px; padding: 16px 0; border-bottom: 1px solid #f1f5f9; }
.msg-item:last-child { border-bottom: none; }
.msg-body { flex: 1; min-width: 0; }
.msg-head { display: flex; justify-content: space-between; align-items: center; }
.msg-title { font-size: 14px; font-weight: 600; color: var(--campus-text); }
.msg-time { font-size: 12px; color: #94a3b8; }
.msg-desc { font-size: 13px; color: var(--campus-text-secondary); margin: 4px 0 0; }
</style>
