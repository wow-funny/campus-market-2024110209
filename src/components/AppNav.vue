<script setup lang="ts">
import { useRoute } from 'vue-router'
import { HomeFilled, Goods, Clock, ChatDotSquare, UserFilled, DataAnalysis, GobletFull } from '@element-plus/icons-vue'

const route = useRoute()

const navItems = [
  { path: '/', label: '首页', icon: HomeFilled },
  { path: '/trade', label: '交易', icon: Goods },
  { path: '/lost-found', label: '失物招领', icon: Clock },
  { path: '/group-buy', label: '拼团', icon: DataAnalysis },
  { path: '/errand', label: '跑腿', icon: GobletFull },
  { path: '/message', label: '消息', icon: ChatDotSquare },
  { path: '/user', label: '我的', icon: UserFilled },
]
</script>

<template>
  <nav class="nav-menu">
    <router-link
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      :class="['nav-link', { active: route.path === item.path || route.path.startsWith(item.path + '/') }]"
    >
      <el-icon :size="16"><component :is="item.icon" /></el-icon>
      <span>{{ item.label }}</span>
      <span class="nav-indicator" />
    </router-link>
  </nav>
</template>

<style scoped>
.nav-menu {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 20px;
  flex: 1;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 14px;
  height: 40px;
  text-decoration: none;
  color: var(--campus-text-secondary);
  font-size: 14px;
  position: relative;
  transition: all 0.25s ease;
  border-radius: 999px;
}

.nav-link:hover {
  color: var(--campus-primary);
  background: #eef2ff;
}

.nav-link.active {
  color: var(--campus-primary);
  font-weight: 600;
  background: #eef2ff;
}

.nav-indicator {
  display: none;
}
</style>
