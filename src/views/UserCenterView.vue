<template>
  <section class="page">
    <div class="profile-card">
      <div class="avatar">
        {{ userStore.displayName.slice(0, 1) }}
      </div>

      <div>
        <h1>{{ userStore.displayName }}</h1>
        <p>{{ userStore.userDescription }}</p>
        <p>{{ userStore.currentUser?.bio }}</p>
      </div>
    </div>

    <div class="panel">
      <h2>我的收藏</h2>

      <EmptyState
        v-if="favoriteStore.favorites.length === 0"
        text="暂无收藏内容"
      />

      <div v-else class="favorite-list">
        <ItemCard
          v-for="item in favoriteStore.favorites"
          :key="`${item.type}-${item.id}`"
          :title="item.title"
          :description="item.description"
          :tag="getTypeLabel(item.type)"
          :location="item.location"
        >
          <template #footer>
            <button class="remove-btn" @click="favoriteStore.removeFavorite(item.type, item.id)">
              取消收藏
            </button>
          </template>
        </ItemCard>
      </div>
    </div>

    <div class="panel">
      <h2>我的发布</h2>

      <div v-if="loading" class="loading-tip">加载中...</div>

      <EmptyState
        v-else-if="myPublishedItems.length === 0"
        text="还没有发布过内容"
      />

      <div v-else class="favorite-list">
        <ItemCard
          v-for="item in myPublishedItems"
          :key="`${item.type}-${item.id}`"
          :title="item.title"
          :description="item.description"
          :tag="getTypeLabel(item.type)"
          :location="item.location"
          :time="item.time"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import EmptyState from '../components/EmptyState.vue'
import ItemCard from '../components/ItemCard.vue'
import { useFavoriteStore } from '../stores/favorite'
import { useUserStore } from '../stores/user'
import { getTrades, type TradeItem } from '../api/trade'
import { getLostFounds, type LostFoundItem } from '../api/lostFound'
import { getGroupBuys, type GroupBuyItem } from '../api/groupBuy'
import { getErrands, type ErrandItem } from '../api/errand'

interface PublishedItem {
  id: number | string
  type: string
  title: string
  description: string
  location?: string
  time?: string
}

const userStore = useUserStore()
const favoriteStore = useFavoriteStore()
const route = useRoute()

const trades = ref<TradeItem[]>([])
const lostFounds = ref<LostFoundItem[]>([])
const groupBuys = ref<GroupBuyItem[]>([])
const errands = ref<ErrandItem[]>([])
const loading = ref(true)

async function fetchMyPublished() {
  loading.value = true

  const results = await Promise.allSettled([
    getTrades(),
    getLostFounds(),
    getGroupBuys(),
    getErrands(),
  ])

  const [tResult, lfResult, gbResult, eResult] = results

  if (tResult.status === 'fulfilled') {
    trades.value = tResult.value.data
  } else {
    ElMessage.error('加载二手交易数据失败')
  }

  if (lfResult.status === 'fulfilled') {
    lostFounds.value = lfResult.value.data
  } else {
    ElMessage.error('加载失物招领数据失败')
  }

  if (gbResult.status === 'fulfilled') {
    groupBuys.value = gbResult.value.data
  } else {
    ElMessage.error('加载拼单数据失败')
  }

  if (eResult.status === 'fulfilled') {
    errands.value = eResult.value.data
  } else {
    ElMessage.error('加载跑腿数据失败')
  }

  loading.value = false
}

onMounted(fetchMyPublished)

watch(() => route.path, fetchMyPublished)

const myPublishedItems = computed<PublishedItem[]>(() => {
  const publisherName = userStore.displayName
  const items: PublishedItem[] = []
  let fallbackId = 0

  for (const item of trades.value) {
    if (item.publisher === publisherName) {
      items.push({
        id: item.id ?? `fallback-${fallbackId++}`,
        type: 'trade',
        title: item.title,
        description: item.description,
        location: item.location,
        time: item.publishTime,
      })
    }
  }

  for (const item of lostFounds.value) {
    if ('publisher' in item && item.publisher === publisherName) {
      items.push({
        id: item.id ?? `fallback-${fallbackId++}`,
        type: 'lostFound',
        title: item.title,
        description: item.description,
        location: item.location,
        time: item.eventTime,
      })
    }
  }

  for (const item of groupBuys.value) {
    if (item.publisher === publisherName) {
      items.push({
        id: item.id ?? `fallback-${fallbackId++}`,
        type: 'groupBuy',
        title: item.title,
        description: item.description,
        location: item.location,
        time: item.deadline,
      })
    }
  }

  for (const item of errands.value) {
    if (item.publisher === publisherName) {
      items.push({
        id: item.id ?? `fallback-${fallbackId++}`,
        type: 'errand',
        title: item.title,
        description: item.description,
        location: `${item.from} → ${item.to}`,
        time: item.deadline,
      })
    }
  }

  return items
})

function getTypeLabel(type: string) {
  const map: Record<string, string> = {
    trade: '二手交易',
    lostFound: '失物招领',
    groupBuy: '拼单搭子',
    errand: '跑腿委托',
  }

  return map[type] || '校园信息'
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-card,
.panel {
  padding: 24px;
  border-radius: var(--campus-radius);
  background: var(--campus-card-bg);
  border: 1px solid var(--campus-border);
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 20px;
  background: linear-gradient(135deg, #eef2ff 0%, #ffffff 60%);
}

.avatar {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  font-size: 30px;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
}

.profile-card h1,
.panel h2 {
  margin: 0 0 8px;
  font-size: 20px;
  color: var(--campus-text);
}

.profile-card p {
  margin: 4px 0;
  color: var(--campus-text-secondary);
  line-height: 1.6;
}

.favorite-list {
  display: grid;
  gap: 16px;
}

.remove-btn {
  border: none;
  border-radius: 999px;
  padding: 5px 12px;
  cursor: pointer;
  background: #f1f5f9;
  color: #64748b;
  font-size: 13px;
  transition: all 0.2s;
}

.remove-btn:hover {
  background: #fee2e2;
  color: #ef4444;
}

.loading-tip {
  padding: 40px 0;
  text-align: center;
  color: #94a3b8;
  font-size: 14px;
}
</style>
