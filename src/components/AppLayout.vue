<script setup lang="ts">
import { ArrowUp } from '@element-plus/icons-vue'
import AppHeader from './AppHeader.vue'
</script>

<template>
  <el-container class="app">
    <AppHeader />

    <el-main class="app-main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>

    <el-backtop :right="40" :bottom="60">
      <el-icon :size="24"><ArrowUp /></el-icon>
    </el-backtop>

    <footer class="app-footer">
      <p>校园轻集市 &copy; 2024 — 校园二手交易与信息发布平台</p>
    </footer>
  </el-container>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #f5f7fa;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
  width: 100%;
  box-sizing: border-box;
  flex: 1;
}

.app-footer {
  text-align: center;
  padding: 24px;
  color: #c0c4cc;
  font-size: 13px;
  border-top: 1px solid #ebeef5;
  background: #fff;
}
</style>
