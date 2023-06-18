<script setup>
import { ref } from 'vue'
import * as Echarts from 'echarts'
import { option } from './options'
const informBar = ref(null)
const myEcharts = ref(null)

const onRendered = () => {
  const dataUrl = myEcharts.value.getDataURL()
  // ...
  // 后续如果有交互，交互发生重绘也会触发该事件，因此使用完就需要移除
  myEcharts.value.off('rendered', onRendered)
}

const initData = data => {
  if (myEcharts.value) myEcharts.value.dispose()
    const { series } = option
    Object.values(data).forEach((item,index)=>{
      item.forEach((num,idx)=>{
        series[idx].data[index]= num.num
      })
    })
  myEcharts.value = Echarts.init(informBar.value)
  myEcharts.value.setOption(option)
  myEcharts.value.on('rendered', onRendered)
}

defineExpose({
  initData,
})
</script>

<template>
  <div
    ref="informBar"
    style="width: 100%; height: 400px"
    class="inform-bar-container"
  ></div>
</template>

<style lang="scss" scoped></style>
