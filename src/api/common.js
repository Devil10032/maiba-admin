import request from '../utils/request.js'

// 1.上传图片接口
export const getImgUrl = data => request.post('/index/upload', data)
// 2.首页数据
export const getStatistical = year => request.get('/index/statistical',{
  params:{
    year
  }
})
