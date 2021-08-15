<template>
  <div class="main-page">
    <aside class="left-aside">
      <header class="user-info">
        <img :src="userInfo.avatar" alt="用户头像" />
        <span class="user-name">{{ userInfo.name }}</span>
      </header>
      <div class="main-menu">
        <div v-for="item in staticMenu" :key="item.type" class="main-menu-item">
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
          <span class="count" v-if="menuNumMap[item.type]">
            {{ menuNumMap[item.type] }}
          </span>
        </div>
      </div>
      <el-divider></el-divider>
    </aside>
    <div class="right-content"></div>
  </div>
</template>
<script lang="ts">
import { reactive, ref, toRefs } from '@vue/reactivity'
import avatar from '../../assets/images/logo.png'

export default {
  setup() {
    const userInfo = reactive({
      name: 'Zoom',
      avatar,
    })
    const staticMenu = [
      { type: 'star', name: '重要', icon: 'el-icon-star-off' },
      { type: 'task', name: '任务', icon: 'el-icon-s-home' },
    ]
    const menuNumMap = reactive({
      star: 10,
      task: 0,
    })
    const activeMenu = ref('star')

    return { userInfo, staticMenu, menuNumMap, activeMenu }
  },
}
</script>
<style lang="scss" scoped>
.main-page {
  display: flex;
  .left-aside {
    width: 500px;
  }
  .user-info {
    display: flex;
    align-items: center;
    padding: 20px;
    img {
      width: 50px;
      height: 50px;
      font-size: 0;
      border-radius: 50px;
      margin-right: 20px;
    }
  }
  .main-menu-item {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    font-size: 16px;
    position: relative;
    &:hover {
      background-color: rgba(175, 175, 175, 0.6);
    }
    i {
      margin-right: 12px;
    }
    .count {
      position: absolute;
      right: 20px;
      color: rgb(126, 126, 126);
      font-size: 12px;
    }
  }
  .right-content {
    width: calc(100% - 500px);
  }
}
</style>
