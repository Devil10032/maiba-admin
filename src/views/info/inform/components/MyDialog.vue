<template>
  <el-dialog
    width="40%"
    v-model="isDialogShow"
    @close="onClose"
    :title="`${title}用户`"
  >
    <el-tabs v-model="activeName" tab-position="top">
      <el-tab-pane label="投诉内容" name="1">
        <!-- 求购表格 -->
        <Descritions :columns="columns" :column="3" :detail="data">
          <template #value>
            <span>{{ detail.seek_id ? '求购信息' : '商品信息' }}</span>
          </template>
          <template #state="{ cell }">
            <span v-if="cell">{{ formateStatus(cell, statuMenu).name }}</span>
          </template>
          <template #min_price="{ cell, detail }">
            <span v-if="detail">￥{{ cell }} 至 ￥{{ detail.max_price }}</span>
            <span v-else>￥ 至 ￥</span>
          </template>

          <template #cover_image="{ cell }">
            <image-preview width="100px"  height="100px" :src="cell"/> 
          </template>
        </Descritions>
        <el-divider style="margin: 7px 0" />

        <Descritions :columns="detailColumns" :column="1" :detail="detail">
          <template #value>
            <span>求购信息</span>
          </template>
        </Descritions>
      </el-tab-pane>
      <el-tab-pane name="2" label="回复情况">
        <Descritions :columns="replyColumns" :column="1" :detail="detail">
          <template #state="{ cell }">
            <el-tag v-if="cell"  :type="formateStatus(cell, informMenu).type">
              {{ formateStatus(cell, informMenu).name }}
            </el-tag>
          </template>
          <template #reply_content="{ cell, detail }">
            <span v-if="detail.state">{{ cell }}</span>
            <el-space v-else>
              <wang-editor
                refName="myEditor"
                v-model="replyData.reply_content"
              />
              <el-button
                type="primary"
                size="default"
                @click="onSubmit"
              ></el-button>
            </el-space>
          </template>
        </Descritions>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { addUser, editUser } from '@/api/user.js'
import Descritions from './Descritions.vue'
import useHooks from '@/hooks'
import { statuMenu, informMenu } from '@/commom'
const { formateStatus } = useHooks()
const emit = defineEmits(['update'])
// 控制弹框显示与隐藏
const isDialogShow = ref(false)
// 控制弹框显示与隐藏
const activeName = ref('1')

const detail = ref({})

const replyData = ref({
  commodity_id: '',
  content: '',
  create_time: '',
  id: '',
  reply_content: '',
  reply_time: '',
  seek_id: '',
  state: '',
  topic_id: '',
  user_id: '',
})

const detailColumns = [
  { label: '投诉时间', prop: 'create_time' },
  { label: '投诉描述', prop: 'content' },
]


const defaultData = [
  { label: '回复状态', prop: 'state' },
  { label: '回复内容', prop: 'reply_content' },
]
const replyColumns = ref([...defaultData])
// 表格渲染
const seekColumns = [
  { label: '求购标题', prop: 'title', span: 3 },
  { label: '信息ID', prop: 'id' },
  { label: '投诉类型', prop: 'value' },
  { label: '价格区间', prop: 'min_price' },
  { label: '发布时间', prop: 'publish_date', span: 2 },
  { label: '信息状态', prop: 'state' },
  { label: '详细描述', prop: 'remark', span: 3 },
]

// 表格渲染

const commodityColumns = [
  { label: '商品标题', prop: 'title', span: 3 },
  { label: '商品ID', prop: 'id' },
  { label: '投诉类型', prop: 'value' },
  { label: '商品封面', prop: 'cover_image' },
  { label: '商品原价', prop: 'old_price' },
  { label: '商品现价', prop: 'price' },
  { label: '商品品质', prop: 'quality' },
  { label: '发布时间', prop: 'publish_date' },
  { label: '收藏量', prop: 'collect_count' },
  { label: '浏览量', prop: 'click_count' },
  { label: '商品状态', prop: 'state', span: 3 },
  { label: '详细描述', prop: 'description', span: 3 },
]

watch(
  () => detail.value.state,
  (newVal) => {
    if (!newVal) return
    replyColumns.value.splice(1, 0, { label: '回复时间', prop: 'reply_time' })
  }
)
const columns = computed(() =>
  detail.value.seek_id ? seekColumns : commodityColumns
)

const data = computed(() =>
  detail.value.seek_id ? detail.value.seek_data : detail.value.commodity_data
)

// 标题计算属性
const title = computed(() => (detail.value.id ? '修改' : '添加'))
// 点击确认
const onSubmit = async () => {
  await form.value.validate()
  detail.value.id ? await editUser(detail.value) : await addUser(detail.value)
  ElMessage.success(`${title.value}成功`)
  emit('update')
  onClose()
}
// 点击取消
const onClose = () => {
  detail.value = {}
  replyColumns.value = [...defaultData]
  isDialogShow.value = false
}

defineExpose({
  isDialogShow,
  detail,
})
</script>

<style lang="scss" scoped></style>
