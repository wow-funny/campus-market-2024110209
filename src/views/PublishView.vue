<template>
  <section class="page">
    <div class="page-head">
      <h2>发布信息</h2>
      <p>填写以下信息发布您的商品/信息，让更多同学看到</p>
    </div>

    <el-card shadow="never">
      <el-tabs v-model="type">
        <el-tab-pane label="二手商品" name="trade">
          <el-form label-width="80px">
            <el-form-item label="商品名称"><el-input v-model="form.title" placeholder="输入商品名称" /></el-form-item>
            <el-form-item label="分类">
              <el-select v-model="form.category" placeholder="选择分类" style="width:100%">
                <el-option label="书籍" value="books" />
                <el-option label="数码" value="digital" />
                <el-option label="出行" value="transport" />
                <el-option label="家电" value="appliance" />
                <el-option label="娱乐" value="entertainment" />
                <el-option label="其他" value="other" />
              </el-select>
            </el-form-item>
            <el-form-item label="价格"><el-input v-model="form.price" placeholder="输入价格" /></el-form-item>
            <el-form-item label="描述"><el-input v-model="form.desc" type="textarea" :rows="3" placeholder="描述商品情况" /></el-form-item>
            <el-form-item><el-button type="primary" @click="handlePublish">发布商品</el-button></el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="失物招领" name="lost">
          <el-form label-width="80px">
            <el-form-item label="类型">
              <el-radio-group v-model="lostType">
                <el-radio value="lost">寻物</el-radio>
                <el-radio value="found">招领</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="物品名称"><el-input v-model="form.title" placeholder="输入物品名称" /></el-form-item>
            <el-form-item label="丢失/拾到地点"><el-input v-model="form.location" placeholder="输入地点" /></el-form-item>
            <el-form-item label="描述"><el-input v-model="form.desc" type="textarea" :rows="3" /></el-form-item>
            <el-form-item label="联系方式"><el-input v-model="form.contact" placeholder="手机号或QQ" /></el-form-item>
            <el-form-item><el-button type="primary" @click="handlePublish">发布信息</el-button></el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="拼单搭子" name="group">
          <el-form label-width="80px">
            <el-form-item label="标题"><el-input v-model="form.title" placeholder="例如：奶茶拼单" /></el-form-item>
            <el-form-item label="描述"><el-input v-model="form.desc" type="textarea" :rows="3" /></el-form-item>
            <el-form-item label="人数"><el-input-number v-model="form.max" :min="2" :max="20" /></el-form-item>
            <el-form-item><el-button type="primary" @click="handlePublish">发布活动</el-button></el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="跑腿委托" name="errand">
          <el-form label-width="80px">
            <el-form-item label="任务标题"><el-input v-model="form.title" placeholder="例如：取快递" /></el-form-item>
            <el-form-item label="任务地点"><el-input v-model="form.location" placeholder="取件/办理地点" /></el-form-item>
            <el-form-item label="悬赏金额"><el-input v-model="form.price" placeholder="单位：元" /></el-form-item>
            <el-form-item label="任务描述"><el-input v-model="form.desc" type="textarea" :rows="3" /></el-form-item>
            <el-form-item><el-button type="primary" @click="handlePublish">发布任务</el-button></el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const type = ref('trade')
const lostType = ref('lost')

const form = reactive({
  title: '',
  category: '',
  price: '',
  desc: '',
  location: '',
  contact: '',
  max: 2,
})

function handlePublish() {
  ElMessage.success('发布成功！（演示功能）')
}
</script>

<style scoped>
.page { max-width: 960px; margin: 0 auto; }
.page-head { margin-bottom: 24px; }
.page-head h2 { font-size: 22px; font-weight: 700; color: #303133; }
.page-head p { color: #909399; font-size: 14px; margin-top: 4px; }
</style>
