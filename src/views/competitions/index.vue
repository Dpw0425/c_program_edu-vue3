<template>
  <div>
    <el-card class="box-card">
      <div>
        <h2>等你来战</h2>
        <div
          class="competition_box"
          v-for="(item, index) in competitionList.filter(
            (item) => item.status != 2,
          )"
        >
          <div class="competition_content">
            <h4 class="competition_title">{{ item.name }}</h4>

            <ul class="competition_info">
              <li class="time_box">
                <el-icon><AlarmClock /></el-icon>
                &nbsp;开始时间：{{ item.start_time }}
              </li>
              <li class="time_box">
                <el-icon><AlarmClock /></el-icon>
                &nbsp;截止时间：{{ item.deadline }}
              </li>
              <li>
                <el-icon><User /></el-icon>
                &nbsp;参与人数：{{ item.contestant.filter((n) => n).length }}
              </li>
              <li>
                <el-icon><Memo /></el-icon>
                &nbsp;题目数量：{{ item.quantity }}
              </li>
              <li class="time_box">
                <el-icon><Trophy /></el-icon>
                &nbsp;比赛类型：{{ item.category ? '团体赛' : '个人赛' }}
              </li>
            </ul>
          </div>

          <div class="competition_btn">
            <el-button
              v-if="item.status == 0"
              size="medium"
              round
              type="success"
              @click=""
            >
              报名
            </el-button>
            <el-button
              v-if="item.status == 1"
              size="medium"
              round
              type="primary"
              @click="getCompetitionDetail(item.id)"
            >
              答题
            </el-button>
          </div>
        </div>
      </div>

      <div>
        <h2>比赛回顾</h2>
        <div
          class="competition_box"
          v-for="(item, index) in competitionList.filter(
            (item) => item.status === 2,
          )"
        >
          <div class="competition_content">
            <h4 class="competition_title">{{ item.name }}</h4>

            <ul class="competition_info">
              <li class="time_box">
                <el-icon><AlarmClock /></el-icon>
                &nbsp;开始时间：{{ item.start_time }}
              </li>
              <li class="time_box">
                <el-icon><AlarmClock /></el-icon>
                &nbsp;截止时间：{{ item.deadline }}
              </li>
              <li>
                <el-icon><User /></el-icon>
                &nbsp;参与人数：{{ item.contestant.filter((n) => n).length }}
              </li>
              <li>
                <el-icon><Memo /></el-icon>
                &nbsp;题目数量：{{ item.quantity }}
              </li>
              <li class="time_box">
                <el-icon><Trophy /></el-icon>
                &nbsp;比赛类型：{{ item.category ? '团体赛' : '个人赛' }}
              </li>
            </ul>
          </div>

          <div class="competition_btn">
            <el-button size="medium" round type="info">回顾</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqCompetitionList } from '@/api/competition'
import type {
  CompetitionList,
  competitionListResponseData,
} from '@/api/competition/type'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

let competitionList = ref<CompetitionList>([])

let router = useRouter()

const getCompetitionDetail = (id: number) => {
  router.push({
    path: `/competition/detail`,
    query: { id: id },
  })
}

const getCompetitionList = async () => {
  let result: competitionListResponseData = await reqCompetitionList()
  if (result.code == 200) {
    competitionList.value = result.data?.competition_list.map((item) => {
      const now = new Date()
      const startTime = new Date(item.start_time)
      const endTime = new Date(item.deadline)

      return {
        ...item,
        status:
          now < startTime ? 0 : now >= startTime && now <= endTime ? 1 : 2,
        category: item.category != null ? item.category : 0,
        permission: item.permission != null ? item.permission : 0,
        quantity: item.quantity != null ? item.quantity : 0,
      }
    }) as CompetitionList
  }
}

onMounted(() => {
  getCompetitionList()
})
</script>

<style scoped lang="scss">
.box-card {
  min-height: 620px;
  position: relative;
}

.competition_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 5px;
  border: 1px solid #ddd;
  border-left: 4px solid #25bb9b;
  padding: 15px;
  margin-bottom: 20px;
  background: #fff;
  position: relative;
}

.competition_content {
  margin-left: 30px;
  flex: 1;
  display: inline-block;
  vertical-align: middle;
}

.competition_title {
  font-size: 18px;
  color: #3c444d;
  margin-bottom: 15px;
}

.competition_info {
  margin: 0;
  padding: 0;
  font-weight: 400px;
}

.competition_info .time_box {
  display: block;
  background-position: 0 -282px;
}

.competition_info li {
  display: inline-block;
  min-width: 100px;
  margin: 0 20px 10px 0;
  font-size: 14px;
  color: #86909b;
  padding-left: 30px;
}

.competition_btn {
  text-align: center;
  width: 145px;
  display: inline-block;
  vertical-align: middle;
}
</style>
