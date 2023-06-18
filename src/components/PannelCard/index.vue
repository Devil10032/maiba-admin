<template>
  <div class="pannel-container">
    <el-card class="search-warp">
      <!-- 搜索行 -->
      <el-row type="flex" justify="space-between">
        <!-- 搜索表单 -->
        <my-form
          isBtnShow
          :labelWidth="auto"
          :formData="formData"
          :formColumns="formColumns"
          @onSearch="onSearch"
          @onCancel="onCancel"
        >
          <template v-for="item in formColumns"  #[item.value]="{ formData }">
            <slot :name="`form${item.value}`" :formData="formData"></slot>
          </template>
        </my-form>
        <!-- 新增按钮 -->
        <el-button
          type="primary"
          v-if="isAddShow"
          icon="Plus"
          @click="$emit('addRow')"
          >创建</el-button
        >
      </el-row>
    </el-card>
    <el-card class="table-warp">
      <!-- 表格区域 -->
      <el-row class="table-row">
        <el-table border highlight-current-row :data="list" style="width: 100%">
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="80"
            :index="($event) => $event + 1"
          />
          <el-table-column
            v-for="item in columns"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :align="item.align ? item.align : 'center'"
            :width="item.width"
          >
            <template v-slot="{ row }">
              <slot :row="row" :name="item.prop" :cell="row[item.prop]">
                <span>{{ row[item.prop] }}</span>
              </slot>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template v-slot="{ row: { id, notEdit } }">
              <el-space>
                <el-button
                  type="primary"
                  v-if="!notEdit"
                  @click="$emit('editRow', id)"
                  >编辑</el-button
                >
                <el-button type="danger" @click="$emit('delRow', id)"
                  >删除</el-button
                >
              </el-space>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 分页区域 -->
      <el-row type="flex" justify="center" class="pagination-row">
        <el-pagination
          background
          hide-on-single-page
          @size-change="sizeChange"
          @current-change="currentChange"
          :page-sizes="[5, 10, 20, 30, 50]"
          layout="total,sizes,prev, pager, next, jumper"
          :total="total"
        />
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { auto } from '@popperjs/core'

// 接受父组件的传值
const {
  formColumns,
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
  defaultFormData: {
    type: Object,
    default: () => ({}),
  },
  formColumns: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
  list: {
    type: Array,
    default: () => [],
  },
  pageNum: {
    type: Number,
    default: null,
  },
  pageSize: {
    type: Number,
    default: null,
  },
  total: {
    type: Number,
    default: 0,
  },
  initData: {
    type: Function,
    default: () => {},
  },
  isAddShow: {
    type: Boolean,
    default: true,
  },
})
// 自定义事件
const emit = defineEmits([
  'update:pageNum',
  'update:pageSize',
  'update:formData',
  'addRow',
  'delRow',
  'editRow',
])

// 点击搜索
const onSearch = () => {
  emit('update:pageNum', 1)
  initData()
}
// 点击取消
const onCancel = () => {
  emit('update:pageNum', 1)
  emit('update:formData', { ...defaultFormData })
  initData()
}
// 每页数据改变
const sizeChange = (size) => {
  emit('update:pageSize', size)
  initData()
}
// 页码数据变化
const currentChange = (page) => {
  emit('update:pageNum', page)
  initData()
}
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
