<template>
  <div class="home_container">
    <!-- 左侧菜单 -->
    <div class="home_slider">

    </div>
    <!-- 顶部导航 -->
    <div class="home_tabbar">

    </div>
    <!-- 内容展示区 -->
    <div class="home_main">
      <p style="height: 10000px; background-color: red;">123</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.home_container {
  width: 100%;
  height: 100vh;
  
  .home_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background-color;
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
