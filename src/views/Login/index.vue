<template>
  <div class="login-page">
    <div class="login-form">
      <a-input class="input-item" v-model:value="loginForm.account" placeholder="请输入账号" />
      <a-input-password v-model:value="loginForm.password" class="input-item" placeholder="请输入密码" />
      <a-button type="primary" class="login-button" @click="toLogin">登录</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue';

let router = useRouter()
const loginForm = reactive({
  account: '',
  password: '',
})

const toLogin = ($event: Event) => {
  if (loginForm.account && loginForm.password) {
    message.success('登录成功')
    router.push({ name: 'MainPage' })
  } else {
    message.warning('账号密码不能为空')
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100%;
  background-size: cover;
  background-position: center;

  .login-form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    padding: 40px 20px;
    border-radius: 4px;
    border: 1px solid #cac6c6;
  }

  .input-item {
    margin-bottom: 20px;
  }

  .login-button {
    width: 100%;
  }
}
</style>
