<template>
  <div class="TestComponent">
    <VirtualScroll :dataList="data"></VirtualScroll>
  </div>
</template>

<script setup lang="ts">
const createData = (length) => {
  return Object.keys(new Array(length).fill(''))
}
const data = createData(1000) // 实际数据
</script>

<style lang="scss" scoped></style>
