<template>
  <div class="home_container">
    <!-- 首页轮播图 -->
    <div class="grid">
      <div class="row">
        <div class="col-md-12">
          <div class="article">
            <div class="row">
              <!-- 轮播图 -->
              <div class="col-md-8">
                <el-carousel height="270px">
                  <!-- TODO: 补充轮播图逻辑 -->
                  <el-carousel-item v-for="(item, index) in commonStore.carousel" :key="index">
                    <img :src="getImageUrl(item)" :alt="'Carousel Image' + (index + 1)" style="width: 100%; height: 100%; object-fit: cover;">
                  </el-carousel-item>
                </el-carousel>
              </div>
              <!-- 日历 -->
              <div class="col-md-4" style="text-align: center">
                <h2 style="font-size: 1.25em">
                  欢迎回来，
                  <a href="#" target="_blank" style="color: #0e90d2 !important">
                    {{ userStore.nickname }}
                  </a>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--  -->
    <div class="row"></div>

    <!--  -->
    <div class="row"></div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import useCommonStore from '@/store/modules/common';
import { onMounted } from 'vue';

let userStore = useUserStore()
let commonStore = useCommonStore()

const getImageUrl = (path: string) => {
  const resolvedPath = path.replace('@/', '../../')
  return new URL(resolvedPath, import.meta.url).href
}

onMounted(async () => {
  await commonStore.GetCarousel()
  console.log(commonStore.carousel)
})
</script>

<style scoped lang="scss">
.home_container {
  display: block;
  margin-bottom: 2em; // TODO: 可能没用到时候删了
  box-sizing: border-box;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1100px;
}

.grid {
  margin: 0 auto;
  width: 100%;
}

@media only screen and (min-width: 641px) {
  [class*='col-'] {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media only screen and (min-width: 641px) {
  .col-md-12 {
    width: 100%;
  }
}

.article {
  background: rgba(255, 255, 255, 0.7);
  padding: 16px;
  margin-bottom: 15px;
  position: relative;

  @media only screen and (min-width: 641px) {
    .row {
      margin-left: -1rem;
      margin-right: -1rem;
    }
  }
}
</style>
