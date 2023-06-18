import request from '@/utils/request'

// 1.列表
export const  getInformList =  params =>  request({
    url: '/inform',
    params
  })

// 2. 新增
export const  addLInform =  data =>  request({
  url: '/inform',
  method: 'POST',
  data
})

// 3. 编辑
export const  editInform =  data =>  request({
  url: `/inform/${data.id}`,
  method: 'PUT',
  data
})
// 4. 详情
export const  getInform =  id =>  request({
  url: `/inform/${id}`,
})

// 5. 删除
export const  delInform =  id =>  request({
  url: `/inform/${id}`,
  method: 'DELETE',
})

