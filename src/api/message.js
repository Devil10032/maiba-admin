import request from '@/utils/request'

// 1.列表
export const  getMessageList =  params =>  request({
    url: '/message',
    params
  })

// 2. 新增
export const  addMessage =  data =>  request({
  url: '/message',
  method: 'POST',
  data
})

// 3. 编辑
export const  editMessage =  data =>  request({
  url: `/message/${data.id}`,
  method: 'PUT',
  data
})
// 4. 详情
export const  getMessage =  id =>  request({
  url: `/message/${id}`,
})

// 5. 删除
export const  delMessage =  id =>  request({
  url: `/message/${id}`,
  method: 'DELETE',
})

