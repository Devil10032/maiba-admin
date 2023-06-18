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
      radius: ['50%', '85%'],
      center: ['40%', '48%'],
      data: [
        {name:'33',value:3},
        {name:'11',value:3},
        {name:'22',value:3},
      ],
       label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
    }
  ]
};