<template>
  <div>
    <div class="personal_container">
    <el-card class="custom-card" style="width: 1200px; height: 300px;">
      <div class="header_top">
        <img :src="personal?.avatar" class="avatar">
        <div class="user_info">{{ personal?.user_name }}</div>
      </div>

      <div class="header_bottom">
        <div class="menu" style="--main-color: #3498db;">
          <ul class="items">
            <li v-for="(item, index) in menuItems" :key="index" :class="{ active: activeIndex === index }" @click="activeIndex = index" class="menu-item">{{ item }}</li>
            <div class="indicator" :style="indicatorStyle"></div>
          </ul>
        </div>

        <div class="user_stats">
          <div v-for="(stat, index) in statsItems" :key="index" class="stat-item">
            <span class="stat-label">{{ stat.label }}</span>
            <span class="stat-value">{{ stat.value }}</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>

  <div class="row">
    <div class="col-md-8">
      <el-card shadow="never">
        <div v-if="activeIndex === 0">
          <h2>个人主页</h2>
        </div>

        <div v-if="activeIndex === 1">
          <h2>我的团队</h2>
        </div>
      </el-card>
    </div>

    <div class="col-md-4">
      <el-card shadow="never">
        <div class="user_details">
          <div class="info" v-for="item in infoItems" :key="item.label">
            <div class="info-label">{{ item.label }}</div>
            <div class="info-value">{{ item.value }}</div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { reqPersonal } from '@/api/user';
import type { personalDetail, personalResponseData } from '@/api/user/type';
import { computed, onMounted, ref } from 'vue';

let personal = ref<personalDetail>()

let activeIndex = ref(0)
let menuItems = ref(['主页', '团队'])

const indicatorStyle = computed(() => {
  let itemWidth = 64
  return {
    width: `${itemWidth}px`,
    transform: `translateX(${activeIndex.value * itemWidth}px)`,
    backgroundColor: 'var(--main-color, #3498db)'
  }
})

let statsItems = computed(() => {
  return [
    { label: '提交', value: personal.value?.commit_times ?? 0 },
    { label: '比赛', value: personal.value?.competition_times ?? 0 },
  ]
})

let infoItems = computed(() => {
  return [
    { label: '用户编号', value: personal.value?.user_id },
    { label: '年级', value: personal.value?.grade },
    { label: '学号', value: personal.value?.student_id },
  ]
})

const getUserDetail = async () => {
  let result: personalResponseData = await reqPersonal()
  if (result.code == 200) {
    personal.value = result.data as personalDetail
  }
}

onMounted(() => {
  getUserDetail()
})
</script>

<style scoped lang="scss">
.personal_container {
  width: 100%;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
}

:deep(.custom-card) {
  --el-card-padding: 0 !important;

  .el-card__header {
    padding: 0;
  }

  .el-card__body {
    padding: 0;
    margin: 0;
  }
}

.header_top {
  position: relative;
  background-color: #5daa80;
  width: 100%;
  height: 240px;
  margin: 0;
  padding: 0;
}

.header_top > .avatar {
  position: absolute;
  bottom: 24px;
  left: 24px;
  border: 1px solid #979797;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
}

.user_info {
  color: #f2f9f2;
  position: absolute;
  bottom: 30px;
  left: 96px;
  text-shadow: 1px 1px 3px #333;
  font-size: 1.5em;
}

.header_bottom {
  height: 60px;
  background-color: #fff;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  padding: 0 1.5em;
  justify-content: space-between;
  flex-wrap: nowrap;
  flex-direction: row;
}

.menu {
  width: 100%;
  position: relative;
}

.items {
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  position: relative;
}

.menu-item {
  width: 64px;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #666;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  
  &:hover {
    color: var(--main-color, #3498db);
  }
  
  &.active {
    color: var(--main-color, #3498db);
  }
}

.indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  border-radius: 2px;
  transition: transform 0.3s ease;
  z-index: 1;
}

.user_stats {
  font-size: 0.875em;
  display: flex;
  flex-direction: row;
  gap: .8em;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
}

.row {
  width: 1200px;
  margin: 30px auto;
}

.col-md-8 {
  padding-left: 0;
}

.col-md-4 {
  padding-right: 0;
}

.user_details {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.info {
  display: flex;
  justify-content: space-between;
  padding: 4px 8px;
}

.info-value {
  color: rgba(0, 0, 0, .45);
}
</style>
