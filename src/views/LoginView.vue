<template>
  <section class="page auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <div class="auth-logo">M</div>
        <h1>登录校园轻集市</h1>
        <p class="desc">登录后可以发布信息、收藏内容并进入个人中心。</p>
      </div>

      <el-form class="auth-form" @submit.prevent="handleLogin" label-position="top">
        <FormField label="用户名" required :error="errors.username">
          <el-input v-model.trim="form.username" placeholder="请输入用户名" :prefix-icon="User" />
        </FormField>

        <FormField label="密码" required :error="errors.password">
          <el-input v-model.trim="form.password" type="password" placeholder="请输入密码" :prefix-icon="Lock" show-password />
        </FormField>

        <p v-if="loginError" class="login-error">{{ loginError }}</p>

        <el-button
          type="primary"
          native-type="submit"
          :loading="submitting"
          size="large"
          class="submit-btn"
        >
          {{ submitting ? '登录中...' : '登录' }}
        </el-button>
      </el-form>

      <p class="switch">
        还没有账号？
        <router-link to="/register" class="link">去注册</router-link>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

import FormField from '../components/FormField.vue'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const submitting = ref(false)
const loginError = ref('')

const form = reactive({
  username: '',
  password: '',
})

const errors = reactive<Record<string, string>>({})

function clearErrors() {
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })
  loginError.value = ''
}

function validateForm() {
  clearErrors()

  if (!form.username) {
    errors.username = '请输入用户名'
  }

  if (!form.password) {
    errors.password = '请输入密码'
  }

  return Object.values(errors).every((message) => !message)
}

async function handleLogin() {
  if (!validateForm()) {
    return
  }

  submitting.value = true

  try {
    await userStore.login(form.username, form.password)
    ElMessage.success('登录成功')
    router.push('/user')
  } catch (error) {
    console.error(error)
    loginError.value = '账号或密码错误'
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

.login-error {
  margin: 0;
  padding: 10px 14px;
  color: #dc2626;
  font-size: 14px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
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
