<template>
  <svg :style="{ width, height }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  // xlink:href 属性值前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  // 提供使用的图标名称
  name: String,
  // 图标颜色填充, 默认原色
  color: {
    type: String,
    default: '',
  },
  // 接收父组件传递的图标尺寸
  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<style scoped></style>
