<script setup>
import { ref } from 'vue'
import * as Echarts from 'echarts'
import { option } from './options'
const userBar = ref(null)
const myEcharts = ref(null)

const onRendered = () => {
  const dataUrl = myEcharts.value.getDataURL()
  // ...
  // 后续如果有交互，交互发生重绘也会触发该事件，因此使用完就需要移除
  myEcharts.value.off('rendered', onRendered)
}
const initData = (data) => {
  if (myEcharts.value) myEcharts.value.dispose()
  myEcharts.value= Echarts.init(userBar.value)
  const { series, xAxis } = option
  const xAxisData = data.map(({ province }) => province)
  xAxis.data = [...new Set(xAxisData)]
  series[0].data = xAxis.data.map((item) => {
    const obj = data
      .filter(({ gender }) => gender)
      .find(({ province }) => province === item)
    return obj ? obj.num : 0
  })
  series[1].data = xAxis.data.map((item) => {
    const obj = data
      .filter(({ gender }) => !gender)
      .find(({ province }) => province === item)
    return obj ? obj.num : 0
  })
  myEcharts.value.setOption(option)
  myEcharts.value.on('rendered', onRendered)
}


defineExpose({
  initData,
})
</script>

<template>
  <div
    ref="userBar"
    style="width: 100%; height: 400px"
    class="user-bar-container"
  ></div>
</template>

<style lang="scss" scoped></style>
