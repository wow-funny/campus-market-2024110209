<template>
  <section class="page">
    <div class="page-header page-header--trade">
      <h1>二手交易</h1>
      <p>浏览同学发布的闲置物品，发现校园内的实用好物。</p>
    </div>

    <div v-if="trades.length" class="list">
      <ItemCard
        v-for="item in trades"
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
            :class="{ 'is-favorited': favoriteStore.isFavorite('trade', item.id!) }"
            @click="favoriteStore.toggleFavorite({
              id: item.id!,
              type: 'trade',
              title: item.title,
              description: item.description,
              location: item.location
            })"
          >
            {{ favoriteStore.isFavorite('trade', item.id!) ? '★ 已收藏' : '☆ 收藏' }}
          </button>
        </template>
      </ItemCard>
    </div>

    <EmptyState v-else text="暂无二手交易信息" />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import { getTrades, type TradeItem } from '../api/trade'
import { useFavoriteStore } from '../stores/favorite'

const favoriteStore = useFavoriteStore()
const trades = ref<TradeItem[]>([])

onMounted(async () => {
  const res = await getTrades()
  trades.value = res.data
})
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
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

.favorite-btn.is-favorited {
  background: #fef3c7;
  color: #d97706;
}

.favorite-btn.is-favorited:hover {
  background: #fde68a;
}
</style>
