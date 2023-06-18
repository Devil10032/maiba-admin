import request from '@/utils/request'

// 1.登录方法
export const  loginApi =  data =>  request({
    url: '/index/login',
    method: 'POST',
    data: data
  })

// 2. 获取用户详细信息
export const  getUserInfoApi =  () =>  request({
  url: '/index/getUserInfo',
  method: 'POST'
})


// 1.列表
export const  getUserList =  params =>  request({
    url: '/user',
    params
  })

// 2. 新增
export const  addUser =  data =>  request({
  url: '/user',
  method: 'POST',
  data
})

// 3. 编辑
export const  editUser =  data =>  request({
  url: `/user/${data.id}`,
  method: 'PUT',
  data
})
// 4. 详情
export const  getUser =  id =>  request({
  url: `/user/${id}`,
})

// 5. 删除
export const  delUser =  id =>  request({
  url: `/user/${id}`,
  method: 'DELETE',
})

