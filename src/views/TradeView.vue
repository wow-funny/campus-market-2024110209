<template>
  <section class="page">
    <div class="page-header page-header--trade">
      <h1>二手交易</h1>
      <p>浏览同学发布的闲置物品，发现校园内的实用好物。</p>
    </div>

    <div class="filter-bar">
      <SearchBar
        v-model="keyword"
        placeholder="搜索商品标题、分类、地点或描述"
      />
      <select v-model="categoryFilter" class="category-select">
        <option value="">全部分类</option>
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>

    <LoadingState v-if="loading" text="正在加载二手交易信息..." />

    <ErrorState
      v-else-if="error"
      message="数据加载失败，请检查 Mock 服务是否正常运行。"
      show-retry
      @retry="loadTrades"
    />

    <div v-else-if="filteredTrades.length" class="list">
      <ItemCard
        v-for="item in filteredTrades"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.category"
        :location="item.location"
        :time="item.publishTime"
      >
        <template #footer>
          <strong>￥{{ item.price }}</strong>
          <span class="condition">{{ item.condition }}</span>
          <button
            class="favorite-btn"
            :class="{ active: favoriteStore.isFavorite('trade', item.id!) }"
            @click="handleToggleFavorite(item)"
          >
            {{ favoriteStore.isFavorite('trade', item.id!) ? '已收藏' : '收藏' }}
          </button>
        </template>
      </ItemCard>
    </div>

    <EmptyState v-else :text="keyword || categoryFilter ? '未找到相关商品' : '暂无二手交易信息'" />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import LoadingState from '../components/LoadingState.vue'
import ErrorState from '../components/ErrorState.vue'
import SearchBar from '../components/SearchBar.vue'
import { getTrades, type TradeItem } from '../api/trade'
import { useFavoriteStore } from '../stores/favorite'

const favoriteStore = useFavoriteStore()
const trades = ref<TradeItem[]>([])
const loading = ref(false)
const error = ref(false)
const keyword = ref('')
const categoryFilter = ref('')

function handleToggleFavorite(item: TradeItem) {
  const isFav = favoriteStore.isFavorite('trade', item.id!)
  favoriteStore.toggleFavorite({
    id: item.id!,
    type: 'trade',
    title: item.title,
    description: item.description,
    location: item.location,
  })
  ElMessage.info(isFav ? '已取消收藏' : '已收藏')
}

const categories = computed(() => {
  const set = new Set(trades.value.map((t) => t.category))
  return Array.from(set).sort()
})

const filteredTrades = computed(() => {
  return trades.value.filter((item) => {
    const matchKeyword =
      !keyword.value ||
      item.title.toLowerCase().includes(keyword.value.toLowerCase()) ||
      item.category.toLowerCase().includes(keyword.value.toLowerCase()) ||
      item.location.toLowerCase().includes(keyword.value.toLowerCase()) ||
      item.description.toLowerCase().includes(keyword.value.toLowerCase())
    const matchCategory = !categoryFilter.value || item.category === categoryFilter.value
    return matchKeyword && matchCategory
  })
})

async function loadTrades() {
  loading.value = true
  error.value = false
  try {
    const res = await getTrades()
    trades.value = res.data
  } catch {
    error.value = true
    trades.value = []
  } finally {
    loading.value = false
  }
}

onMounted(loadTrades)
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

.category-select {
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

.condition {
  margin-left: 12px;
  color: var(--campus-text-secondary);
  font-size: 13px;
}

.favorite-btn {
  margin-left: 12px;
  border: none;
  border-radius: 999px;
  padding: 5px 12px;
  cursor: pointer;
  background: #f1f5f9;
  color: #64748b;
  font-size: 13px;
  transition: all 0.2s;
}

.favorite-btn:hover {
  background: #eef2ff;
  color: #6366f1;
}

.favorite-btn.active {
  background: #dbeafe;
  color: #2563eb;
}

.favorite-btn.active:hover {
  background: #bfdbfe;
}
</style>
