<template>
  <div class="home_container">
    <!-- 左侧菜单 -->
    <div class="home_slider">
      <div class="home_button">
        <svg-icon name="home" color="white" width="60%" height="60%"></svg-icon>
      </div>

      <!-- 分割 -->
      <div style="width: 100%; height: 6px"></div>

      <el-menu
        class="menu_list"
        text-color="#dddddd"
        background-color="#34495e"
      >
        <Menu></Menu>
      </el-menu>
    </div>
    <!-- 顶部导航 -->
    <div class="home_tabbar"></div>
    <!-- 内容展示区 -->
    <div class="home_main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入左侧菜单栏
import Menu from './menu/index.vue'

// 引入内容展示区
import Main from './main/index.vue'
</script>

<style scoped lang="scss">
.home_container {
  width: 100%;
  height: 100vh;

  .home_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background-color;

    .home_button {
      width: 100%;
      height: $base-tabbar-height;
      background-color: #3498db;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .menu_list {
      width: 100%;
      height: 100vh;
      align-items: center;
      padding: 0;
      border: none;
    }
  }

  .home_tabbar {
    position: fixed;
    top: 0px;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background-color: $base-tabbar-background-color;
  }

  .home_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background-color: $base-container-background-color;
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
  }
}
</style>
