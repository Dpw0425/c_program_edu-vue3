<template>
  <div>
    <h1>测试 axios 二次封装</h1>
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/request';
import { onMounted } from 'vue';

onMounted(() => {
  request({
    url: '/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '123456'
    }
  }).then(res => {
    console.log(res)
  })
})
</script>

<style scoped>

</style>