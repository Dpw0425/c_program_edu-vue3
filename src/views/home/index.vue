<template>
  <div class="home_container">
    <!-- 首页轮播图 -->
    <div class="row">
      <div class="col-md-12">
        <div class="article">
          <div class="row">
            <!-- 轮播图 -->
            <div class="col-md-8">
              <el-carousel height="270px">
                <!-- TODO: 替换真实接口 -->
                <el-carousel-item
                  v-for="(item, index) in commonStore.carousel"
                  :key="index"
                >
                  <img
                    :src="getImageUrl(item)"
                    :alt="'Carousel Image' + (index + 1)"
                    style="width: 100%; height: 100%; object-fit: cover"
                  />
                </el-carousel-item>
              </el-carousel>
            </div>
            <!-- 日历 -->
            <div class="col-md-4" style="text-align: center">
              <h2
                style="
                  font-size: 1.25em;
                  margin: 2.5rem 0 2rem;
                  font-weight: 600;
                "
              >
                欢迎回来，
                <span style="color: #0e90d2 !important">
                  {{ userStore.nickname }}
                </span>
              </h2>
              <div class="calendar">
                <div>
                  <span class="mounth">
                    {{ commonStore.month + commonStore.monthType }}
                  </span>
                  <span class="date">
                    {{ commonStore.date }}
                  </span>
                  <span class="weekday">
                    {{ commonStore.weekday }}
                  </span>
                </div>
                <span class="lunar">
                  {{ commonStore.lunarDate }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--  -->
    <div class="row">
      <div class="col-md-8">
        <el-card shadow="never">
          <h2>热点题目</h2>
        </el-card>
      </div>

      <div class="col-md-4">
        <el-card shadow="never">
          <h2>公告</h2>
        </el-card>
      </div>
    </div>

    <!--  -->
    <div class="row"></div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import useCommonStore from '@/store/modules/common'
import { onMounted } from 'vue'

let userStore = useUserStore()
let commonStore = useCommonStore()

const getImageUrl = (path: string) => {
  const resolvedPath = path.replace('@/', '../../')
  return new URL(resolvedPath, import.meta.url).href
}

onMounted(async () => {
  // 加载轮播图
  await commonStore.GetCarousel()
  // 加载日历
  await commonStore.GetCalendar()
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

.row {
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

.calendar {
  margin-top: 10px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mounth {
  display: inline-block;
  width: 20px;
  vertical-align: top;
  line-height: 17px;
  margin-left: 10px;
  margin-right: 10px;
  font-weight: bold;
}

.date {
  display: inline-block;
  font-size: 85px;
  vertical-align: top;
  line-height: 55px;
  font-weight: bolder;
}

.weekday {
  display: inline-block;
  width: 20px;
  vertical-align: top;
  line-height: 17px;
  margin-left: 10px;
  margin-right: 10px;
  font-weight: bold;
}

.lunar {
  display: inline-block;
  line-height: 12px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 2rem;
  font-weight: bold;
}

h2 {
  font-size: 1.25em;
}

.el-card {
  border: none;
  box-sizing: border-box;
}
</style>
