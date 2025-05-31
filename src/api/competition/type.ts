import type { ResponseData } from "../type";

export interface competitionItem {
  id: number
  name: string
  contestant: string[]
  owner_id: number
  start_time: string
  deadline: string
  status: number
  category: number
  permission: number
  quantity: number
}

export type CompetitionList = competitionItem[]

export interface competitionListResponseData extends ResponseData {
  data?: {
    competition_list: CompetitionList
  }
}