<template>
  <div>
    <h1>首页</h1>
    {{ userStore.username }}
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'

let userStore = useUserStore()
onMounted(() => {
  userStore.userInfo()
})
</script>

<style scoped></style>
