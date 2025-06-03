<template>
  <div>
    <div class="menu_container">
      <el-card class="custom-card" style="width: 1200px; height: 66px">
        <div class="header_bottom">
          <div class="menu" style="--main-color: #3498db">
            <ul class="items">
              <li
                v-for="(item, index) in menuItems"
                :key="index"
                :class="{ active: activeIndex === index }"
                @click="activeIndex = index"
                class="menu-item"
              >
                {{ item }}
              </li>
              <div class="indicator" :style="indicatorStyle"></div>
            </ul>
          </div>

          <div class="competition_stats">
            <div
              v-for="(stat, index) in statsItems"
              :key="index"
              class="stat-item"
            >
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
            <h2>题单</h2>
            <el-table style="margin: 10px 0" :data="questionList">
              <el-table-column
                label="序号"
                width="80px"
                align="center"
                type="index"
              ></el-table-column>
              <el-table-column prop="title" label="题目名称" align="center">
                <template #="{ row, $index }">
                  <el-link
                    target="_blank"
                    :underline="false"
                    @click="getQuestionDetail(row)"
                  >
                    {{ row.title }}
                  </el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div v-if="activeIndex === 1">
            <h2>排名</h2>
            <el-table style="margin: 10px 0" :data="rankList">
              <el-table-column
                label="排名"
                width="80px"
                align="center"
                type="index"
              ></el-table-column>
              <el-table-column
                prop="user_name"
                label="参赛者"
                align="center"
              ></el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>

      <div class="col-md-4">
        <el-card shadow="never">
          <div class="competition_details">
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
import {
  reqCompetitionDetail,
  reqCompetitionQuestionList,
  reqRanking,
} from '@/api/competition'
import type {
  competitionDetailResponseData,
  competitionItem,
  rankingResponseData,
  RankList,
} from '@/api/competition/type'
import type {
  questionItem,
  QuestionList,
  questionListResponseData,
} from '@/api/question/type'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

let competition = ref<competitionItem>()

let questionList = ref<QuestionList>([])

let rankList = ref<RankList>([])

let route = useRoute()
let router = useRouter()
const competitionId = route.query.id

let activeIndex = ref(0)
let menuItems = ref(['题目列表', '排名'])

let statsItems = computed(() => {
  return [
    {
      label: '参赛人数',
      value:
        competition.value?.contestant.filter((id) => id.trim() != '').length ??
        0,
    },
    { label: '题目数量', value: questionList.value?.length ?? 0 },
  ]
})

let infoItems = computed(() => {
  return [
    {
      label: '比赛类别',
      value: competition.value?.category ? '团体赛' : '个人赛',
    },
    { label: '开始时间', value: competition.value?.start_time },
    { label: '截止时间', value: competition.value?.deadline },
  ]
})

const indicatorStyle = computed(() => {
  let itemWidth = 64
  return {
    width: `${itemWidth}px`,
    transform: `translateX(${activeIndex.value * itemWidth}px)`,
    backgroundColor: 'var(--main-color, #3498db)',
  }
})

const getQuestionDetail = (row: questionItem) => {
  router.push({
    path: `/question/detail`,
    query: { id: row.id },
  })
}

onMounted(async () => {
  let result: competitionDetailResponseData = await reqCompetitionDetail(
    Number(competitionId),
  )
  if (result.code == 200) {
    competition.value = result.data?.competition_item as competitionItem
  }

  let result2: questionListResponseData = await reqCompetitionQuestionList(
    Number(competitionId),
  )
  if (result2.code == 200) {
    questionList.value = result2.data?.question_list as QuestionList
  }

  let result3: rankingResponseData = await reqRanking(Number(competitionId))
  if (result3.code == 200) {
    rankList.value = result3.data?.user_list as RankList
  }
})
</script>

<style scoped lang="scss">
.menu_container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 0.5em;
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

.competition_stats {
  margin-top: 10px;
  font-size: 0.875em;
  display: flex;
  flex-direction: row;
  gap: 0.8em;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
}

.row {
  width: 1200px;
  margin: 30px 118px;
}

.col-md-8 {
  padding-left: 0;
}

.col-md-4 {
  padding-right: 0;
}

.competition_details {
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
  color: rgba(0, 0, 0, 0.45);
}
</style>
