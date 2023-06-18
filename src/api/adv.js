import request from '@/utils/request'

// 1.列表
export const  getAdvList =  params =>  request({
    url: '/adv',
    params
  })

// 2. 新增
export const  addAdv =  data =>  request({
  url: '/adv',
  method: 'POST',
  data
})

// 3. 编辑
export const  editAdv =  data =>  request({
  url: `/adv/${data.id}`,
  method: 'PUT',
  data
})
// 4. 详情
export const  getAdv =  id =>  request({
  url: `/adv/${id}`,
})

// 5. 删除
export const  delAdv =  id =>  request({
  url: `/adv/${id}`,
  method: 'DELETE',
})

