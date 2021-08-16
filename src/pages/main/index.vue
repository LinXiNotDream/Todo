<template>
  <div class="main-page">
    <aside class="left-aside">
      <header class="user-info">
        <img :src="userInfo.avatar" alt="用户头像" />
        <span class="user-name">{{ userInfo.name }}</span>
      </header>
      <div class="menu main-menu">
        <div
          v-for="item in staticMenu"
          :key="item.value"
          class="menu-item"
          :class="{ 'is-active': activeMenu === item.value }"
          @click="toActive(item)"
        >
          <div class="active-line"></div>
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
          <span class="count" v-if="menuNumMap[item.value]">
            {{ menuNumMap[item.value] }}
          </span>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="menu task-menu">
        <div
          v-for="item in taskMenuList"
          :key="item.value"
          class="menu-item"
          :class="{ 'is-active': activeMenu === item.value }"
          @click="toActive(item)"
        >
          <div class="active-line"></div>
          <i class="el-icon-date"></i>
          <span>{{ item.name }}</span>
          <span class="count" v-if="item.tasks.length">
            {{ item.tasks.length }}
          </span>
        </div>
      </div>
      <div class="create-area">
        <i class="el-icon-plus"></i>
        <span>新建列表</span>
      </div>
    </aside>
    <div class="right-content"></div>
  </div>
</template>
<script lang="ts">
import { reactive, ref } from '@vue/reactivity'
import avatar from '../../assets/images/logo.png'

export default {
  setup() {
    const userInfo = reactive({
      name: 'Zoom',
      avatar,
    })
    const staticMenu = [
      { value: 'star', name: '重要', icon: 'el-icon-star-off' },
      { value: 'task', name: '任务', icon: 'el-icon-s-home' },
    ]
    const menuNumMap = reactive({
      star: 10,
      task: 0,
    })
    const activeMenu = ref('star')

    const toActive = function (item: any) {
      activeMenu.value = item.value
    }

    const taskMenuList = reactive([
      { value: 1, name: 'vadbds', tasks: [1, 2] },
      { value: 2, name: 'vad版本发布bds', tasks: [1, 2] },
    ])

    return {
      userInfo,
      staticMenu,
      menuNumMap,
      activeMenu,
      toActive,
      taskMenuList,
    }
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
  .menu-item {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    font-size: 16px;
    position: relative;
    &:hover {
      background-color: rgba(175, 175, 175, 0.6);
    }
    &.is-active {
      font-weight: bold;
      .active-line {
        opacity: 1;
      }
    }
    .active-line {
      width: 3px;
      height: 30px;
      background-color: violet;
      margin-right: 0;
      opacity: 0;
      margin-right: 20px;
    }
    i {
      margin-right: 12px;
      font-size: 18px;
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
