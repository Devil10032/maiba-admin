export default () => {
  // 获取图片地址
  const getImageUrl = url => url ? url.includes('https') ? url : import.meta.env.VITE_APP_BASE_URL + url : '~/assets/404_images/empty.png'
  const getImageUrlSingle = url => url ? getImageUrl(url.split(',')[0]):'~/assets/404_images/empty.png'
  const getImageUrlList = (url) =>url ? url.split(',').map((item) => getImageUrl(item)) :'~/assets/404_images/empty.png'
  const formateStatus = (key, menu)=> menu.find(({ value }) =>  value === key)
  const formateTime = (key ,menu)=> menu.find(({ value }) =>  value === +new Date(key) > +new Date())
  return {
    getImageUrl,
    getImageUrlSingle,
    getImageUrlList,
    formateStatus,
    formateTime
  }
}
