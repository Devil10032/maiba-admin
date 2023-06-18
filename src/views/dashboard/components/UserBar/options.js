export const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  animation: true,
  animationDuration: 1000,
  legend: {
    left:'5%'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  xAxis: {
    type: 'category',
    data: ['男', '女' ]
  },
  series: [
    {
      name: '男',
      type: 'bar',
      data: [18203, 23489, 29034],
      itemStyle: {
        color:'#6395f9'
      },
    },
    {
      name: '女',
      type: 'bar',
      data: [19325, 23438, 31000],
      itemStyle: {
        color:'#61d9aa'
      },
    }
  ]
};