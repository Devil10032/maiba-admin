<template>
  <el-dialog
    width="35%"
    v-model="isDialogShow"
    @close="onClose"
    :title="`${title}广告图`"
  >
    <my-form
      ref="form"
      :formData="formData"
      :formColumns="formColumns"
      :rules="rules"
    >
      <template #type="{ formData }">
        <el-select
          style="width: 192px"
          v-model="formData.type"
          placeholder="请选择广告位"
          clearable
        >
          <el-option
            v-for="(item, index) in advList"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
          <el-row
            type="flex"
            align="middle"
            style="height: 50px; border-top: 1px solid #f0f0f0"
          >
            <el-col :span="14" :offset="1">
              <el-input
                placeholder="请输入位置名称"
                v-model="advType"
                autocomplete="off"
              />
            </el-col>
            <el-col :span="6" :offset="2">
              <el-button type="text" icon="Plus" @click="addType"
                >添加</el-button
              >
            </el-col>
          </el-row>
        </el-select>
      </template>
      <template #time_range>
        <el-date-picker
          style="width: 192px"
          v-model="time_range"
          @change="timeChange"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </template>
    </my-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { addAdv, editAdv } from '@/api/adv.js'
import { statuMenu } from '@/commom'
const { advList } = defineProps({
  advList: {
    type: Array,
  },
})
const emit = defineEmits(['update', 'update:advList'])
// 控制弹框显示与隐藏
const isDialogShow = ref(false)
// 添加广告位
const advType = ref('')
// 控制弹框显示与隐藏
const form = ref(null)
// 定义初始表单值
const defaultFormData = {
  end_time: '',
  start_time: '',
  img_url: '',
  sort: 1,
  type: '',
  state: 1,
  text: '',
  time_range: [],
}
// 日期选择
const time_range = ref([])
// 表单绑定
const formData = ref({ ...defaultFormData })
// 表单渲染
const formColumns = [
  { label: '广告标题', value: 'text', type: 'text' },
  { label: '广告位置', value: 'type', type: 'select' },
  { label: '使用时间', value: 'time_range', type: 'date' },
  { label: '启用状态', value: 'state', type: 'radio', options: statuMenu },
  { label: '封面', value: 'img_url', type: 'img' ,itemWidth:'40%',},
  { label: '排序大小', value: 'sort', type: 'elnumber', max: 100, min: 1,labelWidth:'100px' },
]

watch(
  () => formData.value.id,
  (newVal) => {
    if (!newVal) return
    time_range.value[0] = new Date(formData.value.start_time)
    time_range.value[1] = new Date(formData.value.end_time)
  },
  { immediate: true, deep: true }
)

// 定义验证规则
const rules = reactive({
  text: [{ required: true, message: '请输入广告标题', trigger: 'blur' }],
  img_url: [{ required: true, message: '请选择广告图片', trigger: 'change' }],
  state: [{ required: true, message: '请选择启用状态', trigger: 'change' }],
  sort: [{ required: true, message: '请输入排序大小', trigger: 'blur' }],
  type: [{ required: true, message: '请选择广告位置', trigger: 'change' }],
  time_range: [
    { required: true, message: '请选择使用时间', trigger: 'change' },
  ],
})

// 标题计算属性
const title = computed(() => (formData.value.id ? '修改' : '添加'))
// 点击确认
const onSubmit = async () => {
  await form.value.validate()
  formData.value.id
    ? await editAdv(formData.value)
    : await addAdv(formData.value)
  ElMessage.success(`${title.value}成功`)
  emit('update')
  onClose()
}
// 点击取消
const onClose = () => {
  form.value.resetFields()
  formData.value = { ...defaultFormData }
  isDialogShow.value = false
}

const addType = () => {
  console.log(advList)
  emit('update:advList', [...advList, advType.value])
}

const timeChange = (e) => {
  if (!formData.value.id) formData.value.time_range = e
  formData.value.start_time = +new Date(e[0])
  formData.value.end_time = +new Date(e[1])
}
defineExpose({
  isDialogShow,
  formData,
})
</script>

<style lang="scss" scoped></style>
