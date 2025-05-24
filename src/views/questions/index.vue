<template>
  <div>
    <el-card class="box-card">
      <h2>开放题库</h2>
      <div class="tags-container" v-if="userStore.user_id != ''" ref="container">
        <div
          v-for="(item, index) in bankList"
          :key="item.id"
          class="tag"
          :title="item.content"
          :ref="el => (tagRefs[index] = el as HTMLElement)"
        >
          <span>{{ item.name }}</span>
          <span class="tag-count">{{ item.count }}</span>
        </div>
      </div>

      <div class="separator"></div>

      <h2>开放题目</h2>
      <el-table style="margin: 10px 0;" :data="questionList" border>
        <el-table-column label="标题" prop="title" align="center">
          <template #="{ row, $index }">
            <el-link target="_blank" :underline="false" @click="getQuestionDetail(row)">{{ row.title }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="标签" prop="tag" align="center"></el-table-column>
        <el-table-column label="难度" prop="degree" align="center" width="80px"></el-table-column>
        <el-table-column label="通过率" prop="passing_rate" align="center" width="500px">
          <template #="{ row, $index }">
            <div class="progress-container">
              <el-progress 
                :percentage="row.passing_rate"
                :text-inside="true"
                :stroke-width="24"
                style="width: 75%"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination_container">
        <el-pagination
          @current-change="getQuestionList"
          v-mode:current-page="pageNo"
          :page-size="limit"
          background
          layout="prev, pager, next, jumper, ->, total"
          :total="total"
        />
    </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqQuestionList } from '@/api/question'
import type { questionItem, QuestionList, questionListResponseData } from '@/api/question/type'
import { reqGetBankList } from '@/api/question_bank'
import type {
  BankList,
  getBankListResponseData,
} from '@/api/question_bank/type'
import useUserStore from '@/store/modules/user'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

// 当前页码
let pageNo = ref<number>(1)
// 每页展示条数
let limit = ref<number>(7)
// 总条数
let total = ref<number>(0)

const container = ref<HTMLElement | null>(null)
const tagRefs = ref<(HTMLElement | null)[]>([])

let userStore = useUserStore()
let router = useRouter()

let bankList = reactive<BankList>([])

let questionList = reactive<QuestionList>([])

const getQuestionList = async (pager = 1) => {
  pageNo.value = pager
  let result: questionListResponseData = await reqQuestionList(pageNo.value, limit.value, null)
  if (result.code == 200) {
    questionList = result.data?.question_list as QuestionList
    total.value = result.data?.total as number
  }
}

const getQuestionDetail =(row: questionItem) => {
  router.push({
    path: `/question/detail`,
    query: { id: row.id }
  })
}

onMounted(async () => {
  if (userStore.user_id) {
    let result: getBankListResponseData = await reqGetBankList(
      userStore.grade as number,
    )
    if (result.code == 200 && result.data?.bank_list) {
      bankList.splice(0, bankList.length, ...(result.data?.bank_list.map((item) => {
        return {
          ...item,
          count: item.count != null ? item.count : 0,
        }
      }) as BankList))
    }
  }

  getQuestionList()
})
</script>

<style scoped lang="scss">
.box-card {
  min-height: 620px;
  position: relative;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-block;
  padding: 4px 8px;
  font-size: 14px;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  margin-right: 8px;
  transition: all 0.2s;
  color: #333;
  white-space: nowrap;
}
.tag:hover {
  transform: scale(1.1);
  color: #409eff;
}

.tag-count {
  font-size: 14px; 
  margin-left: 4px;
  padding: 1px 8px;
  background-color: rgba(220, 222, 225, 0.5);
  border-radius: 16px / 50%;
  color: #333;
  display: inline-block;
  font-weight: normal;
}

.separator {
  height: 1px;
  margin: 16px 0;
  background-color: #e0e0e0;
}

.pagination_container {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  padding: 0 20px;
}

.progress-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 穿透修改 Element 默认样式 */
:deep(.el-progress--line) {
  margin: 0 auto; /* 水平居中 */
}
</style>
