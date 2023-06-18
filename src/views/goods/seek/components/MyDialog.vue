<template>
  <el-dialog
    width="30%"
    v-model="isDialogShow"
    @close="onClose"
    :title="`${title}求购信息`"
  >
    <my-form
      ref="form"
      :formData="formData"
      :formColumns="formColumns"
      :rules="rules"
    >
    <template #category_id="{ formData }">
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
import { addSeek, editSeek } from '@/api/seek.js'
import { statuMenu } from '@/commom'
import useCateStore from '@/store/modules/category'
const { categoryList } = toRefs(useCateStore())
const emit = defineEmits(['update'])
// 控制弹框显示与隐藏
const isDialogShow = ref(false)
// 控制弹框显示与隐藏
const form = ref(null)
// 定义初始表单值
const defaultFormData = {
  category_id: '',
  max_price: 0,
  min_price: 0,
  remark: '',
  state: 1,
  title: '',
}
// 表单绑定
const formData = ref({ ...defaultFormData })

// 表单渲染
const formColumns = [
  { label: '求购标题', value: 'title', type: 'text',itemWidth:'100%', width:'90%' },
  { label: '求购分类', value: 'category_id', type: 'select',itemWidth:'45%'},
  { label: '信息状态', value: 'state', type: 'radio',options: statuMenu,itemWidth:'40%'},
  { label: '最小价格', value: 'min_price', type: 'elnumber',max:100,min:1 },
  { label: '最大价格', value: 'max_price', type: 'elnumber',max:100,min:1 },
  { label: '备注信息', value: 'remark', type: 'textarea',itemWidth:'100%',rows:3,width:'90%'},
]
// 定义验证规则
const rules = reactive({
  category_id: [
    { required: true, message: '请选择求购分类', trigger: 'change' },
  ],
  max_price: [
    { required: true, message: '请输入求购最大价格', trigger: 'change' },
  ],
  min_price: [
    { required: true, message: '请输入求购最小价格', trigger: 'change' },
  ],
  remark: [{ required: true, message: '请输入求购商品备注', trigger: 'blur' }],
  state: [{ required: true, message: '请选择信息状态', trigger: 'change' }],
  title: [{ required: true, message: '请输入求购信息标题', trigger: 'blur' }],
})

// 标题计算属性
const title = computed(() => (formData.value.id ? '修改' : '添加'))
// 点击确认
const onSubmit = async () => {
  await form.value.validate()
  formData.value.id
    ? await editSeek(formData.value)
    : await addSeek(formData.value)
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
