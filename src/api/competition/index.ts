import request from '@/utils/request'
import type { competitionDetailResponseData, competitionListResponseData, rankingResponseData } from './type'
import type { questionListResponseData } from '../question/type'

const COMPETITION_API = '/competition'

enum API {
  COMPETITION_LIST_URL = COMPETITION_API + '/list',
  COMPETITION_DETAIL_URL = COMPETITION_API + '/detail',
  COMPETITION_QUESTION_URL = COMPETITION_API + '/question_list',
  COMPETITION_RANKING_URL = COMPETITION_API + '/ranking',
}

export const reqCompetitionList = () =>
  request.get<any, competitionListResponseData>(API.COMPETITION_LIST_URL)

export const reqCompetitionDetail = (id: number) =>
  request.get<any, competitionDetailResponseData>(API.COMPETITION_DETAIL_URL + `?id=${id}`)

export const reqCompetitionQuestionList = (id: number) =>
  request.get<any, questionListResponseData>(API.COMPETITION_QUESTION_URL + `?id=${id}`)

export const reqRanking = (id: number) =>
  request.get<any, rankingResponseData>(API.COMPETITION_RANKING_URL + `?id=${id}`)
