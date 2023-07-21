<template>
  <div
    :ref="toSetRefFunc"
    class="virtual-scroll"
    :style="`height: ${
      (dataList.length > showNumber ? showNumber : dataList.length) * itemHeight
    }px;`"
  >
    <div
      class="scroll-blank"
      :style="`height: ${dataList.length * itemHeight}px;`"
    ></div>
    <div class="scroll-data" :style="`margin-top: ${offsetTop}px;`">
      <div
        v-for="(item, index) in activeList"
        :key="index"
        class="scroll-item"
        :style="`height: ${itemHeight}px;`"
      >
        <slot name="listItem" :listItem="item" :listIndex="index + startNum">
          {{ item }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  showNumber: { type: Number, default: 20 }, // 当前视窗展示条数
  itemHeight: { type: Number, default: 20 }, // 每一条内容的高度
  preRenderCount: { type: Number, default: 0 }, // 预加载条数
  dataList: { type: Array, default: () => [] },
})

const virtualScrollBoxMap: any = ref({})
const randomNum = Math.random()
let startNum = ref(0)
let offsetTop = ref(0)

const activeList = computed(() => {
  const start =
    startNum.value - props.preRenderCount < 0
      ? 0
      : startNum.value - props.preRenderCount
  return props.dataList.slice(
    start,
    start + props.showNumber + props.preRenderCount
  )
})

const toSetRefFunc = (el: any) => {
  if (el) virtualScrollBoxMap[`virtualScrollBox${randomNum}`] = el
}
const scrollEvent = (event: any) => {
  const { scrollTop } = event.target
  startNum.value = Math.floor(parseInt(scrollTop) / props.itemHeight)
  offsetTop.value = scrollTop
}
// const resetScroll = () => {
//     virtualScrollBox.scrollTop = 0;
// }

onMounted(() => {
  virtualScrollBoxMap[`virtualScrollBox${randomNum}`].addEventListener(
    'scroll',
    scrollEvent
  )
})
onBeforeUnmount(() => {
  virtualScrollBoxMap[`virtualScrollBox${randomNum}`].removeEventListener(
    'scroll'
  )
})
</script>

<style lang="scss" scoped></style>
