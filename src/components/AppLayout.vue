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
      <div class="footer-wave" />
      <p>🌸 校园轻集市 &copy; 2026 — 轻量、可信、面向校园生活</p>
    </footer>
  </el-container>
</template>

<style>
:root {
  --campus-primary: #6366f1;
  --campus-primary-light: #818cf8;
  --campus-primary-dark: #4f46e5;
  --campus-secondary: #06b6d4;
  --campus-accent: #f59e0b;
  --campus-success: #10b981;
  --campus-bg: #f8fafc;
  --campus-card-bg: #ffffff;
  --campus-text: #1e293b;
  --campus-text-secondary: #64748b;
  --campus-border: #e2e8f0;
  --campus-radius: 14px;
  --campus-shadow: 0 4px 16px rgba(99, 102, 241, 0.08);

  --el-color-primary: #6366f1;
  --el-color-primary-light-3: #818cf8;
  --el-color-primary-light-5: #a5b4fc;
  --el-color-primary-light-7: #c7d2fe;
  --el-color-primary-light-9: #eef2ff;
  --el-color-primary-dark-2: #4f46e5;
  --el-color-success: #10b981;
  --el-color-warning: #f59e0b;
  --el-color-danger: #ef4444;
  --el-color-info: #06b6d4;
  --el-border-radius-base: 10px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--campus-bg);
  background-image:
    radial-gradient(ellipse at 10% 20%, rgba(99, 102, 241, 0.04) 0%, transparent 50%),
    radial-gradient(ellipse at 90% 80%, rgba(6, 182, 212, 0.04) 0%, transparent 50%);
  font-family: 'Inter', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: var(--campus-text);
  min-height: 100vh;
}

::selection {
  background: var(--campus-primary);
  color: #fff;
}

/* ---- Shared page-header styles ---- */
.page-header {
  padding: 28px 28px 24px;
  border-radius: var(--campus-radius);
  background: var(--campus-card-bg);
  border: 1px solid var(--campus-border);
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  border-radius: 4px 0 0 4px;
}

.page-header--trade::before { background: #6366f1; }
.page-header--trade { background: linear-gradient(135deg, #eef2ff 0%, #ffffff 80%); }

.page-header--lostfound::before { background: #f59e0b; }
.page-header--lostfound { background: linear-gradient(135deg, #fffbeb 0%, #ffffff 80%); }

.page-header--groupbuy::before { background: #10b981; }
.page-header--groupbuy { background: linear-gradient(135deg, #ecfdf5 0%, #ffffff 80%); }

.page-header--errand::before { background: #06b6d4; }
.page-header--errand { background: linear-gradient(135deg, #ecfeff 0%, #ffffff 80%); }

.page-header--publish::before { background: #8b5cf6; }
.page-header--publish { background: linear-gradient(135deg, #f5f3ff 0%, #ffffff 80%); }

.page-header h1,
.page-header h2 {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 700;
  color: var(--campus-text);
}

.page-header p {
  margin: 0;
  color: var(--campus-text-secondary);
  font-size: 14px;
  line-height: 1.5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-16px);
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
  padding: 32px 32px 48px;
  width: 100%;
  box-sizing: border-box;
  flex: 1;
}

.app-footer {
  text-align: center;
  padding: 20px 24px 28px;
  color: #94a3b8;
  font-size: 13px;
  background: #fff;
  position: relative;
  overflow: hidden;
}

.footer-wave {
  position: absolute;
  top: -6px;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(90deg, #6366f1, #06b6d4, #6366f1);
  opacity: 0.3;
  border-radius: 0 0 50% 50%;
}
</style>
