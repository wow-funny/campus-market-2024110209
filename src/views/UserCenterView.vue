<template>
  <section class="page">
    <el-card shadow="never" class="user-card">
      <div class="user-info">
        <el-avatar :size="64" class="user-avatar">用</el-avatar>
        <div>
          <h2>用户昵称</h2>
          <p>计算机科学与技术 · 2023级</p>
          <el-tag size="small" type="success">已认证</el-tag>
        </div>
      </div>
    </el-card>

    <el-row :gutter="16" class="stats-row">
      <el-col v-for="s in stats" :key="s.label" :span="6">
        <el-card shadow="never" class="stat-card">
          <p class="stat-num">{{ s.num }}</p>
          <p class="stat-label">{{ s.label }}</p>
        </el-card>
      </el-col>
    </el-row>

    <el-card shadow="never">
      <el-menu :default-active="activeMenu" class="user-menu">
        <el-menu-item index="publish" @click="activeMenu = 'publish'">
          <el-icon><List /></el-icon><span>我的发布</span>
        </el-menu-item>
        <el-menu-item index="favorite" @click="activeMenu = 'favorite'">
          <el-icon><Star /></el-icon><span>我的收藏</span>
        </el-menu-item>
        <el-menu-item index="history" @click="activeMenu = 'history'">
          <el-icon><Clock /></el-icon><span>浏览记录</span>
        </el-menu-item>
        <el-menu-item index="setting" @click="activeMenu = 'setting'">
          <el-icon><Setting /></el-icon><span>账户设置</span>
        </el-menu-item>
      </el-menu>

      <div class="menu-content">
        <el-empty v-if="activeMenu === 'publish'" description="还没有发布过内容" />
        <el-empty v-else-if="activeMenu === 'favorite'" description="还没有收藏" />
        <el-empty v-else-if="activeMenu === 'history'" description="暂无浏览记录" />
        <el-empty v-else description="账户设置功能开发中" />
      </div>
    </el-card>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { List, Star, Clock, Setting } from '@element-plus/icons-vue'

const activeMenu = ref('publish')

const stats = [
  { num: 3, label: '发布' },
  { num: 8, label: '收藏' },
  { num: 12, label: '浏览' },
  { num: 4, label: '评价' },
]
</script>

<style scoped>
.page { max-width: 960px; margin: 0 auto; }
.user-card { margin-bottom: 16px; border-radius: 12px; }
.user-info { display: flex; align-items: center; gap: 16px; }
.user-avatar { background: #409eff; }
.user-info h2 { font-size: 20px; font-weight: 700; margin: 0; }
.user-info p { color: #909399; font-size: 14px; margin: 4px 0; }
.stats-row { margin-bottom: 16px; }
.stat-card { text-align: center; border-radius: 12px; }
.stat-num { font-size: 24px; font-weight: 700; color: #303133; margin: 0; }
.stat-label { color: #909399; font-size: 12px; margin: 4px 0 0; }
.user-menu { border-right: none; }
.menu-content { padding: 24px; }
</style>
