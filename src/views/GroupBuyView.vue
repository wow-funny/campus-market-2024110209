<template>
  <section class="page">
    <div class="page-head">
      <h2>拼单搭子</h2>
      <p>和同学们一起拼单，省钱又省心</p>
    </div>

    <el-row :gutter="16">
      <el-col v-for="item in list" :key="item.id" :xs="24" :sm="12" :md="8" class="item-col">
        <el-card shadow="hover">
          <div class="card-header">
            <h3>{{ item.title }}</h3>
            <el-tag :type="item.tag === '拼单' ? 'warning' : 'success'" size="small">{{ item.tag }}</el-tag>
          </div>
          <p class="desc">{{ item.desc }}</p>
          <div class="progress">
            <span>{{ item.current }}/{{ item.max }}人</span>
            <el-progress :percentage="percentage(item.current, item.max)" :stroke-width="6" />
          </div>
          <p class="deadline">截止：{{ item.deadline }}</p>
          <el-button type="primary" size="small" style="width:100%;margin-top:8px">{{ item.action }}</el-button>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script setup lang="ts">
interface GroupItem {
  id: number
  title: string
  tag: string
  desc: string
  current: number
  max: number
  deadline: string
  action: string
}

function percentage(current: number, max: number): number {
  return Number(((current / max) * 100).toFixed(1))
}

const list: GroupItem[] = [
  { id: 1, title: '奶茶第二杯半价', tag: '拼单', desc: '一点点奶茶，第二杯半价！', current: 1, max: 2, deadline: '今天 18:00', action: '加入拼单' },
  { id: 2, title: '羽毛球组队', tag: '搭子', desc: '周末羽毛球，缺2人', current: 2, max: 4, deadline: '周六 10:00', action: '加入队伍' },
  { id: 3, title: '外卖凑单满减', tag: '拼单', desc: '美团外卖满30减10，差一人', current: 1, max: 2, deadline: '今天 12:00', action: '加入拼单' },
  { id: 4, title: '图书馆占座组队', tag: '搭子', desc: '期末复习，互相监督', current: 1, max: 3, deadline: '长期', action: '加入队伍' },
  { id: 5, title: '水果拼单', tag: '拼单', desc: '整箱车厘子拼单', current: 2, max: 5, deadline: '明天 20:00', action: '加入拼单' },
]
</script>

<style scoped>
.page { max-width: 960px; margin: 0 auto; }
.page-head { margin-bottom: 24px; }
.page-head h2 { font-size: 22px; font-weight: 700; color: #303133; }
.page-head p { color: #909399; font-size: 14px; margin-top: 4px; }
.item-col { margin-bottom: 16px; }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.card-header h3 { font-size: 16px; font-weight: 600; margin: 0; }
.desc { color: #606266; font-size: 14px; margin: 8px 0; }
.progress { margin: 12px 0; }
.progress span { font-size: 12px; color: #909399; }
.deadline { color: #909399; font-size: 12px; margin: 0; }
</style>
