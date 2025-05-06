import request from '@/utils/request'
import type { questionListResponseData } from './type'

const QUESTION_API = '/question'

enum API {
  QUESTION_LIST_URL = QUESTION_API + '/list',
}

export const reqQuestionList = (
  page: number,
  number: number,
  search: string | null,
) =>
  request.get<any, questionListResponseData>(
    API.QUESTION_LIST_URL + `?page=${page}&number=${number}&search${search}`,
  )
