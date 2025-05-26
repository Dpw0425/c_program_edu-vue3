<template>
  <div class="question_container">
    <el-card class="question_box">
      <h2>题目描述</h2>

      <h1 style="font-size: 24px; line-height: 32px; font-weight: 600px">
        {{ question.title }}
      </h1>

      <p>{{ question.content }}</p>

      <div v-for="(item, index) in testData" :key="index" class="test_data">
        <div class="test_label">示例 {{ index + 1 }}：</div>

        <p>
          <strong>输入：</strong>
          {{ item.input }}
        </p>

        <p>
          <strong>输出：</strong>
          {{ item.output }}
        </p>

        <div class="line"></div>
      </div>
    </el-card>

    <el-card class="answer_box">
      <h2>&lt;/&gt;代码</h2>

      <div style="width: 100%; text-align: right; margin-bottom: 10px">
        <el-button type="success" size="default" @click="submitCode">
          提交
        </el-button>
      </div>

      <div class="monaco-container" ref="editorContainer"></div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqCommitAnswer, reqGetTestData, reqQuestionDetail } from '@/api/question'
import type {
  commitAnswerForm,
  commitAnswerResponseData,
  questionDetailResponseData,
  questionItem,
  TestDataList,
  testDataResponseData,
} from '@/api/question/type'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import * as monaco from 'monaco-editor'
import { ElMessage, ElNotification } from 'element-plus'

const editorContainer = ref<HTMLElement | null>(null)
let editorInstance: monaco.editor.IStandaloneCodeEditor | null = null

let question = ref<questionItem>({
  id: 0,
  title: '',
  tag: [],
  degree: 0,
  owner_id: 0,
  passing_rate: 0,
  content: '',
})

let answer = ref<commitAnswerForm>({
  question_id: 0,
  answer: '',
})

let testData = ref<TestDataList>([])

let route = useRoute()
const questionId = route.query.id

const submitCode = async () => {
  if (editorInstance) {
    let code = editorInstance.getValue()
    answer.value.question_id = question.value.id
    answer.value.answer = code
    let result: commitAnswerResponseData = await reqCommitAnswer(answer.value)
    if (result.code == 200) {
      if (result.data?.result == 'Accepted') {
        ElNotification({
          type: 'success',
          message: result.data?.result,
        })
      } else {
        ElNotification({
          type: 'warning',
          message: result.data?.result,
        })
      }
    } else {
      ElMessage({
        type: 'error',
        message: result.message,
      })
    }
  }
}

onMounted(async () => {
  let result: questionDetailResponseData = await reqQuestionDetail(
    Number(questionId),
  )
  if (result.code == 200) {
    question.value = result.data?.question_item as questionItem
  }

  let result2: testDataResponseData = await reqGetTestData(Number(questionId))
  if (result2.code == 200) {
    testData.value = result2.data?.test_data as TestDataList
  }

  if (editorContainer.value) {
    editorInstance = monaco.editor.create(editorContainer.value, {
      value: `#include <stdio.h>\n\nint main() {\n    // 在此编写你的代码\n    return 0;\n}`,
      language: 'c',
      theme: 'vs',
      automaticLayout: true,
    })
  }
})

onBeforeUnmount(() => {
  if (editorInstance) {
    editorInstance.dispose()
  }
})
</script>

<style scoped lang="scss">
.question_container {
  display: flex;
  height: 100vh;
  gap: 16px;
  padding: 16px;
  background-color: #f5f7f9;
}

.question_box {
  flex: 1;
  min-width: 400px;
  height: calc(100% - 32px);
  overflow-y: auto;

  ::deep(.el-card__body) {
    padding: 20px;
    font-size: 14px;
    line-height: 1.6;
    color: #262626;
  }
}

.answer_box {
  flex: 1;
  min-width: 400px;
  height: calc(100% - 32px);
  background-color: #ffffff;

  ::v-deep(.el-card__body) {
    height: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    padding: 20px;
    font-size: 14px;
    line-height: 1.6;
    color: #262626;

    .monaco-container {
      width: 100%;
      height: 100%;
    }
  }
}

.test_data {
  margin-bottom: 20px;
}

.test_label {
  font-weight: bold;
  margin-bottom: 8px;
}

.line {
  border: 1px dashed #aaa;
  margin-top: 10px;
}
</style>
