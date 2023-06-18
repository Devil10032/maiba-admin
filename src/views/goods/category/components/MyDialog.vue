<template>
  <el-dialog
    width="30%"
    v-model="isDialogShow"
    @close="onClose"
    :title="`${title}分类`"
  >
    <my-form
      ref="form"
      :formData="formData"
      :formColumns="formColumns"
      :rules="rules"
      :inline="false"
    >
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
import { addCate, editCate } from '@/api/cate.js'

const emit = defineEmits(['update'])
// 控制弹框显示与隐藏
const isDialogShow = ref(false)
// 控制弹框显示与隐藏
const form = ref(null)
// 定义初始表单值
const defaultFormData = {
  cate_icon: '',
  cate_name: '',
  sort: 1,
}
// 表单渲染
const formColumns = [
  { label: '分类名称', value: 'cate_name', type: 'text',width:'80%' },
  { label: '排序大小', value: 'sort', type: 'elnumber', min: 1, max: 30 },
  { label: '分类图标', value: 'cate_icon', type: 'img' },
]
// 表单绑定
const formData = ref({ ...defaultFormData })

// 定义验证规则
const rules = reactive({
  cate_icon: [{ required: true, message: '请选择分类图标', trigger: 'change' }],
  cate_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
  sort: [{ required: true, message: '请输入排序大小', trigger: 'blur' }],
})

// 标题计算属性
const title = computed(() => (formData.value.id ? '修改' : '添加'))
// 点击确认
const onSubmit = async () => {
  await form.value.validate()
  formData.value.id
    ? await editCate(formData.value)
    : await addCate(formData.value)
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

defineExpose({
  isDialogShow,
  formData,
})
</script>

<style lang="scss" scoped></style>
