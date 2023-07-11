<template>
  <div class="login-page">
    <div class="login-form">
      <a-input class="input-item" v-model:value="loginForm.account" placeholder="请输入账号" />
      <a-input-password
        v-model:value="loginForm.password"
       class="input-item"
        placeholder="请输入密码"
      />
      <a-button type="primary" class="login-button" @click="toLogin">登录</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue';

let router = useRouter()
const loginForm = reactive({
  account: '',
  password: '',
})

const toLogin = ($event: any) => {
  if (loginForm.account && loginForm.password) {
    message.success('登录成功')
    router.push({ name: 'MainPage' })
  } else {
    message.warning('账号密码不能为空')
  }
}
const toRegister = ($event: any) => {
  console.log(loginForm)
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100%;
  background-image: url('@/assets/images/login_bg.png');
  background-size: cover;
  background-position: center;
  .login-form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    padding: 40px 20px;
    background: rgb(110 71 54 / 37%);
    border-radius: 4px;
  }
  .input-item {
    margin-bottom: 20px;
  }
  .login-button {
    width: 100%;
  }
}
</style>
