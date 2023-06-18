export const option = {
  tooltip: {
    trigger: 'item',
  },
  animation: true,
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: 10,
    top: 20,
    bottom: 20,
    data: ['33','11','22'],
    icon :'circle'
  },
  series: [
    {
      type: 'pie',
      radius: '85%',
      center: ['40%', '48%'],
      data: [
        {name:'33',value:3},
        {name:'11',value:3},
        {name:'22',value:3},
      ],
       label: {
        show: false,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      labelLine: {
        show: false
      },
    }
  ]
};