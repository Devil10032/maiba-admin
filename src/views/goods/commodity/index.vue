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
      <template #formcategory_id="{ formData }">
        <el-select
          v-model="formData.category_id"
          placeholder="请选择商品分类"
          clearable
        >
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.cate_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </template>
      <template #cover_image="{ cell }">
        <image-preview height="70px" :src="cell" />
      </template>
      <template #user="{ cell }">
        <span>{{ cell ? cell.nick_name : '未知' }}</span>
      </template>
      <template #state="{ cell }">
        <el-tag :type="formateStatus(cell).type">{{
          formateStatus(cell).name
        }}</el-tag>
      </template>
    </pannel-card>
    <my-dialog ref="myDialog" @update="initData" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance, toRefs } from 'vue'
import { getCommodityList, delCommodity, getCommodity } from '@/api/commodity'
import MyDialog from './components/MyDialog.vue'
import { ElMessage } from 'element-plus'
import useCateStore from '@/store/modules/category'
import { statusMenu } from '@/commom'
import { storeToRefs } from 'pinia'
import { parseTime } from '@/utils/ruoyi.js'
const { proxy } = getCurrentInstance()
const { categoryList } = storeToRefs(useCateStore())
const myDialog = ref(null)
// 表单初始值
const defaultFormData = {
  title: '',
  category_id: '',
  state: null,
}
// 表单渲染
const formColumns = [
  { label: '商品名称', value: 'title', type: 'text' },
  {
    label: '商品分类',
    value: 'category_id',
    type: 'select',
  },
  {
    label: '商品状态',
    value: 'state',
    type: 'select',
    options: [{ name: '全部状态', value: '' }, ...statusMenu],
  },
]
// 表格渲染
const columns = [
  { label: '商品', prop: 'title' },
  { label: '商品图片', prop: 'cover_image' },
  { label: '分类', prop: 'category_id' },
  { label: '原价', prop: 'old_price' },
  { label: '现价', prop: 'price' },
  { label: '库存', prop: 'repertory' },
  { label: '发布者', prop: 'user' },
  { label: '商品状态', prop: 'state' },
  { label: '发布时间', prop: 'publish_date' },
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
  const { rows, count } = await getCommodityList({
    ...query,
    ...formData.value,
  })
  rows.forEach((item) => {
    item.publish_date = parseTime(item.publish_date, '{y}/{m}/{d} {h}:{i}:{s}')
    const obj = categoryList.value.find(({ id }) => id === item.category_id)
    item.category_id = obj ? obj.name : '未知'
  })
  total.value = count
  list.value = rows
}

// 点击新增
const addRow = () => {
  myDialog.value.isDialogShow = true
}
// 点击编辑
const editRow = async (id) => {
  myDialog.value.formData = await getCommodity(id)
  myDialog.value.isDialogShow = true
}
// 点击删除
const delRow = async (id) => {
  await proxy.$modal.confirm('删除')
  await delCommodity(id)
  ElMessage.success(`删除成功`)
  if (list.value.length <= 1 && query.pageNum > 1) query.pageNum--
  initData()
}

// 生命周期 页面渲染完成成后 调用
onMounted(async () => {
  await useCateStore().getAllcateList()
  initData()
})
//
const formateStatus = (key) => statusMenu.find(({ value }) => value === key)
</script>

<style lang="scss" scoped></style>
