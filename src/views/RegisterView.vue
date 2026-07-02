<template>
  <section class="page auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <div class="auth-logo">M</div>
        <h1>注册账号</h1>
        <p class="desc">创建账号后，可以发布信息、收藏内容并进入个人中心。</p>
      </div>

      <el-form class="auth-form" @submit.prevent="handleRegister" label-position="top">
        <FormField label="用户名" required :error="errors.username">
          <el-input v-model.trim="form.username" placeholder="请输入用户名" :prefix-icon="User" />
        </FormField>

        <FormField label="密码" required :error="errors.password">
          <el-input v-model.trim="form.password" type="password" placeholder="请输入密码（至少6位）" :prefix-icon="Lock" show-password />
        </FormField>

        <FormField label="姓名" required :error="errors.name">
          <el-input v-model.trim="form.name" placeholder="请输入显示名称" :prefix-icon="EditPen" />
        </FormField>

        <FormField label="学院" required :error="errors.college">
          <el-input v-model.trim="form.college" placeholder="例如：计算机学院" :prefix-icon="School" />
        </FormField>

        <FormField label="年级" required :error="errors.grade">
          <el-input v-model.trim="form.grade" placeholder="例如：2023级" :prefix-icon="Timer" />
        </FormField>

        <el-button
          type="primary"
          native-type="submit"
          :loading="submitting"
          size="large"
          class="submit-btn"
        >
          {{ submitting ? '注册中...' : '注册' }}
        </el-button>
      </el-form>

      <p class="switch">
        已有账号？
        <router-link to="/login" class="link">去登录</router-link>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock, EditPen, School, Timer } from '@element-plus/icons-vue'

import FormField from '../components/FormField.vue'
import { createUser, getUsers } from '../api/user'

const router = useRouter()
const submitting = ref(false)

const form = reactive({
  username: '',
  password: '',
  name: '',
  college: '',
  grade: '',
})

const errors = reactive<Record<string, string>>({})

function clearErrors() {
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })
}

function validateForm() {
  clearErrors()

  if (!form.username) {
    errors.username = '请输入用户名'
  }

  if (!form.password) {
    errors.password = '请输入密码'
  } else if (form.password.length < 6) {
    errors.password = '密码长度不能少于 6 位'
  }

  if (!form.name) {
    errors.name = '请输入姓名'
  }

  if (!form.college) {
    errors.college = '请输入学院'
  }

  if (!form.grade) {
    errors.grade = '请输入年级'
  }

  return Object.values(errors).every((message) => !message)
}

async function handleRegister() {
  if (!validateForm()) {
    return
  }

  submitting.value = true

  try {
    const res = await getUsers()
    const exists = res.data.some((user) => user.username === form.username)

    if (exists) {
      errors.username = '用户名已存在'
      return
    }

    await createUser({
      username: form.username,
      password: form.password,
      name: form.name,
      college: form.college,
      grade: form.grade,
      avatar: '',
      bio: '这个同学还没有填写个人简介。',
    })

    ElMessage.success('注册成功，请登录')
    router.push('/login')
  } catch (error) {
    console.error(error)
    ElMessage.error('注册失败，请检查 Mock 服务是否正常运行')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 200px);
  display: grid;
  place-items: center;
}

.auth-card {
  width: 440px;
  padding: 36px 32px 32px;
  border-radius: var(--campus-radius);
  background: var(--campus-card-bg);
  border: 1px solid var(--campus-border);
  box-shadow: var(--campus-shadow);
}

.auth-header {
  text-align: center;
  margin-bottom: 24px;
}

.auth-logo {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
  color: #fff;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.auth-header h1 {
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 700;
  color: var(--campus-text);
}

.desc {
  margin: 0;
  font-size: 14px;
  color: var(--campus-text-secondary);
  line-height: 1.6;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.submit-btn {
  width: 100%;
  margin-top: 4px;
  height: 44px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 10px;
}

.switch {
  margin: 20px 0 0;
  text-align: center;
  font-size: 14px;
  color: var(--campus-text-secondary);
}

.link {
  color: var(--campus-primary);
  font-weight: 600;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
