<template>
  <el-drawer
    size="45%"
    v-model="isDialogShow"
    :show-close="false"
    @close="onClose"
  >
    <template #title="{ close }">
      <el-row class="title-warp" type="flex" >
        <el-col class="title" :span="20">
          <el-row type="flex" align="middle" style="height: 100%;">
            <el-icon @click="close" color="#8c8c8c" size="16px"
            ><Close
          /></el-icon>
          <div class="text">{{ title }}商品</div>
          </el-row>
        </el-col>
        <el-col :span="2" >
          <el-space>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button type="danger" @click="close">取消</el-button>
          </el-space>
        </el-col>
      </el-row>
    </template>
    <el-form ref="form" :model="formData" :rules="rules" label-width="85px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="1">
          <el-form-item label="商品标题:" prop="title">
            <el-input v-model="formData.title" autocomplete="off" />
          </el-form-item>
          <el-row>
            <el-col :span="12"
              ><el-form-item label="商品分类:" prop="category_id">
                <el-select
                  v-model="formData.category_id"
                  placeholder="请选择商品分类"
                  clearable
                  style="width: 90%"
                >
                  <el-option
                    v-for="item in categoryList"
                    :key="item.id"
                    :label="item.cate_name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="是否为轮播图商品:"
                prop="swiper"
                label-width="160px"
              >
                <el-radio-group v-model="formData.swiper">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="原价:" prop="old_price">
                <el-input-number
                  style="width: 90%"
                  v-model="formData.old_price"
                  class="mx-4"
                  :min="1"
                  :max="30"
                  controls-position="right"
                /> </el-form-item
            ></el-col>
            <el-col :span="12">
              <el-form-item label="现价:" prop="price">
                <el-input-number
                  style="width: 90%"
                  v-model="formData.price"
                  class="mx-4"
                  :min="1"
                  :max="30"
                  controls-position="right"
                /> </el-form-item
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"
              ><el-form-item label="库存数量:" prop="repertory">
                <el-input-number
                  style="width: 90%"
                  v-model="formData.repertory"
                  class="mx-4"
                  :min="1"
                  :max="30"
                  controls-position="right"
                /> </el-form-item
            ></el-col>
            <el-col :span="12">
              <el-form-item label="品质:" prop="quality">
                <el-input
                  style="width: 90%"
                  v-model="formData.quality"
                  autocomplete="off"
                /> </el-form-item
            ></el-col>
          </el-row>
          <el-form-item label="商品状态:" prop="state">
            <el-radio-group v-model="formData.state">
              <el-radio v-for="item in statusMenu" :label="item.value">{{
                item.name
              }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="商品图片:" prop="cover_image">
            <ImageUpload style="width: 100%" v-model="formData.cover_image" />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="正文内容" name="2">
          <el-form-item prop="description" label-width="0px">
            <wang-editor refName="myEditor" v-model="formData.description" />
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { addCommodity, editCommodity} from '@/api/commodity.js'
import useCateStore from '@/store/modules/category'
import { statusMenu } from '@/commom'
const { categoryList } = storeToRefs(useCateStore())
const emit = defineEmits(['update'])
// 控制tab栏显示
const activeName = ref('1')
// 控制弹框显示与隐藏
const isDialogShow = ref(false)
// 控制弹框显示与隐藏
const form = ref(null)
// 定义初始表单值
const defaultFormData = {
  title: '',
  category_id: '',
  swiper: 1,
  old_price: 0,
  price: 0,
  repertory: 0,
  quality: '',
  state: 1,
  cover_image: '',
  description: '',
}
// 表单绑定
const formData = ref({ ...defaultFormData })

// 定义验证规则
const rules = reactive({
  title: [{ required: true, message: '请输入商品标题', trigger: 'blur' }],
  category_id: [{ required: true, message: '请选择商品分类', trigger: 'change' }],
  swiper: [{ required: true, message: '请选择是否为轮播图商品', trigger: 'change' }],
  old_price: [{ required: true, message: '请输入原价', trigger: 'change' }],
  price: [{ required: true, message: '请输入现价', trigger: 'change' }],
  repertory: [{ required: true, message: '请输入库存数量', trigger: 'change' }],
  quality: [{ required: true, message: '请输入品质', trigger: 'blur' }],
  state: [{ required: true, message: '请选择商品状态', trigger: 'change' }],
  cover_image: [{ required: true, message: '请选择商品图片', trigger: 'change' }],
  description: [{ required: true, message: '请输入商品描述', trigger: 'blur' }],
})

// 标题计算属性
const title = computed(() => (formData.value.id ? '修改' : '添加'))
// 点击确认
const onSubmit = async () => {
  await form.value.validate()
  formData.value.id
    ? await editCommodity(formData.value)
    : await addCommodity(formData.value)
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
