<template>
  <section class="page">
    <div class="page-header page-header--groupbuy">
      <h1>拼单搭子</h1>
      <p>和同学们一起拼单，省钱又省心。</p>
    </div>

    <SearchBar
      v-model="keyword"
      placeholder="搜索标题、类型、地点或描述"
    />

    <LoadingState v-if="loading" text="正在加载拼单搭子信息..." />

    <ErrorState
      v-else-if="error"
      message="数据加载失败，请检查 Mock 服务是否正常运行。"
      show-retry
      @retry="loadGroupBuys"
    />

    <div v-else-if="filteredItems.length" class="list">
      <ItemCard
        v-for="item in filteredItems"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.type"
        :location="item.location"
        :time="item.deadline"
      >
        <template #footer>
          <span class="progress">{{ item.currentCount }} / {{ item.targetCount }} 人</span>
        </template>
      </ItemCard>
    </div>

    <EmptyState v-else :text="keyword ? '未找到相关拼单' : '暂无拼单搭子信息'" />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import LoadingState from '../components/LoadingState.vue'
import ErrorState from '../components/ErrorState.vue'
import SearchBar from '../components/SearchBar.vue'
import { getGroupBuys, type GroupBuyItem } from '../api/groupBuy'

const groupBuys = ref<GroupBuyItem[]>([])
const loading = ref(false)
const error = ref(false)
const keyword = ref('')

const filteredItems = computed(() => {
  if (!keyword.value) return groupBuys.value
  const kw = keyword.value.toLowerCase()
  return groupBuys.value.filter(
    (item) =>
      item.title.toLowerCase().includes(kw) ||
      item.type.toLowerCase().includes(kw) ||
      item.location.toLowerCase().includes(kw) ||
      item.description.toLowerCase().includes(kw),
  )
})

async function loadGroupBuys() {
  loading.value = true
  error.value = false
  try {
    const res = await getGroupBuys()
    groupBuys.value = res.data
  } catch {
    error.value = true
    groupBuys.value = []
  } finally {
    loading.value = false
  }
}

onMounted(loadGroupBuys)
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

.progress {
  color: var(--campus-text-secondary);
  font-size: 13px;
}
</style>
