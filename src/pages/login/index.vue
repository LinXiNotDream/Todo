<template>
  <div class="login-page">
    <el-form
      :model="loginForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="loginForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="toLogin">登录</el-button>
    <el-button @click="toRegister">去注册</el-button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'Login',
  props: {},
  setup: () => {
    const loginForm = ref({
      account: '',
      password: '',
    })
    return { loginForm }
  },
})
</script>

<style lang="scss" scoped>
.login-page {
  height: 100%;
  background-image: url('@/assets/images/login_bg.png');
  background-size: cover;
  background-position: center;
}
</style>
