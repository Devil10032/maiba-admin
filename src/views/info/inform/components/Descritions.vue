<script setup>
const { column, columns, detail } = defineProps({
  column: Number,
  columns: Array,
  detail: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <div class="descriptions-container">
    <el-descriptions :column="column"   border>
      <el-descriptions-item
        v-for="item in columns"
        :key="item.prop"
        :label="item.label"
        :span="item.span"
      >
        <slot
          :name="item.prop"
          :cell="detail ? detail[item.prop] : ''"
          :detail="detail"
        >
          <span>{{ detail ? (detail[item.prop] ? detail[item.prop] : '') : ''}}</span>
        </slot>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style lang="scss" scoped></style>
