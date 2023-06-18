<template>
  <div class="page-container">
    <pannel-card
      :list="list"
      :total="total"
      :isAddShow="false"
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
      <template #seek_id="{ row }">
        <el-tag effect="dark" :type="formateType(row, typeMenu).type">
          {{ formateType(row, typeMenu).name }}
        </el-tag>
      </template>
      <template #user="{ cell }">
        <span>{{ cell ? cell.nick_name : '暂无' }}</span>
      </template>
      <template #state="{ cell }">
        <el-tag :type="formateStatus(cell, informMenu).type">
          {{ formateStatus(cell, informMenu).name }}
        </el-tag>
      </template>
      <template #id="{ cell }">
        <el-link type="primary" @click="editRow(cell)" :underline="false"
          >点击查看</el-link
        >
      </template>
    </pannel-card>
    <my-dialog ref="myDialog" @update="initData" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import { getInformList, delInform, getInform } from '@/api/inform'
import MyDialog from './components/MyDialog.vue'
import { ElMessage } from 'element-plus'
import { typeMenu, informMenu } from '@/commom'
import useHooks from '@/hooks'
import { parseTime } from '@/utils/ruoyi.js'
const { formateStatus } = useHooks()
const { proxy } = getCurrentInstance()
const myDialog = ref(null)
// 表单初始值
const defaultFormData = {
  type: '',
  state: null,
}
// 表单渲染
const formColumns = [
  { label: '举报类型', value: 'type', type: 'select', options: typeMenu },
  { label: '状态类型', value: 'state', type: 'select', options: informMenu },
]
// 表格渲染
const columns = [
  { label: '举报类型', prop: 'seek_id' },
  { label: '举报人', prop: 'user' },
  { label: '举报说明', prop: 'content', width: 450 },
  { label: '处理状态', prop: 'state' },
  { label: '举报时间', prop: 'reply_time' },
  { label: '举报信息及回复情况', prop: 'id' },
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
  const { rows, count } = await getInformList({
    ...query,
    ...formData.value,
  })
  rows.forEach(
    (item) =>
      (item.reply_time = parseTime(item.reply_time, '{y}/{m}/{d} {h}:{i}:{s}'))
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
  const res = await getInform(id)
  res.create_time = parseTime(res.create_time, '{y}/{m}/{d} {h}:{i}:{s}')
  res.reply_time = parseTime(res.reply_time, '{y}/{m}/{d} {h}:{i}:{s}')
  if (res.reply_content)
    res.reply_content = res.reply_content.replace(/<[^>]+>/g, '')
  if (res.seek_id && res.seek_data && res.seek_data.publish_date) {
    res.seek_data.publish_date = parseTime(
      res.seek_data.publish_date,
      '{y}/{m}/{d} {h}:{i}:{s}'
    )
  }
  if (
    res.commodity_id &&
    res.commodity_data &&
    res.commodity_data.publish_date
  ) {
    res.commodity_data.publish_date = parseTime(
      res.commodity_data.publish_date,
      '{y}/{m}/{d} {h}:{i}:{s}'
    )
  }
  myDialog.value.detail = res
  myDialog.value.isDialogShow = true
}
// 点击删除
const delRow = async (id) => {
  await proxy.$modal.confirm('删除')
  await delInform(id)
  ElMessage.success(`删除成功`)
  if (list.value.length <= 1 && query.pageNum > 1) query.pageNum--
  initData()
}

// 生命周期 页面渲染完成成后 调用
onMounted(async () => {
  initData()
})
//
const formateType = (row) => typeMenu.find(({ value }) => row[value])
</script>

<style lang="scss" scoped></style>
