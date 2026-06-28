<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Bell } from '@element-plus/icons-vue'
import AppNav from './AppNav.vue'

const router = useRouter()
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
        <el-dropdown trigger="click">
          <div class="user-area">
            <el-avatar :size="32" class="user-avatar">U</el-avatar>
            <span class="user-name">校园用户</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="router.push('/user')">个人中心</el-dropdown-item>
              <el-dropdown-item @click="router.push('/publish')">发布商品</el-dropdown-item>
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
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
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
  background: linear-gradient(135deg, #409eff 0%, #7c3aed 100%);
  color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 18px;
  letter-spacing: -1px;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
}

.logo-group {
  display: flex;
  flex-direction: column;
}

.logo-text {
  font-size: 17px;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.2;
}

.logo-sub {
  font-size: 11px;
  color: #c0c4cc;
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
  padding: 4px 8px;
  border-radius: 8px;
  transition: background 0.2s;
}

.user-area:hover {
  background: #f0f7ff;
}

.user-avatar {
  background: linear-gradient(135deg, #409eff, #7c3aed);
  color: #fff;
  font-weight: 600;
  font-size: 14px;
}

.user-name {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}
</style>
