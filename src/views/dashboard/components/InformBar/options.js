export const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  animation: true,
  animationDuration: 1000,
  legend: {
    left: '5%',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, 0.01],
  },
  xAxis: {
    type: 'category',
    data: ['商品投诉', '帖子投诉', '求购投诉'],
  },
  series: [
    {
      name: '已处理',
      type: 'bar',
      data: [18203, 23489, 29034],
    },
    {
      name: '未处理',
      type: 'bar',
      data: [19325, 23438, 31000],
    },
  ],
}
