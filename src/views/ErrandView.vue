<template>
  <section class="page">
    <div class="page-head">
      <h2>跑腿委托</h2>
      <p>顺手帮个忙，赚点零花钱</p>
    </div>

    <el-radio-group v-model="tab" class="tab-bar">
      <el-radio-button value="all">全部</el-radio-button>
      <el-radio-button value="delivery">代取</el-radio-button>
      <el-radio-button value="buy">代买</el-radio-button>
      <el-radio-button value="other">其他</el-radio-button>
    </el-radio-group>

    <el-row :gutter="16">
      <el-col v-for="item in filteredList" :key="item.id" :xs="24" :sm="12" class="item-col">
        <el-card shadow="hover">
          <div class="card-header">
            <el-tag :type="item.tag === '代取' ? 'primary' : item.tag === '代买' ? 'success' : 'info'" size="small">{{ item.tag }}</el-tag>
            <span class="reward">¥{{ item.reward }}</span>
          </div>
          <h3>{{ item.title }}</h3>
          <p class="desc">{{ item.desc }}</p>
          <p class="meta">{{ item.location }} · {{ item.time }}</p>
          <el-button type="warning" size="small" plain style="width:100%;margin-top:8px">接单</el-button>
        </el-card>
      </el-col>
    </el-row>

    <el-empty v-if="!filteredList.length" description="暂无任务" />
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Task {
  id: number
  tag: string
  title: string
  desc: string
  reward: number
  location: string
  time: string
}

const tasks: Task[] = [
  { id: 1, tag: '代取', title: '取快递', desc: '菜鸟驿站取中通快递到宿舍A栋', reward: 5, location: '菜鸟驿站', time: '今天' },
  { id: 2, tag: '代买', title: '带午饭', desc: '二食堂一份黄焖鸡米饭到教学楼', reward: 3, location: '二食堂', time: '明天 11:30' },
  { id: 3, tag: '代取', title: '取打印资料', desc: '打印店取复习资料到图书馆', reward: 4, location: '打印店', time: '今天 15:00' },
  { id: 4, tag: '其他', title: '帮忙搬书', desc: '从教材科搬一箱书到宿舍', reward: 8, location: '教材科', time: '周三下午' },
  { id: 5, tag: '代买', title: '买奶茶', desc: '买两杯蜜雪冰城送到体育馆', reward: 4, location: '蜜雪冰城', time: '今天 14:00' },
]

const tab = ref('all')

const filteredList = computed(() => {
  if (tab.value === 'all') return tasks
  if (tab.value === 'delivery') return tasks.filter((t) => t.tag === '代取')
  if (tab.value === 'buy') return tasks.filter((t) => t.tag === '代买')
  return tasks.filter((t) => t.tag === '其他')
})
</script>

<style scoped>
.page { max-width: 960px; margin: 0 auto; }
.page-head { margin-bottom: 24px; }
.page-head h2 { font-size: 22px; font-weight: 700; color: #303133; }
.page-head p { color: #909399; font-size: 14px; margin-top: 4px; }
.tab-bar { margin-bottom: 24px; }
.item-col { margin-bottom: 16px; }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.reward { color: #e63946; font-size: 18px; font-weight: 700; }
.desc { color: #606266; font-size: 14px; margin: 8px 0; }
.meta { color: #909399; font-size: 12px; margin: 0; }
</style>
