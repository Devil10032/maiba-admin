<template>
  <el-dialog
    width="35%"
    v-model="isDialogShow"
    @close="onClose"
    :title="`${title}用户`"
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
import { addUser, editUser } from '@/api/user.js'
import { statuMenu, adminMenu, sexMenu } from '@/commom'

const emit = defineEmits(['update'])
// 控制弹框显示与隐藏
const isDialogShow = ref(false)
// 控制弹框显示与隐藏
const form = ref(null)
// 定义初始表单值
const defaultFormData = {
  nick_name: '',
  username: '',
  password: '',
  phone: '',
  province: '',
  city: '',
  gender: 1,
  is_admin: 0,
  state: 1,
  avatar_url: '',
}
// 表单绑定
const formData = ref({ ...defaultFormData })

// 表单渲染
const formColumns = [
  { label: '昵称', value: 'nick_name', type: 'text' },
  { label: '账号', value: 'username', type: 'text',placeholder:'账号用于登录' },
  { label: '密码', value: 'password', type: 'password' },
  { label: '手机号', value: 'phone', type: 'text' },
  { label: '省份', value: 'province', type: 'text' },
  { label: '城市', value: 'city', type: 'text' },
  { label: '性别', value: 'gender', type: 'radio', options: sexMenu },
  { label: '是否管理员', value: 'is_admin', type: 'radio', options: adminMenu,labelWidth:'170px' },
  { label: '状态', value: 'state', type: 'radio', options:statuMenu },
  { label: '头像', value: 'avatar_url', type: 'img' },
]
// 定义验证规则
const rules = reactive({
  nick_name: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
  username: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  province: [{ required: true, message: '请输入省份', trigger: 'blur' }],
  city: [{ required: true, message: '请输入城市', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  is_admin: [ { required: true, message: '请选择是否为管理员', trigger: 'change' }],
  state: [{ required: true, message: '请选择账号状态', trigger: 'change' }],
})

// 标题计算属性
const title = computed(() => (formData.value.id ? '修改' : '添加'))
// 点击确认
const onSubmit = async () => {
  await form.value.validate()
  formData.value.id
    ? await editUser(formData.value)
    : await addUser(formData.value)
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
