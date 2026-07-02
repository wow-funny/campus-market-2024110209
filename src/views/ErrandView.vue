<template>
  <section class="page">
    <div class="page-header page-header--errand">
      <h1>跑腿委托</h1>
      <p>顺手帮个忙，赚点零花钱。</p>
    </div>

    <SearchBar
      v-model="keyword"
      placeholder="搜索标题、任务类型、取件或送达地点"
    />

    <LoadingState v-if="loading" text="正在加载跑腿委托信息..." />

    <ErrorState
      v-else-if="error"
      message="数据加载失败，请检查 Mock 服务是否正常运行。"
      show-retry
      @retry="loadErrands"
    />

    <div v-else-if="filteredItems.length" class="list">
      <ItemCard
        v-for="item in filteredItems"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.taskType"
        :location="`${item.from} → ${item.to}`"
        :time="item.deadline"
      >
        <template #footer>
          <strong>￥{{ item.reward }}</strong>
        </template>
      </ItemCard>
    </div>

    <EmptyState v-else :text="keyword ? '未找到相关委托' : '暂无跑腿委托信息'" />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import LoadingState from '../components/LoadingState.vue'
import ErrorState from '../components/ErrorState.vue'
import SearchBar from '../components/SearchBar.vue'
import { getErrands, type ErrandItem } from '../api/errand'

const errands = ref<ErrandItem[]>([])
const loading = ref(false)
const error = ref(false)
const keyword = ref('')

const filteredItems = computed(() => {
  if (!keyword.value) return errands.value
  const kw = keyword.value.toLowerCase()
  return errands.value.filter(
    (item) =>
      item.title.toLowerCase().includes(kw) ||
      item.taskType.toLowerCase().includes(kw) ||
      item.from.toLowerCase().includes(kw) ||
      item.to.toLowerCase().includes(kw) ||
      item.description.toLowerCase().includes(kw),
  )
})

async function loadErrands() {
  loading.value = true
  error.value = false
  try {
    const res = await getErrands()
    errands.value = res.data
  } catch {
    error.value = true
    errands.value = []
  } finally {
    loading.value = false
  }
}

onMounted(loadErrands)
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
</style>
