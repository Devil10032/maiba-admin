<template>
  <!-- 搜索表单 -->
  <el-form
    ref="form"
    :inline="inline"
    :model="formData"
    :rules="rules"
    :label-width="labelWidth"
    class="search-form"
  >
    <el-form-item
      :style="{ width: item.itemWidth }"
      v-for="item in formColumns"
      :key="item.value"
      :label="item.label"
      :prop="item.value"
      :label-width="item.labelWidth"
    >
      <slot :name="item.value" :formData="formData">
        <el-input
          :style="{ width: item.width }"
          v-if="inputTypes.includes(item.type)"
          :type="item.type"
          :rows="item.rows"
          v-model="formData[item.value]"
          :placeholder="
            item.placeholder ? item.placeholder : `请输入${item.label}`
          "
        />
        <el-select
          :style="{ width: item.width }"
          v-if="item.type === 'select'"
          v-model="formData[item.value]"
          :placeholder="`请选择${item.label}`"
          @change="item.onChange($event)"
          clearable
        >
          <template v-if="item.options">
            <el-option
              v-for="opt in item.options"
              :key="opt.value"
              :label="opt.name"
              :value="opt.value"
            >
            </el-option>
          </template>
        </el-select>
        <el-radio-group
          :style="{ width: item.width }"
          v-if="item.type === 'radio'"
          v-model="formData[item.value]"
          @change="item.onChange($event)"
        >
          <el-radio
            v-for="radio in item.options"
            :key="radio.value"
            :label="radio.value"
          >
            {{ radio.name }}
          </el-radio>
        </el-radio-group>
        <el-input-number
          :style="{ width: item.width }"
          v-if="item.type === 'elnumber'"
          v-model="formData[item.value]"
          class="mx-4"
          :min="item.min"
          :max="item.max"
          controls-position="right"
        />
        <wang-editor
          v-if="item.type === 'editor'"
          refName="myEditor"
          v-model="formData[item.value]"
        />
        <ImageUpload
          v-if="item.type === 'img'"
          :style="{ width: item.width ? item.width : '100%' }"
          v-model="formData[item.value]"
        />
      </slot>
    </el-form-item>
    <!-- 按钮 -->
    <el-form-item v-if="isBtnShow" labelWidth="0px">
      <el-button type="primary" icon="Search" @click="emit('onSearch')"
        >搜索</el-button
      >
      <el-button icon="Refresh" @click="emit('onCancel')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
// 接受父组件的传值

import { ref } from 'vue'

const inputTypes = ['text', 'password', 'number', 'textarea']
const {
  initData,
  pageNum,
  pageSize,
  formData,
  total,
  defaultFormData,
  isAddShow,
} = defineProps({
  formData: {
    type: Object,
    default: () => ({}),
  },
  formColumns: {
    type: Array,
    default: () => [],
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
  isBtnShow: {
    type: Boolean,
    default: false,
  },
  inline: {
    type: Boolean,
    default: true,
  },
  labelWidth: {
    type: String,
    default: '80px',
  },
})
// 自定义事件
const emit = defineEmits(['onSearch', 'onCancel'])

const form = ref(null)
const validate = async () => await form.value.validate()
const resetFields = async () => await form.value.resetFields()
defineExpose({
  validate,
  resetFields,
})
</script>

<style lang="scss" scoped>
.pannel-container {
  :deep(.el-card__body) {
    padding: 30px 25px !important;
  }
  .search-warp {
    margin-bottom: 10px;
    :deep(.el-form-item) {
      margin-bottom: 0 !important;
    }
  }
  .table-row {
    margin-bottom: 20px;
  }
}
</style>
