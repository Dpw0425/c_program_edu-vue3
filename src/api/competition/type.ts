import type { ResponseData } from '../type'

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

export interface competitionDetailResponseData extends ResponseData {
  data?: {
    competition_item: competitionItem
  }
}

export interface rankItem {
  user_name: string
  score: number
  total_commit: number
}

export type RankList = rankItem[]

export interface rankingResponseData extends ResponseData {
  data?: {
    user_list: RankList
  }
}
