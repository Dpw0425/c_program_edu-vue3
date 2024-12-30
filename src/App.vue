<template>
  <div class="box">
    <h1>我是 App 根组件</h1>
  </div>
</template>

<script setup lang="ts">
const str = 'hello world'
</script>

<style scoped lang="scss">
.box {
  height: 400px;
  width: 600px;
  background-color: black;
  h1 {
    color: white;
  }
}
</style>
