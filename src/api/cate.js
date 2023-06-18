import request from '@/utils/request'

// 1.列表
export const  getCateList =  params =>  request({
    url: '/category',
    params
  })

// 2. 新增
export const  addCate =  data =>  request({
  url: '/category',
  method: 'POST',
  data
})

// 3. 编辑
export const  editCate =  data =>  request({
  url: `/category/${data.id}`,
  method: 'PUT',
  data
})
// 4. 详情
export const  getCate =  id =>  request({
  url: `/category/${id}`,
})

// 5. 删除
export const  delCate =  id =>  request({
  url: `/category/${id}`,
  method: 'DELETE',
})

