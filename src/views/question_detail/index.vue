<template>
  <div>
    <h1>题目详情{{ questionId }}</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

let route = useRoute()
let questionId = route.query.id

onMounted(() => {})
</script>

<style scoped lang="scss"></style>
