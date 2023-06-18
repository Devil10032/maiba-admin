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
      <template #avatar_url="{ cell }">
        <image-preview height="100px" :src="cell" />
      </template>
      <template #gender="{ cell }">
        <el-tag :type="formateStatus(cell, sexMenu).type">
          {{ formateStatus(cell, sexMenu).name }}
        </el-tag>
      </template>
      <template #state="{ cell }">
        <el-tag :type="formateStatus(cell, statuMenu).type">
          {{ formateStatus(cell, statuMenu).name }}
        </el-tag>
      </template>
      <template #province="{ cell, row }">
        <span>{{ cell }} - {{ row.city }}</span>
      </template>
      <template #is_admin="{ cell }">
        <el-tag :type="formateStatus(cell, adminMenu).type">
          {{ formateStatus(cell, adminMenu).name }}
        </el-tag>
      </template>
    </pannel-card>
    <my-dialog ref="myDialog" @update="initData" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import { getUserList, delUser, getUser } from '@/api/user'
import MyDialog from './components/MyDialog.vue'
import { ElMessage } from 'element-plus'
import { statuMenu, adminMenu, sexMenu } from '@/commom'
import useHooks from '@/hooks'
import { parseTime } from '@/utils/ruoyi.js'
const { formateStatus } = useHooks()
const { proxy } = getCurrentInstance()
const myDialog = ref(null)
// 表单初始值
const defaultFormData = {
  nick_name: '',
  phone: '',
  state: null,
  is_admin: null,
}
// 表单渲染
const formColumns = [
  { label: '昵称', value: 'nick_name', type: 'text' },
  { label: '手机号', value: 'phone', type: 'text' },
  {
    label: '账号状态',
    value: 'state',
    type: 'select',
    options: [{ name: '全部', value: '' }, ...statuMenu],
  },
  {
    label: '是否管理员',
    value: 'is_admin',
    type: 'select',
    options:  [{ name: '全部', value: '' }, ...adminMenu],
  },
]
// 表格渲染
const columns = [
  { label: '昵称', prop: 'nick_name' },
  { label: '头像', prop: 'avatar_url' },
  { label: '性别', prop: 'gender' },
  { label: '手机号', prop: 'phone' },
  { label: '状态', prop: 'state' },
  { label: '位置', prop: 'province' },
  { label: '是否管理员', prop: 'is_admin' },
  { label: '发布时间', prop: 'create_time' },
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
  const { rows, count } = await getUserList({
    ...query,
    ...formData.value,
  })
  rows.forEach(
    (item) =>
      (item.create_time = parseTime(
        item.create_time,
        '{y}/{m}/{d} {h}:{i}:{s}'
      ))
  )
  total.value = count
  list.value = rows
}

// 点击新增
const addRow = () => {
  myDialog.value.isDialogShow = true
}
// 点击编辑
const editRow = async (id) => {
  myDialog.value.formData = await getUser(id)
  myDialog.value.isDialogShow = true
}
// 点击删除
const delRow = async (id) => {
  await proxy.$modal.confirm('删除')
  await delUser(id)
  ElMessage.success(`删除成功`)
  if (list.value.length <= 1 && query.pageNum > 1) query.pageNum--
  initData()
}

// 生命周期 页面渲染完成成后 调用
onMounted(async () => {
  initData()
})
//
</script>

<style lang="scss" scoped></style>
