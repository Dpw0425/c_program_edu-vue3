<template>
  <div>
    <el-button type="primary" size="default" :icon="Plus">主要按钮</el-button>
    <el-button type="success" size="small" :icon="Edit">编辑按钮</el-button>
    <el-button type="danger" size="default" :icon="Delete">删除按钮</el-button>
    <el-pagination
        :page-sizes="[100, 200, 300, 400]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
    />
  </div>
</template>

<script setup lang="ts">
  // 引入图标组件
  import { Delete, Edit, Plus } from '@element-plus/icons-vue';
</script>

<style scoped>

</style>