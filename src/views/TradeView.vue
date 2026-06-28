<template>
  <section class="page">
    <div class="page-head">
      <h2>二手交易</h2>
      <p>浏览和发布校园二手商品</p>
    </div>

    <el-card shadow="never" class="toolbar">
      <el-row :gutter="16" align="middle">
        <el-col :xs="24" :sm="12">
          <el-input v-model="search" placeholder="搜索商品..." prefix-icon="Search" clearable class="search-input" />
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-select v-model="category" placeholder="全部分类" class="category-select" style="width: 100%">
            <el-option label="全部" value="all" />
            <el-option label="书籍" value="books" />
            <el-option label="数码" value="digital" />
            <el-option label="出行" value="transport" />
            <el-option label="家电" value="appliance" />
            <el-option label="娱乐" value="entertainment" />
            <el-option label="其他" value="other" />
          </el-select>
        </el-col>
      </el-row>
    </el-card>

    <el-row :gutter="16">
      <el-col v-for="item in filteredList" :key="item.id" :xs="24" :sm="12" :md="8" class="item-col">
        <el-card shadow="hover" class="item-card">
          <div class="item-img">📦</div>
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <el-tag size="small" type="warning">{{ item.category }}</el-tag>
            <p class="item-price">¥{{ item.price }}</p>
            <p class="item-meta">{{ item.location }} · {{ item.time }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-empty v-if="!filteredList.length" description="没有匹配的商品" />
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'

interface Item {
  id: number
  name: string
  category: string
  price: number
  location: string
  time: string
}

const items: Item[] = [
  { id: 1, name: '高等数学第七版', category: '书籍', price: 25, location: '二食堂', time: '2天前' },
  { id: 2, name: '机械键盘', category: '数码', price: 80, location: '图书馆', time: '1天前' },
  { id: 3, name: '电动车', category: '出行', price: 600, location: '北门', time: '3天前' },
  { id: 4, name: '台灯', category: '家电', price: 30, location: '宿舍A栋', time: '5小时前' },
  { id: 5, name: '网球拍', category: '娱乐', price: 45, location: '体育馆', time: '1周前' },
  { id: 6, name: '考研英语真题', category: '书籍', price: 15, location: '教学楼', time: '2小时前' },
]

const search = ref('')
const category = ref('all')

const filteredList = computed(() =>
  items.filter((item) => {
    const matchSearch = !search.value || item.name.includes(search.value)
    const matchCategory = category.value === 'all' || item.category === category.value
    return matchSearch && matchCategory
  })
)
</script>

<style scoped>
.page { max-width: 960px; margin: 0 auto; }
.page-head { margin-bottom: 24px; }
.page-head h2 { font-size: 22px; font-weight: 700; color: #303133; }
.page-head p { color: #909399; font-size: 14px; margin-top: 4px; }
.toolbar { margin-bottom: 24px; border-radius: 12px; }
.search-input { width: 100%; }
.item-col { margin-bottom: 16px; }
.item-card { cursor: pointer; text-align: center; border-radius: 12px; }
.item-img { font-size: 48px; padding: 16px 0 8px; }
.item-info h3 { font-size: 16px; font-weight: 600; margin: 8px 0; }
.item-price { color: #e63946; font-size: 18px; font-weight: 700; margin: 4px 0; }
.item-meta { color: #909399; font-size: 12px; margin: 0; }
</style>
