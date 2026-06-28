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
  gap: 2px;
  margin-left: 20px;
  flex: 1;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 16px;
  height: 60px;
  text-decoration: none;
  color: #606266;
  font-size: 14px;
  position: relative;
  transition: color 0.2s, background 0.2s;
  border-radius: 0;
}

.nav-link:hover {
  color: #409eff;
  background: #f0f7ff;
}

.nav-link.active {
  color: #409eff;
  font-weight: 600;
}

.nav-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 24px;
  height: 3px;
  background: linear-gradient(90deg, #409eff, #7c3aed);
  border-radius: 3px 3px 0 0;
  transition: transform 0.25s ease;
}

.nav-link.active .nav-indicator {
  transform: translateX(-50%) scaleX(1);
}
</style>
