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
      <template #img_src="{ cell }">
        <image-preview height="100px" :src="cell" />
      </template>
      <template #user="{ cell }">
        <span>{{ cell ? cell.nick_name : '未知' }}</span>
      </template>
      <template #hot_degree="{ cell }">
        <el-tag :type="formateHotStatus(cell).type">
          {{ formateHotStatus(cell).name }}</el-tag
        >
      </template>
      <template #state="{ cell }">
        <el-tag :type="formateStatus(cell).type">
          {{ formateStatus(cell).name }}</el-tag
        >
      </template>
    </pannel-card>
    <my-dialog ref="myDialog" @update="initData" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import { getTopicList, delTopic, getTopic } from '@/api/topic'
import MyDialog from './components/MyDialog.vue'
import { ElMessage } from 'element-plus'
import { statuMenu, hotMenu } from '@/commom'
const { proxy } = getCurrentInstance()
const myDialog = ref(null)
// 表单初始值
const defaultFormData = {
  title: '',
  category_id: '',
  state: null,
}
// 表单渲染
const formColumns = [
  { label: '帖子名称', value: 'theme', type: 'text' },
  {
    label: '热门程度',
    value: 'hot_degree',
    type: 'select',
    options: [{ name: '全部状态', value: '' }, ...hotMenu],
  },
  {
    label: '帖子状态',
    value: 'state',
    type: 'select',
    options: [{ name: '全部状态', value: '' }, ...statuMenu],
  },
]
// 表格渲染
const columns = [
  { label: '帖子标题', prop: 'theme' },
  { label: '帖子图片', prop: 'img_src' },
  { label: '评论数量', prop: 'comment_count' },
  { label: '点赞数', prop: 'click_count' },
  { label: '发布者', prop: 'user' },
  { label: '热门状态', prop: 'hot_degree' },
  { label: '帖子状态', prop: 'state' },
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
  const { rows, count } = await getTopicList({
    ...query,
    ...formData.value,
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
  myDialog.value.formData = await getTopic(id)
  myDialog.value.isDialogShow = true
}
// 点击删除
const delRow = async (id) => {
  await proxy.$modal.confirm('删除')
  await delTopic(id)
  ElMessage.success(`删除成功`)
  if (list.value.length <= 1 && query.pageNum > 1) query.pageNum--
  initData()
}

// 生命周期 页面渲染完成成后 调用
onMounted(async () => {
  initData()
})
//
const formateStatus = (key) => statuMenu.find(({ value }) => value === key)
const formateHotStatus = (key) => hotMenu.find(({ value }) => value === key)
</script>

<style lang="scss" scoped></style>
