<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <div class="home_button">
        <svg-icon name="home" color="white" width="60%" height="60%"></svg-icon>
      </div>

      <!-- 分割 -->
      <div style="width: 100%; height: 6px"></div>

      <el-menu
        class="menu_list"
        text-color="#dddddd"
        background-color="#34495e"
        :default-active="$router.path"
      >
        <Menu></Menu>
      </el-menu>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区 -->
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

// 引入左侧菜单栏
import Menu from './menu/index.vue'

// 引入内容展示区
import Main from './main/index.vue'

// 引入顶部导航栏
import Tabbar from './tabbar/index.vue'

let $router = useRoute()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
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
      height: auto;
      align-items: center;
      padding: 0;
      border: none;
    }
  }

  .layout_tabbar {
    position: fixed;
    top: 0px;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background-color: $base-tabbar-background-color;
    color: $base-tabbar-font-color;
  }

  .layout_main {
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
