<template>
  <div class="home_container">
    <!-- 左侧菜单 -->
    <div class="home_slider">
      <div class="home_button">
        <svg-icon name="home" color="white" width="60%" height="60%"></svg-icon>
      </div>

      <!-- 分割 -->
      <div style="width: 100%; height: 10px"></div>

      <el-menu class="menu" text-color="#dddddd" background-color="#34495e">
        <el-menu-item index="1">
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

        <el-menu-item index="2">
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

        <el-menu-item index="3">
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
      </el-menu>
    </div>
    <!-- 顶部导航 -->
    <div class="home_tabbar"></div>
    <!-- 内容展示区 -->
    <div class="home_main">
      <p style="height: 10000px">123</p>
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

    .home_button {
      width: 100%;
      height: $base-tabbar-height;
      background-color: #3498db;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .menu {
      width: 100%;
      height: 100vh;
      align-items: center;
      padding: 0;
      border: none;

      .el-menu-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        white-space: nowrap;
        padding: 10px;
        height: auto;

        .menu-icon {
          margin: 0;
          padding: 0;
          display: inline-flex;
          align-items: center;
        }

        .menu-text {
          color: $base-menu-font-color;
          line-height: 1.5;
          font-weight: normal;
          margin-top: 5px;
        }
      }
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
