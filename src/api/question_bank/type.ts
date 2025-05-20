import type { ResponseData } from '../type'

export interface bankItem {
  id: number
  name: string
  content: string
  open_grade: string[] | null
  participants: number
  completed: number
  count: number
}
export type BankList = bankItem[]
export interface getBankListResponseData extends ResponseData {
  data?: {
    bank_list: BankList
  }
}
