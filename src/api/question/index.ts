import request from '@/utils/request'
import type {
  commitAnswerForm,
  commitAnswerResponseData,
  questionDetailResponseData,
  questionListResponseData,
  testDataResponseData,
} from './type'

const QUESTION_API = '/question'

enum API {
  QUESTION_LIST_URL = QUESTION_API + '/list',
  QUESTION_DETAIL_URL = QUESTION_API + '/detail',
  GET_TEST_DATA_URL = QUESTION_API + '/test_data',
  COMMIT_ANSWER_URL = QUESTION_API + '/commit_answer',
}

export const reqQuestionList = (
  page: number,
  number: number,
  search: string | null,
) =>
  request.get<any, questionListResponseData>(
    API.QUESTION_LIST_URL + `?page=${page}&number=${number}&search${search}`,
  )

export const reqQuestionDetail = (id: number) =>
  request.get<any, questionDetailResponseData>(
    API.QUESTION_DETAIL_URL + `?id=${id}`,
  )

export const reqGetTestData = (id: number) =>
  request.get<any, testDataResponseData>(API.GET_TEST_DATA_URL + `?id=${id}`)

export const reqCommitAnswer = (data: commitAnswerForm) =>
  request.post<any, commitAnswerResponseData>(API.COMMIT_ANSWER_URL, data)
