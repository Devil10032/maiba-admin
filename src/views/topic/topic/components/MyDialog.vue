<template>
  <el-drawer
    size="45%"
    v-model="isDialogShow"
    :show-close="false"
    @close="onClose"
  >
    <template #title="{ close }">
      <el-row class="title-warp" type="flex">
        <el-col class="title" :span="20">
          <el-row type="flex" align="middle" style="height: 100%">
            <el-icon @click="close" color="#8c8c8c" size="16px"
              ><Close
            /></el-icon>
            <div class="text">{{ title }}帖子</div>
          </el-row>
        </el-col>
        <el-col :span="2">
          <el-space>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button type="danger" @click="close">取消</el-button>
          </el-space>
        </el-col>
      </el-row>
    </template>
    <my-form
      ref="form"
      :formData="formData"
      :formColumns="formColumns"
      :rules="rules"
      :inline="false"
    >
    </my-form>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { addTopic, editTopic } from '@/api/topic.js'
import { statuMenu, hotMenu } from '@/commom'
const emit = defineEmits(['update'])
// 控制弹框显示与隐藏
const isDialogShow = ref(false)
// 控制弹框显示与隐藏
const form = ref(null)
// 定义初始表单值
const defaultFormData = {
  theme: '',
  state: 1,
  hot_degree: 0,
  img_src: '',
  description: '',
}
// 表单绑定
const formData = ref({ ...defaultFormData })

// 表单渲染
const formColumns = [
  { label: '帖子名称', value: 'theme', type: 'text' },
  {
    label: '帖子状态',
    value: 'state',
    type: 'radio',
    options: statuMenu,
  },
  {
    label: '热门程度',
    value: 'hot_degree',
    type: 'radio',
    options:hotMenu,
  },
  {
    label: '商品图片',
    value: 'img_src',
    type: 'img',
  },
  {
    label: '帖子内容',
    value: 'description',
    type: 'editor',
  },
  
]
// 定义验证规则
const rules = reactive({
  theme: [{ required: true, message: '请输入帖子标题', trigger: 'blur' }],
  hot_degree: [{ required: true, message: '请选择帖子状态', trigger: 'blur' }],
  state: [{ required: true, message: '请选择热门程度', trigger: 'change' }],
  img_src: [{ required: true, message: '请选择热门图片', trigger: 'change' }],
  description: [{ required: true, message: '请输入帖子内容', trigger: 'blur' }],
})

// 标题计算属性
const title = computed(() => (formData.value.id ? '修改' : '添加'))
// 点击确认
const onSubmit = async () => {
  await form.value.validate()
  formData.value.id
    ? await editTopic(formData.value)
    : await addTopic(formData.value)
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

<style lang="scss" scoped>
:deep(.el-tabs__content) {
  padding: 30px;
}
:deep(.el-drawer) {
  :deep(.el-drawer__header) {
    padding: 20px;

    border-bottom: 1px solid #000;
  }
}

.title-warp {
  display: flex;
  .text {
    margin-left: 10px;
    line-height: 32px;
  }
}
</style>
