import type { ResponseData } from '../type'

export interface questionItem {
  id: number
  title: string
  content: string
  tag: string[]
  degree: number
  owner_id: number
  passing_rate: number
}

export type QuestionList = questionItem[]

export interface questionListResponseData extends ResponseData {
  data?: {
    question_list: QuestionList
    total: number
  }
}

export interface questionDetailResponseData extends ResponseData {
  data?: {
    question_item: questionItem
  }
}

export interface testDataItem {
  input: string
  output: string
}

export type TestDataList = testDataItem[]

export interface testDataResponseData extends ResponseData {
  data?: {
    test_data: TestDataList
  }
}

export interface commitAnswerForm {
  question_id: number
  answer: string
}

export interface commitAnswerResponseData extends ResponseData {
  data?: {
    result: string
  }
}
