<template>
  <div class="tabbar">
    <!-- 左侧导航栏 -->
    <div class="tabbar_left">
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="(item, index) in $route.matched"
          :key="index"
          v-show="item.meta.title != 'layout'"
          :to="item.path"
        >
          <span class="breadcrumb_icon">
            <svg-icon :name="item.meta.icon"></svg-icon>
          </span>
          <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 中部搜索栏 -->
    <div class="tabbar_middle">
      <form
        action=""
        class="search_box"
        :class="{ active: isFocused }"
        @click="focusInput"
        ref="search_box"
      >
        <div
          class="input_box"
          :class="{ active: isFocused }"
          @click="focusInput"
          ref="input_box"
        >
          <input
            ref="inputRef"
            v-model="input"
            class="input_area"
            type="text"
            autocomplete="off"
            accesskey="s"
            maxlength="100"
            x-webkit-speech
            x-webkit-grammar="builtin:translate"
            placeholder="搜索内容"
            @focus="inputFocused = true"
            @blur="inputFocused = false"
          />
        </div>
        <div class="search_icon">
          <svg-icon
            name="search"
            width="22px"
            height="22px"
            color="#515151"
          ></svg-icon>
        </div>
      </form>

      <div class="search-panel"></div>
    </div>

    <!-- 右侧用户中心 -->
    <div class="tabbar_right">
      <el-button
        size="small"
        icon="Refresh"
        circle="true"
        @click="refresh"
      ></el-button>
      <el-button size="small" icon="FullScreen" circle="true"></el-button>
      <el-button size="small" icon="setting" circle="true"></el-button>
      <el-dropdown style="margin-right: 30px">
        <span
          class="el-dropdown-link"
          style="display: flex; align-items: center"
        >
          <img
            v-if="userStore.user_id == 0"
            src="@/assets/images/login.jpg"
            style="
              width: 38px;
              height: 38px;
              margin: 0 10px;
              border-radius: 50%;
            "
          />
          <img
            v-else
            :src="userStore.avatar"
            style="
              width: 38px;
              height: 38px;
              margin: 0 10px;
              border-radius: 50%;
            "
          />
          <span style="display: flex; align-items: center">
            {{ userStore.user_name }}
          </span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-if="userStore.user_id == 0" @click="toLogin">
              前往登录
            </el-dropdown-item>
            <el-dropdown-item v-else @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import { ElNotification } from 'element-plus'
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'

let $route = useRoute()
let $router = useRouter()

let input = ref('')

// 搜索栏样式监听器
let isFocused = ref(false)
let inputFocused = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const input_box = ref(null)
const search_box = ref(null)
const focusInput = () => {
  isFocused.value = true
  if (inputRef.value) {
    inputRef.value.focus()
  }
}
onClickOutside(input_box, () => {
  isFocused.value = false
})
onClickOutside(search_box, () => {
  isFocused.value = false
})

let layoutSettingStore = useLayoutSettingStore()
const refresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}

let userStore = useUserStore()

const toLogin = () => {
  $router.push({ path: '/login', query: { redirect: $route.path } })
}

const logout = async () => {
  try {
    await userStore.userLogout()

    location.reload()
    // 重新登录时的重定向, 使用户重新登录后回到之前浏览的页面
    // $router.push({ path: '/login', query: { redirect: $route.path } })
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  align-items: center;

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

  .tabbar_middle {
    position: relative;
    margin: 0 auto;
    align-items: center;
  }

  .search_box {
    display: flex;
    align-items: center;
    padding: 0 48px 0 4px;
    position: relative;
    z-index: 1;
    overflow: hidden;
    line-height: 38px;
    border: 1px solid #ffffff;
    border-radius: 8px;
    box-sizing: border-box;
    height: 40px;
    background-color: $base-search-box-background-color;
    opacity: 0.9;
    transition: background-color 0.3s;
    transition: border 0.3s;

    &:hover {
      background-color: #ffffff;
      border: 1px solid #e3e5e7;
    }

    &.active {
      background-color: #ffffff;
      border: 1px solid #e3e5e7;
    }

    .input_box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      padding: 0 0 0 8px;
      width: 100%;
      height: 32px;
      border: 2px solid transparent;
      border-radius: 6px;
      box-sizing: border-box;
      transition: background-color;

      &.active {
        background-color: #e6e7e9;
      }

      .input_area {
        flex: 1;
        overflow: hidden;
        border: none;
        background-color: transparent;
        box-shadow: none;
        color: #61666d;
        font-size: 14px;
        line-height: 20px;
        outline: none;
        transition: color 0.3s;

        &:focus {
          color: #18191c;
        }
      }
    }

    .search_icon {
      position: absolute;
      top: 3px;
      right: 7px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 6px;
      line-height: 32px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #e6e7e9;
      }
    }
  }

  .tabbar_right {
    display: flex;
    align-items: center;
  }
}

.el-dropdown .el-dropdown-link {
  border: none;
}

.el-dropdown .el-dropdown-link:focus {
  outline: none;
}

.el-dropdown .el-dropdown-link:hover {
  border: none;
}
</style>
