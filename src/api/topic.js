import request from '@/utils/request'

// 1.列表
export const  getTopicList =  params =>  request({
    url: '/topic',
    params
  })

// 2. 新增
export const  addTopic =  data =>  request({
  url: '/topic',
  method: 'POST',
  data
})

// 3. 编辑
export const  editTopic =  data =>  request({
  url: `/topic/${data.id}`,
  method: 'PUT',
  data
})
// 4. 详情
export const  getTopic =  id =>  request({
  url: `/topic/${id}`,
})

// 5. 删除
export const  delTopic =  id =>  request({
  url: `/topic/${id}`,
  method: 'DELETE',
})

