<template>
  <div :ref="refName" />
</template>

<script setup>
// 引入 wangEditor
import { ref,onMounted } from 'vue';
import wangEditor from 'wangeditor'
const { proxy } = getCurrentInstance()
 const {placeholder,height,modelValue,refName} = defineProps({
    // 提示信息
    placeholder: {
      type: String,
      default: '请输入文章内容'
    },
    // 高度
    height: {
      type: Number,
      default: 200
    },
    // 绑定内容
    modelValue: {
      type: String,
      default: () => ({})
    },
    // 绑定选择器名称
    refName: {
      type: String,
      default: () => ({})
    }
  })

  const emit = defineEmits(['update:modelValue'])
  const  editor = ref(null)  // 用于销毁

  watch(
    ()=>modelValue,
    newVal=>{
      if (newVal !== editor.value.txt.html()) {
        editor.value.txt.html(newVal)
      }
    }
  )
  onMounted(()=> {
    // eslint-disable-next-line new-cap
    editor.value = new wangEditor(proxy.$refs[refName]) // 创建实例
    editor.value.config.height = height // 配置高度
    editor.value.config.zIndex = 10 // 配置层级
    editor.value.config.placeholder = placeholder // 配置提示文字
    editor.value.config.onchange = newHtml =>emit('update:modelValue', newHtml)
    editor.value.config.onchangeTimeout = 500 // 配置回调时长 修改为 500ms ，默认为 200ms太快
    editor.value.create() //  创建编辑器
    editor.value.txt.html(modelValue) // 设置初始内容
  })

  onUnmounted(() => {
    editor.value.destroy()
    editor.value = null
  })

</script>

<style>

</style>
