<script setup>
import { ref } from 'vue'
import * as Echarts from 'echarts'
import { option } from './options'
const seekPie = ref(null)
const myEcharts = ref(null)

const onRendered = () => {
  const dataUrl = myEcharts.value.getDataURL()
  // ...
  // 后续如果有交互，交互发生重绘也会触发该事件，因此使用完就需要移除
  myEcharts.value.off('rendered', onRendered)
}

const initData = data => {
  if (myEcharts.value) myEcharts.value.dispose()
    const { series, legend } = option
    legend.data = data.map(({ cate_name }) => cate_name)
    series[0].data = [...data].map((item) => {
      item.name = item.cate_name
      item.value = item.count
      delete item.cate_name
      delete item.count
      return item
    })
  myEcharts.value = Echarts.init(seekPie.value)
  myEcharts.value.setOption(option)
  myEcharts.value.on('rendered', onRendered)
}


defineExpose({
  initData,
})
</script>

<template>
  <div
    ref="seekPie"
    style="width: 100%; height: 400px"
    class="seek-pie-container"
  ></div>
</template>

<style lang="scss" scoped></style>
