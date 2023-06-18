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
      <template #remark="{ cell }">
        <el-link type="primary" @click="openModel(cell)" :underline="false"
          >点击查看</el-link
        >
      </template>
      <template #min_price="{ cell, row }">
        <span>{{ cell.toFixed(2) }} 至 {{ row.max_price.toFixed(2) }}</span>
      </template>
      <template #user="{ cell }">
        <span>{{ cell ? cell.nick_name : '未知' }}</span>
      </template>
      <template #state="{ cell }">
        <el-tag :type="formateStatus(cell).type">
        {{ formateStatus(cell).name }}</el-tag>
      </template>
    </pannel-card>
    <my-dialog ref="myDialog" @update="initData" />
    <el-dialog
      v-model="dialogVisible"
      title="描述详情"
      width="30%"
      top="30vh"
    >
      <el-row style="height: 100px;">
        <span>{{ tips }}</span>
      </el-row>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance, toRefs } from 'vue'
import { getSeekList, delSeek, getSeek } from '@/api/seek'
import MyDialog from './components/MyDialog.vue'
import { ElMessage } from 'element-plus'
import useCateStore from '@/store/modules/category'
import { statuMenu } from '@/commom'
import { parseTime } from '@/utils/ruoyi.js'
const { proxy } = getCurrentInstance()
const { categoryList } = toRefs(useCateStore())
// 弹框实例
const myDialog = ref(null)
// 提示消息框显示与隐藏
const dialogVisible = ref(false)
// 提示消息框显示与隐藏
const tips = ref('')
// 表单初始值
const defaultFormData = {
  title: '',
  category_id: '',
  state: null,
}
// 表单渲染
const formColumns = [
  { label: '求购标题', value: 'title', type: 'text' },
  { label: '商品分类', value: 'category_id',type: 'select'},
  {
    label: '信息状态',
    value: 'state',
    type: 'select',
    options: [
      { name: '全部状态', value: '' },
       ...statuMenu
      ],
  },
]
// 表格渲染
const columns = [
  { label: '求购标题', prop: 'title' },
  { label: '求购分类', prop: 'category' },
  { label: '备注描述', prop: 'remark' },
  { label: '价格区间', prop: 'min_price' },
  { label: '发布者', prop: 'user' },
  { label: '商品状态', prop: 'state' },
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
  const { rows, count } = await getSeekList({
    ...query,
    ...formData.value,
  })
  rows.forEach((item) => {
    item.publish_date = parseTime(item.publish_date, '{y}/{m}/{d} {h}:{i}:{s}')
    item.category = item.category ? item.category.cate_name :'未知'
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
  myDialog.value.formData = await getSeek(id)
  myDialog.value.isDialogShow = true
}
// 点击删除
const delRow = async (id) => {
  await proxy.$modal.confirm('删除')
  await delSeek(id)
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
const formateStatus = (key) => statuMenu.find(({ value }) => value === key)

//
const openModel = value => {
  tips.value = value
  dialogVisible.value =true
}
</script>

<style lang="scss" scoped></style>
