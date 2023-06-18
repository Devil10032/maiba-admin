<template>
  <div class="page-container">
    <pannel-card
      :list="list"
      :total="total"
      @addRow="addRow"
      @delRow="delRow"
      @editRow="editRow"
      :columns="columns"
      :initData="initData"
      :formColumns="formColumns"
      v-model:formData="formData"
      v-model:pageNum="query.pageNum"
      v-model:pageSize="query.pageSize"
      :defaultFormData="defaultFormData"
    >
      <template #cate_icon="{ cell }">
        <image-preview  height="40px" :src="cell"/> 
      </template>
    </pannel-card>
    <my-dialog ref="myDialog" @update="initData" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted ,getCurrentInstance} from 'vue'
import { getCateList, getCate, delCate } from '@/api/cate.js'
import MyDialog from './components/MyDialog.vue'
import { ElMessage } from 'element-plus'
const { proxy } = getCurrentInstance()

const myDialog = ref(null)
// 表单初始值
const defaultFormData = {
  cate_name: '',
}
// 表单渲染
const formColumns = [
  { label: '分类名称', value: 'cate_name',type:'text' }
]
// 表格渲染
const columns = [
  { label: '分类名称', prop: 'cate_name' ,},
  { label: '分类图片', prop: 'cate_icon' },
  { label: '排序大小', prop: 'sort',},
]
// 查询参数
const formData = ref({ ...defaultFormData })
// 分页查询
const query = reactive({
  pageNum: 1,
  pageSize: 10,
})
// 列表数据
const list = ref([])
// 总数
const total = ref(0)

// 初始化数据
const initData = async () => {
  const { rows, count } = await getCateList({ ...query, ...formData.value })
  total.value = count
  list.value = rows
}

// 点击新增
const addRow = () => {
  myDialog.value.isDialogShow = true
}
// 点击编辑
const editRow = async id => {
  myDialog.value.formData = await getCate(id)
  myDialog.value.isDialogShow = true
}
// 点击删除
const delRow = async id => {
  await proxy.$modal.confirm('删除')
  await delCate(id)
  ElMessage.success(`删除成功`)
  if(list.value.length <= 1&& query.pageNum >1)  query.pageNum--
  initData()
}

// 生命周期 页面渲染完成成后 调用
onMounted(() => initData())

//
</script>

<style lang="scss" scoped></style>
