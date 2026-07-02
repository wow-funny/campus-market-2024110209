<template>
  <section class="page">
    <div class="page-header page-header--lostfound">
      <h1>失物招领</h1>
      <p>发布和查看失物 / 招领信息，互帮互助。</p>
    </div>

    <div class="filter-bar">
      <SearchBar
        v-model="keyword"
        placeholder="搜索标题、物品名称、地点或描述"
      />
      <select v-model="typeFilter" class="type-select">
        <option value="">全部类型</option>
        <option value="lost">寻物</option>
        <option value="found">招领</option>
      </select>
    </div>

    <LoadingState v-if="loading" text="正在加载失物招领信息..." />

    <ErrorState
      v-else-if="error"
      message="数据加载失败，请检查 Mock 服务是否正常运行。"
      show-retry
      @retry="loadLostFounds"
    />

    <div v-else-if="filteredItems.length" class="list">
      <ItemCard
        v-for="item in filteredItems"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.type === 'lost' ? '寻物' : '招领'"
        :location="item.location"
        :time="item.eventTime"
      />
    </div>

    <EmptyState v-else :text="keyword || typeFilter ? '未找到相关结果' : '暂无失物招领信息'" />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import LoadingState from '../components/LoadingState.vue'
import ErrorState from '../components/ErrorState.vue'
import SearchBar from '../components/SearchBar.vue'
import { getLostFounds, type LostFoundItem } from '../api/lostFound'

const lostFounds = ref<LostFoundItem[]>([])
const loading = ref(false)
const error = ref(false)
const keyword = ref('')
const typeFilter = ref('')

const filteredItems = computed(() => {
  return lostFounds.value.filter((item) => {
    const matchType = !typeFilter.value || item.type === typeFilter.value
    const matchKeyword =
      !keyword.value ||
      item.title.includes(keyword.value) ||
      item.itemName.includes(keyword.value) ||
      item.location.includes(keyword.value) ||
      item.description.includes(keyword.value)
    return matchType && matchKeyword
  })
})

async function loadLostFounds() {
  loading.value = true
  error.value = false
  try {
    const res = await getLostFounds()
    lostFounds.value = res.data
  } catch {
    error.value = true
    lostFounds.value = []
  } finally {
    loading.value = false
  }
}

onMounted(loadLostFounds)
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.filter-bar {
  display: flex;
  gap: 12px;
  align-items: center;
}

.filter-bar > :first-child {
  flex: 1;
}

.type-select {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  background: #fff;
  color: #374151;
  cursor: pointer;
}

.list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
</style>
