import { ref } from 'vue'
import { getCateList } from '../../api/cate'
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
