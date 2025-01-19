<template>
  <el-menu-item index="/home" @click="goRoute">
    <span class="menu-icon">
      <svg-icon
        name="home"
        color="#dddddd"
        width="26px"
        height="26px"
      ></svg-icon>
    </span>
    <span class="menu-text">首页</span>
  </el-menu-item>

  <el-menu-item index="/questions" @click="goRoute">
    <span class="menu-icon">
      <svg-icon
        name="book"
        color="#dddddd"
        width="24px"
        height="24px"
      ></svg-icon>
    </span>
    <span class="menu-text">题库</span>
  </el-menu-item>

  <el-menu-item index="/competitions" @click="goRoute">
    <span class="menu-icon">
      <svg-icon
        name="match"
        color="#dddddd"
        width="28px"
        height="28px"
      ></svg-icon>
    </span>
    <span class="menu-text">比赛</span>
  </el-menu-item>

  <el-menu-item index="/articles" @click="goRoute">
    <span class="menu-icon">
      <svg-icon
        name="article"
        color="#dddddd"
        width="25px"
        height="25px"
      ></svg-icon>
    </span>
    <span class="menu-text">专栏</span>
  </el-menu-item>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

let $router = useRouter()

const goRoute = (vc: any) => {
  $router.push(vc.index)
}
</script>

<style scoped lang="scss">
.el-menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  padding: 10px !important;
  height: auto;

  .menu-icon {
    margin: 0;
    padding: 0;
    display: inline-flex;
    align-items: center;
  }

  .menu-text {
    color: $base-menu-font-color;
    line-height: 1.2;
    font-weight: normal;
    margin-top: 5px;
  }
}
</style>
