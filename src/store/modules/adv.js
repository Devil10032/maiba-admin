import { ref } from 'vue'
export default defineStore('cate', () => {

  const categoryList = ref([])
  const getAllcateList = async () => {
     categoryList.value = await getCateList()
  }

  return {
    categoryList,
    getAllcateList
  }
})
