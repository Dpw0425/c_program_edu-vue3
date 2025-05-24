import type { ResponseData } from '../type'

export interface questionItem {
  id: number
  title: string
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
