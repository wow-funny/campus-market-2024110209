<template>
  <section class="page">
    <div class="page-head">
      <h2>失物招领</h2>
      <p>发布和查看失物/招领信息</p>
    </div>

    <el-radio-group v-model="tab" class="tab-bar">
      <el-radio-button value="all">全部</el-radio-button>
      <el-radio-button value="lost">寻物</el-radio-button>
      <el-radio-button value="found">招领</el-radio-button>
    </el-radio-group>

    <el-timeline>
      <el-timeline-item v-for="item in filteredList" :key="item.id" :timestamp="item.time" placement="top">
        <el-card shadow="hover">
          <el-tag :type="item.type === 'lost' ? 'danger' : 'success'" size="small">
            {{ item.type === 'lost' ? '寻物' : '招领' }}
          </el-tag>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
          <p class="meta">{{ item.location }} · 联系人：{{ item.contact }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>

    <el-empty v-if="!filteredList.length" description="暂无记录" />
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface LostItem {
  id: number
  type: 'lost' | 'found'
  title: string
  desc: string
  location: string
  contact: string
  time: string
}

const items: LostItem[] = [
  { id: 1, type: 'lost', title: '棕色钱包', desc: '内含校园卡和少量现金，望拾到者联系', location: '二食堂', contact: '138****1234', time: '2024-05-20' },
  { id: 2, type: 'found', title: '黑色耳机盒', desc: '在图书馆三楼捡到AirPods耳机盒', location: '图书馆三楼', contact: '李同学', time: '2024-05-19' },
  { id: 3, type: 'lost', title: '蓝色保温杯', desc: '膳魔师蓝色保温杯，放在自习室忘记拿了', location: '教学楼A座203', contact: '王同学', time: '2024-05-18' },
  { id: 4, type: 'found', title: '学生证', desc: '捡到张伟同学的学生证', location: '操场', contact: '刘同学', time: '2024-05-17' },
]

const tab = ref('all')

const filteredList = computed(() => {
  if (tab.value === 'all') return items
  return items.filter((item) => item.type === tab.value)
})
</script>

<style scoped>
.page { max-width: 960px; margin: 0 auto; }
.page-head { margin-bottom: 24px; }
.page-head h2 { font-size: 22px; font-weight: 700; color: #303133; }
.page-head p { color: #909399; font-size: 14px; margin-top: 4px; }
.tab-bar { margin-bottom: 24px; }
.meta { color: #909399; font-size: 12px; margin-top: 8px; }
</style>
