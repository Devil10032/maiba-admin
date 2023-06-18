
const TokenKey = 'MAIBA_ELEMENT_PULS_TOKEN'

// 1.获取token
export const getToken = ()=>  localStorage.getItem(TokenKey)
// 2.设置token
export const setToken = token => localStorage.setItem(TokenKey,token)
// 3.移除token
export const delToken = () => localStorage.removeItem(TokenKey)
