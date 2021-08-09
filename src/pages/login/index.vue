<template>
  <div class="login-page">
    <div class="login-form">
      <el-input v-model="loginForm.account" placeholder="请输入账号"></el-input>
      <el-input
        v-model="loginForm.password"
        type="password"
        placeholder="请输入密码"
      ></el-input>
      <el-button class="login-button" type="primary" @click="toLogin">
        登录
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { ElMessage as $message } from 'element-plus'
import { useRouter } from 'vue-router'
export default {
  name: 'Login',
  props: {},
  setup: (props: any) => {
    let router = useRouter()
    const loginForm = reactive({
      account: '',
      password: '',
    })

    const toLogin = ($event: any) => {
      if (loginForm.account && loginForm.password) {
        $message({ type: 'success', message: '登录成功' })
        router.push({ name: 'Mainpage' })
      } else {
        $message({ type: 'warning', message: '账号密码不能为空' })
      }
    }
    const toRegister = ($event: any) => {
      console.log(loginForm)
    }

    return { loginForm, toLogin, toRegister }
  },
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
    right: 200px;
    top: 50%;
    transform: translateY(-50%);
    width: 400px;
    padding: 40px 20px;
    background: rgb(110 71 54 / 37%);
    border-radius: 4px;
  }

  .el-input {
    margin-bottom: 40px;
    :deep(.el-input__inner) {
      background: transparent;
      color: #fff;
    }
  }

  .login-button {
    width: 100%;
  }
}
</style>
