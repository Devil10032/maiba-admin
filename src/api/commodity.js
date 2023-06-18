import request from '@/utils/request'

// 1.列表
export const  getCommodityList =  params =>  request({
    url: '/commodity',
    params
  })

// 2. 新增
export const  addCommodity =  data =>  request({
  url: '/commodity',
  method: 'POST',
  data
})

// 3. 编辑
export const  editCommodity =  data =>  request({
  url: `/commodity/${data.id}`,
  method: 'PUT',
  data
})
// 4. 详情
export const  getCommodity =  id =>  request({
  url: `/commodity/${id}`,
})

// 5. 删除
export const  delCommodity =  id =>  request({
  url: `/commodity/${id}`,
  method: 'DELETE',
})

