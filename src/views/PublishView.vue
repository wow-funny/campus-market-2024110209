<template>
  <section class="page">
    <div class="page-header page-header--publish">
      <h2>发布信息</h2>
      <p>填写以下信息发布您的商品/信息，让更多同学看到</p>
    </div>

    <el-card shadow="never">
      <FormField label="发布类型" required>
        <el-radio-group v-model="publishType">
          <el-radio value="trade">二手商品</el-radio>
          <el-radio value="lostFound">失物招领</el-radio>
          <el-radio value="groupBuy">拼单搭子</el-radio>
          <el-radio value="errand">跑腿委托</el-radio>
        </el-radio-group>
      </FormField>

      <el-divider />

      <!-- Common fields -->
      <FormField label="标题" required :error="errors.title">
        <el-input v-model="form.title" :placeholder="placeholders('title')" />
      </FormField>

      <FormField label="地点" required :error="errors.location">
        <el-input v-model="form.location" :placeholder="placeholders('location')" />
      </FormField>

      <FormField label="描述" required :error="errors.description">
        <el-input v-model="form.description" type="textarea" :rows="3" :placeholder="placeholders('description')" />
      </FormField>

      <!-- Trade-specific fields -->
      <template v-if="publishType === 'trade'">
        <FormField label="商品分类" required :error="errors.category">
          <el-input v-model="form.category" placeholder="如：数码配件、教材资料、生活用品" />
        </FormField>

        <FormField label="价格" required :error="errors.price">
          <el-input v-model.number="form.price" type="number" min="0" placeholder="请输入价格（元）" />
        </FormField>

        <FormField label="成色" required :error="errors.condition">
          <el-select v-model="form.condition" placeholder="请选择成色" style="width:100%">
            <el-option label="全新" value="全新" />
            <el-option label="九成新" value="九成新" />
            <el-option label="八成新" value="八成新" />
            <el-option label="正常使用痕迹" value="正常使用痕迹" />
          </el-select>
        </FormField>
      </template>

      <!-- LostFound-specific fields -->
      <template v-if="publishType === 'lostFound'">
        <FormField label="信息类型" required>
          <el-radio-group v-model="form.lostFoundType">
            <el-radio value="lost">寻物</el-radio>
            <el-radio value="found">招领</el-radio>
          </el-radio-group>
        </FormField>

        <FormField label="物品名称" required :error="errors.itemName">
          <el-input v-model="form.itemName" placeholder="如：黑色校园卡、蓝色保温杯" />
        </FormField>

        <FormField label="发生时间" required :error="errors.eventTime">
          <el-input v-model="form.eventTime" type="datetime-local" placeholder="选择遗失或拾取时间" />
        </FormField>
      </template>

      <!-- GroupBuy-specific fields -->
      <template v-if="publishType === 'groupBuy'">
        <FormField label="拼单类型" required :error="errors.groupType">
          <el-input v-model="form.groupType" placeholder="如：拼餐、资料团购、运动搭子" />
        </FormField>

        <FormField label="目标人数" required :error="errors.targetCount">
          <el-input v-model.number="form.targetCount" type="number" min="2" placeholder="请输入目标人数" />
        </FormField>

        <FormField label="截止时间" required :error="errors.deadline">
          <el-input v-model="form.deadline" type="datetime-local" />
        </FormField>
      </template>

      <!-- Errand-specific fields -->
      <template v-if="publishType === 'errand'">
        <FormField label="任务类型" required :error="errors.taskType">
          <el-input v-model="form.taskType" placeholder="如：取快递、代买、代送" />
        </FormField>

        <FormField label="酬劳" required :error="errors.reward">
          <el-input v-model.number="form.reward" type="number" min="0" placeholder="请输入酬劳" />
        </FormField>

        <FormField label="取件地点" required :error="errors.from">
          <el-input v-model="form.from" placeholder="如：菜鸟驿站、c教102" />
        </FormField>

        <FormField label="送达地点" required :error="errors.to">
          <el-input v-model="form.to" placeholder="如：东区宿舍、图书馆" />
        </FormField>

        <FormField label="截止时间" required :error="errors.deadline">
          <el-input v-model="form.deadline" type="datetime-local" />
        </FormField>
      </template>

      <el-divider />

      <form class="publish-form" @submit.prevent="handleSubmit">
        <div class="actions">
          <el-button native-type="submit" type="primary" size="large" :loading="submitting">发布</el-button>
          <el-button size="large" @click="resetForm">重置</el-button>
        </div>
      </form>
    </el-card>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

import FormField from '../components/FormField.vue'
import { createTrade } from '../api/trade'
import { createLostFound } from '../api/lostFound'
import { createGroupBuy } from '../api/groupBuy'
import { createErrand } from '../api/errand'
import { useUserStore } from '../stores/user'

type PublishType = 'trade' | 'lostFound' | 'groupBuy' | 'errand'

const router = useRouter()
const userStore = useUserStore()
const publishType = ref<PublishType>('trade')

function placeholders(field: 'title' | 'location' | 'description') {
  const map: Record<PublishType, Record<string, string>> = {
    trade: {
      title: '如：九成新机械键盘',
      location: '如：东区宿舍',
      description: '请描述物品状况、交易方式等关键信息',
    },
    lostFound: {
      title: '如：寻找黑色校园卡',
      location: '如：图书馆门口',
      description: '请描述物品外观特征、遗失或拾取时间地点',
    },
    groupBuy: {
      title: '如：一起拼奶茶',
      location: '如：食堂二楼',
      description: '请描述拼单详情、费用分摊方式',
    },
    errand: {
      title: '如：帮取快递',
      location: '如：菜鸟驿站',
      description: '请描述任务要求、送达时限等',
    },
  }
  return map[publishType.value][field]
}

watch(publishType, () => {
  resetForm()
  ElMessage.info('已切换发布类型，请填写对应信息')
})
const submitting = ref(false)

const form = reactive({
  title: '',
  location: '',
  description: '',
  category: '',
  price: 0,
  condition: '',
  lostFoundType: 'lost',
  itemName: '',
  eventTime: '',
  groupType: '',
  targetCount: 2,
  deadline: '',
  taskType: '',
  reward: 0,
  from: '',
  to: '',
})

const errors = reactive<Record<string, string>>({})

function clearErrors() {
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })
}

function validateForm() {
  clearErrors()

  if (!form.title) {
    errors.title = '请输入标题'
  }

  if (!form.location) {
    errors.location = '请输入地点'
  }

  if (!form.description) {
    errors.description = '请输入描述'
  }

  if (publishType.value === 'trade') {
    if (!form.category) {
      errors.category = '请输入商品分类'
    }
    if (form.price <= 0) {
      errors.price = '价格应大于 0'
    }
    if (!form.condition) {
      errors.condition = '请选择商品成色'
    }
  }

  if (publishType.value === 'lostFound') {
    if (!form.itemName) {
      errors.itemName = '请输入物品名称'
    }
    if (!form.eventTime) {
      errors.eventTime = '请选择发生时间'
    }
  }

  if (publishType.value === 'groupBuy') {
    if (!form.groupType) {
      errors.groupType = '请输入拼单类型'
    }
    if (form.targetCount < 2) {
      errors.targetCount = '目标人数不能少于 2 人'
    }
    if (!form.deadline) {
      errors.deadline = '请选择截止时间'
    }
  }

  if (publishType.value === 'errand') {
    if (!form.taskType) {
      errors.taskType = '请输入任务类型'
    }
    if (form.reward < 0) {
      errors.reward = '酬劳不能为负数'
    }
    if (!form.from) {
      errors.from = '请输入取件地点'
    }
    if (!form.to) {
      errors.to = '请输入送达地点'
    }
    if (!form.deadline) {
      errors.deadline = '请选择截止时间'
    }
  }

  return Object.values(errors).every((message) => !message)
}

function getCurrentTime() {
  const now = new Date()
  return now.toISOString().slice(0, 16).replace('T', ' ')
}

async function handleSubmit() {
  if (!validateForm()) {
    return
  }

  if (!userStore.isLoggedIn || !userStore.currentUser) {
    ElMessage.warning('请先登录后再发布信息')
    router.push('/login')
    return
  }

  submitting.value = true

  try {
    if (publishType.value === 'trade') {
      await createTrade({
        title: form.title,
        category: form.category,
        price: form.price,
        condition: form.condition,
        location: form.location,
        publisher: userStore.displayName,
        publishTime: getCurrentTime(),
        image: '',
        status: 'open',
        description: form.description,
      })

      ElMessage.success('二手商品发布成功')
      router.push('/trade')
    }

    if (publishType.value === 'lostFound') {
      await createLostFound({
        title: form.title,
        type: form.lostFoundType as 'lost' | 'found',
        itemName: form.itemName,
        location: form.location,
        eventTime: form.eventTime,
        contact: '站内消息联系',
        status: 'open',
        description: form.description,
      })

      ElMessage.success('失物招领信息发布成功')
      router.push('/lost-found')
    }

    if (publishType.value === 'groupBuy') {
      await createGroupBuy({
        title: form.title,
        type: form.groupType,
        targetCount: form.targetCount,
        currentCount: 1,
        deadline: form.deadline,
        location: form.location,
        publisher: userStore.displayName,
        status: 'open',
        description: form.description,
      })

      ElMessage.success('拼单搭子信息发布成功')
      router.push('/group-buy')
    }

    if (publishType.value === 'errand') {
      await createErrand({
        title: form.title,
        taskType: form.taskType,
        reward: form.reward,
        from: form.from,
        to: form.to,
        deadline: form.deadline,
        publisher: userStore.displayName,
        status: 'open',
        description: form.description,
      })

      ElMessage.success('跑腿委托发布成功')
      router.push('/errand')
    }
  } catch {
    ElMessage.error('发布失败，请确认 JSON Server 已启动，并检查表单数据是否完整。')
  } finally {
    submitting.value = false
  }
}

function resetForm() {
  form.title = ''
  form.location = ''
  form.description = ''
  form.category = ''
  form.price = 0
  form.condition = ''
  form.lostFoundType = 'lost'
  form.itemName = ''
  form.eventTime = ''
  form.groupType = ''
  form.targetCount = 2
  form.deadline = ''
  form.taskType = ''
  form.reward = 0
  form.from = ''
  form.to = ''

  clearErrors()
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
