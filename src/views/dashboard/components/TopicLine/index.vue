<script setup>
import { ref } from 'vue'
import * as Echarts from 'echarts'
import { option } from './options'
const topicLine = ref(null)
const myEcharts = ref(null)

const initData = (data) => {
  if (myEcharts.value) myEcharts.value.dispose()
  const { series, xAxis } = option
  xAxis.data = Object.keys(data)
  series[0].data = Object.values(data).map((item) => (item ? item : 0))
  myEcharts.value = Echarts.init(topicLine.value)
  myEcharts.value.setOption(option)
}

defineExpose({
  initData,
})
</script>

<template>
  <div
    ref="topicLine"
    style="width: 100%; height: 400px"
    class="topic-line-container"
  ></div>
</template>

<style lang="scss" scoped></style>
