<template>
  <section class="page">
    <div class="hero">
      <div class="hero-content">
        <h1>校园轻集市</h1>
        <p class="hero-sub">二手交易 · 失物招领 · 拼单搭子 · 跑腿委托</p>
        <p class="hero-desc">专为校园打造的轻量级信息发布与交易平台</p>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="hero-stat-num">1,200+</span>
            <span class="hero-stat-label">活跃用户</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-num">3,500+</span>
            <span class="hero-stat-label">成交订单</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-num">98%</span>
            <span class="hero-stat-label">好评率</span>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-head">
        <h2>服务分类</h2>
        <p>选择你需要的功能，快速开始</p>
      </div>
      <el-row :gutter="20">
        <el-col v-for="(item, index) in categories" :key="item.path" :xs="12" :sm="8" :md="6" class="category-col">
          <el-card shadow="never" class="category-card" :class="`card-${index}`" @click="navigate(item.path)">
            <div class="card-icon-wrap">
              <el-icon :size="28" class="card-icon"><component :is="item.icon" /></el-icon>
            </div>
            <h3>{{ item.name }}</h3>
            <p>{{ item.desc }}</p>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="section">
      <div class="section-head">
        <h2>平台动态</h2>
        <p>看看最近同学们都在做什么</p>
      </div>
      <el-row :gutter="16">
        <el-col :xs="24" :md="12">
          <el-card shadow="never" class="info-card">
            <template #header>
              <span>📢 公告</span>
            </template>
            <div v-for="notice in notices" :key="notice.id" class="info-item">
              <el-tag :type="notice.tag === '系统' ? 'danger' : 'warning'" size="small">{{ notice.tag }}</el-tag>
              <span class="info-text">{{ notice.text }}</span>
              <span class="info-time">{{ notice.time }}</span>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :md="12">
          <el-card shadow="never" class="info-card">
            <template #header>
              <span>🔥 热门推荐</span>
            </template>
            <div v-for="hot in hotItems" :key="hot.id" class="info-item hot-item" @click="navigate('/trade')">
              <span class="hot-rank" :class="{ top: hot.rank <= 3 }">{{ hot.rank }}</span>
              <span class="info-text">{{ hot.name }}</span>
              <span class="hot-price">¥{{ hot.price }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ShoppingCart, WarningFilled, MessageBox, Plus, Bell, TakeawayBox, UserFilled } from '@element-plus/icons-vue'

interface Category {
  name: string
  path: string
  icon: unknown
  desc: string
}

const categories: Category[] = [
  { name: '二手交易', path: '/trade', icon: ShoppingCart, desc: '买卖闲置物品' },
  { name: '失物招领', path: '/lost-found', icon: WarningFilled, desc: '发布/寻找失物' },
  { name: '拼单搭子', path: '/group-buy', icon: MessageBox, desc: '拼单组队' },
  { name: '跑腿委托', path: '/errand', icon: TakeawayBox, desc: '顺手帮个忙' },
  { name: '发布信息', path: '/publish', icon: Plus, desc: '发布商品或信息' },
  { name: '消息中心', path: '/message', icon: Bell, desc: '查看消息通知' },
  { name: '个人中心', path: '/user', icon: UserFilled, desc: '管理个人资料' },
]

const notices = [
  { id: 1, tag: '系统', text: '平台新增实名认证功能，请及时认证', time: '1小时前' },
  { id: 2, tag: '活动', text: '毕业季二手交易专场火热进行中', time: '3小时前' },
  { id: 3, tag: '系统', text: '失物招领模块已升级，支持图片上传', time: '昨天' },
  { id: 4, tag: '活动', text: '拼单搭子 "夏日奶茶节" 活动上线', time: '2天前' },
]

const hotItems = [
  { id: 1, rank: 1, name: '高等数学第七版', price: 25 },
  { id: 2, rank: 2, name: '机械键盘', price: 80 },
  { id: 3, rank: 3, name: '电动车', price: 600 },
  { id: 4, rank: 4, name: '考研英语真题', price: 15 },
]

const router = useRouter()
function navigate(path: string) {
  router.push(path)
}
</script>

<style scoped>
.page {
  max-width: 960px;
  margin: 0 auto;
}

/* ---- Hero ---- */
.hero {
  background: linear-gradient(135deg, #409eff 0%, #337ecc 50%, #1d7db5 100%);
  border-radius: 16px;
  padding: 48px 40px;
  margin-bottom: 32px;
  text-align: center;
  color: #fff;
}

.hero-content h1 {
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 8px;
  letter-spacing: 2px;
}

.hero-sub {
  font-size: 15px;
  opacity: 0.9;
  margin: 0 0 6px;
}

.hero-desc {
  font-size: 13px;
  opacity: 0.7;
  margin: 0 0 24px;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.hero-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-stat-num {
  font-size: 22px;
  font-weight: 700;
}

.hero-stat-label {
  font-size: 12px;
  opacity: 0.8;
  margin-top: 2px;
}

/* ---- Section ---- */
.section {
  margin-bottom: 32px;
}

.section-head {
  margin-bottom: 16px;
}

.section-head h2 {
  font-size: 20px;
  font-weight: 700;
  color: #303133;
  margin: 0;
}

.section-head p {
  font-size: 13px;
  color: #909399;
  margin: 4px 0 0;
}

/* ---- Category Cards ---- */
.category-col {
  margin-bottom: 20px;
}

.category-card {
  cursor: pointer;
  text-align: center;
  padding: 28px 12px 20px;
  border-radius: 14px;
  border: 1px solid #ebeef5;
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.card-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  transition: background 0.3s;
}

.card-0 .card-icon-wrap { background: #ecf5ff; }
.card-0:hover .card-icon-wrap { background: #409eff; }
.card-0 .card-icon { color: #409eff; }
.card-0:hover .card-icon { color: #fff; }

.card-1 .card-icon-wrap { background: #fef0f0; }
.card-1:hover .card-icon-wrap { background: #f56c6c; }
.card-1 .card-icon { color: #f56c6c; }
.card-1:hover .card-icon { color: #fff; }

.card-2 .card-icon-wrap { background: #fdf6ec; }
.card-2:hover .card-icon-wrap { background: #e6a23c; }
.card-2 .card-icon { color: #e6a23c; }
.card-2:hover .card-icon { color: #fff; }

.card-3 .card-icon-wrap { background: #f0f9eb; }
.card-3:hover .card-icon-wrap { background: #67c23a; }
.card-3 .card-icon { color: #67c23a; }
.card-3:hover .card-icon { color: #fff; }

.card-4 .card-icon-wrap { background: #f5f0ff; }
.card-4:hover .card-icon-wrap { background: #9b59b6; }
.card-4 .card-icon { color: #9b59b6; }
.card-4:hover .card-icon { color: #fff; }

.card-5 .card-icon-wrap { background: #e6f7ff; }
.card-5:hover .card-icon-wrap { background: #13c2c2; }
.card-5 .card-icon { color: #13c2c2; }
.card-5:hover .card-icon { color: #fff; }

.card-6 .card-icon-wrap { background: #fff7e6; }
.card-6:hover .card-icon-wrap { background: #fa8c16; }
.card-6 .card-icon { color: #fa8c16; }
.card-6:hover .card-icon { color: #fff; }

.category-card h3 {
  font-size: 15px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 4px;
}

.category-card p {
  font-size: 12px;
  color: #909399;
  margin: 0;
}

/* ---- Info Cards ---- */
.info-card {
  border-radius: 14px;
  height: 100%;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
  font-size: 13px;
}

.info-item:last-child {
  border-bottom: none;
}

.info-text {
  flex: 1;
  color: #606266;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.info-time {
  color: #c0c4cc;
  font-size: 12px;
  flex-shrink: 0;
}

.hot-item {
  cursor: pointer;
  transition: background 0.2s;
  border-radius: 4px;
  padding: 10px 4px;
}

.hot-item:hover {
  background: #f5f7fa;
}

.hot-rank {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #909399;
  background: #f5f5f5;
  flex-shrink: 0;
}

.hot-rank.top {
  color: #fff;
  background: #e6a23c;
}

.hot-price {
  font-weight: 600;
  color: #e63946;
  flex-shrink: 0;
}
</style>
