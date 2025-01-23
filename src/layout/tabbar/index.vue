<template>
  <div class="tabbar">
    <!-- 左侧导航栏 -->
    <div class="tabbar_left">
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="(item, index) in $router.matched"
          :key="index"
          v-show="item.meta.title != 'layout'"
          :to="item.path"
        >
          <span class="breadcrumb_icon">
            <svg-icon
              :name="item.meta.icon"
              style="margin-top: -1px"
            ></svg-icon>
          </span>
          <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 右侧用户中心 -->
    <div class="tabbar_right">
      <el-button size="small" icon="Refresh" circle="true"></el-button>
      <el-button size="small" icon="FullScreen" circle="true"></el-button>
      <el-button size="small" icon="setting" circle="true"></el-button>
      <el-icon style="width: 24px; height: 24px; margin: 0 10px">
        <User />
      </el-icon>
      <el-dropdown>
        <span class="el-dropdown-link">
          admin
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

let $router = useRoute()
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;

    .breadcrumb_icon {
      margin: 0 3px;
      vertical-align: middle;

      svg {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }

  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
