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
      <template #cover_image="{ cell }">
        <image-preview height="100px" :src="cell" />
      </template>
      <template #type="{ cell }">
        <el-tag v-if="cell" :type="formateStatus(cell, msgType).type">
          {{ formateStatus(cell, msgType).name }}
        </el-tag>
        <span v-else>其他</span>
      </template>
      <template #content="{ cell }">
        <el-link type="primary" @click="openModel(cell)" :underline="false"
          >点击查看</el-link
        >
      </template>
      <template #user="{ cell }">
        <span>{{ cell ? cell.nick_name : '暂无' }}</span>
      </template>
      <template #state="{ cell }">
        <span v-if="cell === 2">其他</span>
        <el-tag v-else :type="formateStatus(cell, msgMenu).type">
          {{ formateStatus(cell, msgMenu).name }}
        </el-tag>
      </template>
    </pannel-card>
    <my-dialog ref="myDialog" @update="initData" />
    <el-dialog v-model="dialogVisible" title="描述详情" width="30%" top="30vh">
      <el-row style="height: 100px">
        <span>{{ tips }}</span>
      </el-row>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import { getMessageList, delMessage, getMessage } from '@/api/message'
import MyDialog from './components/MyDialog.vue'
import { ElMessage } from 'element-plus'
import { msgMenu, msgType } from '@/commom'
import useHooks from '@/hooks'
import { parseTime } from '@/utils/ruoyi.js'
const { formateStatus } = useHooks()
const { proxy } = getCurrentInstance()
const myDialog = ref(null)
// 提示消息框显示与隐藏
const dialogVisible = ref(false)
// 提示消息框显示与隐藏
const tips = ref('')
// 表单初始值
const defaultFormData = {
  title: '',
  type: '',
  state: null,
}
// 表单渲染
const formColumns = [
  { label: '标题名称', value: 'title', type: 'text' },
  { label: '消息类型', value: 'type', type: 'select', options: msgType },
  { label: '状态', value: 'state', type: 'select', options: msgMenu },
]
// 表格渲染
const columns = [
  { label: '标题', prop: 'title' },
  { label: '封面', prop: 'cover_image' },
  { label: '类型', prop: 'type' },
  { label: '内容', prop: 'content' },
  { label: '发布者', prop: 'user' },
  { label: '状态', prop: 'state' },
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
  const { rows, count } = await getMessageList({
    ...query,
    ...formData.value,
  })
  rows.forEach((item) => {
    item.create_time = parseTime(item.create_time, '{y}/{m}/{d} {h}:{i}:{s}')
    if (item.state !== 1) item.notEdit = true
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
  myDialog.value.formData = await getMessage(id)
  myDialog.value.isDialogShow = true
}
// 点击删除
const delRow = async (id) => {
  await proxy.$modal.confirm('删除')
  await delMessage(id)
  ElMessage.success(`删除成功`)
  if (list.value.length <= 1 && query.pageNum > 1) query.pageNum--
  initData()
}

// 生命周期 页面渲染完成成后 调用
onMounted(async () => initData())
// 打开
const openModel = (value) => {
  tips.value = value.replace(/<[^>]+>/g, '')
  dialogVisible.value = true
}
</script>

<style lang="scss" scoped></style>
