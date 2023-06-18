<template>
  <el-dialog
    width="35%"
    v-model="isDialogShow"
    @close="onClose"
    :title="`${title}通知公告`"
  >
    <my-form
      ref="form"
      :formData="formData"
      :formColumns="formColumns"
      :rules="rules"
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
import { addMessage, editMessage } from '@/api/message.js'
import { msgMenu } from '@/commom'

const emit = defineEmits(['update'])
// 控制弹框显示与隐藏
const isDialogShow = ref(false)
// 控制弹框显示与隐藏
const form = ref(null)
// 定义初始表单值
const defaultFormData = {
  title: '',
  cover_image: '',
  state: 1,
  type: 1,
  content: '',
}
// 表单绑定
const formData = ref({ ...defaultFormData })
// 表单渲染
const formColumns = [
  { label: '标题名称', value: 'title', type: 'text',itemWidth:'95%' },
  { label: '封面', value: 'cover_image', type: 'img',itemWidth:'40%'},
  { label: '商品状态', value: 'state', type: 'radio', options: msgMenu ,itemWidth:'45%',labelWidth:'120px'},
  { label: '内容', value: 'content', type: 'editor' },
]
// 定义验证规则
const rules = reactive({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  cover_image: [{ required: true, message: '请选择封面', trigger: 'change' }],
  state: [{ required: true, message: '请选择商品状态', trigger: 'change' }],
  content: [{ required: true, message: '请输入通告内容', trigger: 'blur' }],
})

// 标题计算属性
const title = computed(() => (formData.value.id ? '修改' : '添加'))
// 点击确认
const onSubmit = async () => {
  await form.value.validate()
  formData.value.id
    ? await editMessage(formData.value)
    : await addMessage(formData.value)
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
