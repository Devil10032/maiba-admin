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

      <template #img_url="{ cell }">
        <image-preview height="100px" :src="cell" />
      </template>
      <template #end_time="{ cell, row }">
        <el-space>
          <span>{{ row.start_time }} 至 {{ cell }}</span>
          <el-tag :type="formateTime(cell, timeMenu).type">
            {{ formateTime(cell, timeMenu).name }}
          </el-tag>
        </el-space>
      </template>
      <template #state="{ cell }">
        <span v-if="cell === 2">其他</span>
        <el-tag v-else :type="formateStatus(cell, statuMenu).type">
          {{ formateStatus(cell, statuMenu).name }}
        </el-tag>
      </template>
    </pannel-card>
    <my-dialog ref="myDialog" @update="initData" v-model:advList="advList" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import { getAdvList, delAdv, getAdv } from '@/api/adv'
import MyDialog from './components/MyDialog.vue'
import { ElMessage } from 'element-plus'
import { statuMenu, timeMenu } from '@/commom'
import useHooks from '@/hooks'
import { parseTime } from '@/utils/ruoyi.js'
const { formateTime, formateStatus } = useHooks()
const { proxy } = getCurrentInstance()
const myDialog = ref(null)
// 表单初始值
const defaultFormData = {
  text: '',
  type: null,
  state: null,
}
// 广告位数据
const advList = ref([])
// 表单渲染
const formColumns = [
  { label: '广告标题', value: 'text', type: 'text' },
  {
    label: '广告状态',
    value: 'state',
    type: 'select',
    options: [{ name: '全部状态', value: '' }, ...statuMenu],
  },
  {
    label: '广告位置',
    value: 'type',
    type: 'select',
    options: [{ name: '全部位置', value: '' }, ...advList.value],
  },
]
// 表格渲染
const columns = [
  { label: '广告位置', prop: 'type' },
  { label: '图片说明', prop: 'text' },
  { label: '广告图片', prop: 'img_url' },
  { label: '时间范围', prop: 'end_time', width: 400 },
  { label: '广告状态', prop: 'state' },
  { label: '排序大小', prop: 'sort' },
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
  const { rows, count, typeList } = await getAdvList({
    ...query,
    ...formData.value,
  })
  rows.forEach((item) => {
    item.start_time = parseTime(item.start_time, '{y}/{m}/{d} {h}:{i}:{s}')
    item.end_time = parseTime(item.end_time, '{y}/{m}/{d} {h}:{i}:{s}')
  })
  total.value = count
  list.value = rows
  advList.value = typeList
}

// 点击新增
const addRow = () => {
  myDialog.value.isDialogShow = true
}
// 点击编辑
const editRow = async (id) => {
  myDialog.value.formData = await getAdv(id)
  myDialog.value.isDialogShow = true
}
// 点击删除
const delRow = async (id) => {
  await proxy.$modal.confirm('删除')
  await delAdv(id)
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
