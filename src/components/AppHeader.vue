<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Bell, Plus } from '@element-plus/icons-vue'
import AppNav from './AppNav.vue'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()
</script>

<template>
  <el-header class="app-header">
    <div class="header-inner">
      <router-link to="/" class="logo">
        <span class="logo-icon">M</span>
        <div class="logo-group">
          <span class="logo-text">校园轻集市</span>
          <span class="logo-sub">Campus Market</span>
        </div>
      </router-link>
      <AppNav />
      <div class="header-right">
        <el-badge :value="3" :hidden="false" class="notif-badge">
          <el-icon :size="20" color="#606266"><Bell /></el-icon>
        </el-badge>
        <el-button class="publish-btn" type="primary" size="small" @click="router.push('/publish')">
          <el-icon><Plus /></el-icon>发布信息
        </el-button>
        <el-dropdown trigger="click">
          <div class="user-area">
            <el-avatar :size="32" class="user-avatar">{{ userStore.currentUser.name?.[0] ?? '?' }}</el-avatar>
            <span class="user-name">{{ userStore.displayName }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="router.push('/user')">个人中心</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>

<style scoped>
.app-header {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 var(--campus-border), 0 4px 20px rgba(99, 102, 241, 0.06);
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 100;
  height: 60px;
}

.header-inner {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  gap: 12px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-icon {
  width: 34px;
  height: 34px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
  color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 18px;
  letter-spacing: -1px;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

.logo-group {
  display: flex;
  flex-direction: column;
}

.logo-text {
  font-size: 17px;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.logo-sub {
  font-size: 11px;
  color: #94a3b8;
  -webkit-text-fill-color: #94a3b8;
  letter-spacing: 0.5px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
  margin-left: auto;
}

.notif-badge {
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
}

.notif-badge:hover {
  transform: scale(1.1);
}

.user-area {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 12px 4px 8px;
  border-radius: 999px;
  transition: all 0.2s;
  border: 1px solid var(--campus-border);
}

.user-area:hover {
  background: #eef2ff;
  border-color: #c7d2fe;
}

.user-avatar {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  font-weight: 600;
  font-size: 14px;
}

.user-name {
  font-size: 14px;
  color: var(--campus-text);
  font-weight: 500;
}

.publish-btn {
  font-weight: 600;
  border-radius: 999px;
  padding: 8px 16px !important;
  background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
  border: none !important;
}

.publish-btn:hover {
  background: linear-gradient(135deg, #4f46e5, #7c3aed) !important;
}
</style>
