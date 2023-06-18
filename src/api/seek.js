import request from '@/utils/request'

// 1.列表
export const  getSeekList =  params =>  request({
    url: '/seek',
    params
  })

// 2. 新增
export const  addSeek =  data =>  request({
  url: '/seek',
  method: 'POST',
  data
})

// 3. 编辑
export const  editSeek =  data =>  request({
  url: `/seek/${data.id}`,
  method: 'PUT',
  data
})
// 4. 详情
export const  getSeek =  id =>  request({
  url: `/seek/${id}`,
})

// 5. 删除
export const  delSeek =  id =>  request({
  url: `/seek/${id}`,
  method: 'DELETE',
})

